<template>
  <div class="home">
    <banner mode="swiper" :banner-list="bannerList"/>
    <div class="content">
      <div class="left-menu-con" v-if="(isPc && tagList.length > 0)">
        <left-menu-wrap>
          <template #default>
            <nav-tags :list="tagList" @change="getCurTag" />
          </template>
        </left-menu-wrap>
      </div>
      <div :class="['list-box', isPc ? '' : 'app']">
        <div class="list-wrap">
          <card v-for="(item, index) in articleList" :key="index" :info="item"></card>
        </div>
        <loading :is-show="isShowLoad" :status="loadState" :height="300" :isfixed="isLoadFixed" @refresh="getArtList(true)" />
      </div>
    </div>
    <pagination :total="total" :page-size="pageSize" v-model:current-page="pageNumber"></pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import NavTags from '../../components/NavTags.vue'
import banner from '../../components/banner/banner.vue'
import card from '../../components/card.vue'
import pagination from '../../components/pagination.vue'
import { getArticlesPage } from '../../api/articles'
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
import loading from '../../components/loading/loading.vue'
import { getAllTags } from '../../api/tags'
import { tagItem } from '../../types/index'
import { baseURL } from '../../api/urls'
const isShowLoad = ref<boolean>(false)
const loadState = ref<0 | 1 | 2>(0)
const isLoadFixed = ref<boolean>(false)
const setLoadState = (showType: boolean, status: 0 | 1 | 2, isFixed: boolean) => {
  isShowLoad.value = showType
  loadState.value = status
  isLoadFixed.value = isFixed // 加载时用fix， 失败,无数据时用 false
}
const configStores = configStore()
const { isPc } = storeToRefs(configStores);
const pageNumber = ref<number>(1)
const total = ref<number>(0)
const pageSize = ref<number>(10) 
const articleList = ref<any>([])
interface bannerItem {
  title: string;
  extraTitle: string;
  banner: string;
  tagList: tagItem[];
  articleId: string | number;
}
const bannerList = ref<bannerItem[]>([])
const ishot = ref<boolean>(false)
const tag = ref<string>('')
const tagList = ref<tagItem[]>([])
const getCurTag = (obj: { tag: string, ishot: boolean }) => {
  tag.value = obj.tag
  ishot.value = obj.ishot
  pageNumber.value = 1
  getArtList()
}
const getArtList = (init: boolean = false) => {
  setLoadState(true, 0, true)
  const params = {
    pageSize: pageSize.value,
    pageNum: pageNumber.value,
    ishot: ishot.value,
    tag: tag.value
  }
  getArticlesPage(params).then((res: any) => {
    console.log('getlist==', res)
    if(res.code === 0) {
      articleList.value = res.data
      total.value = Number(res.total)
      if (init) {
        bannerList.value = articleList.value.map((item: any) => {
          return {
            title: item.title,
            extraTitle: item.extra_title,
            banner: item.banner,
            tagList: item.tagList,
            articleId: item.id
          }
        })
      }
      if(articleList.value.length > 0) {
        setLoadState(false, 0, false)
      } else {
        setLoadState(true, 1, false)
      }
    } else {
      articleList.value = []
      bannerList.value = []
      total.value = 0
      setLoadState(true, 2, false)
    }
  }).catch(() => {
    articleList.value = []
    bannerList.value = []
    total.value = 0
    setLoadState(true, 2, false)
  })
}
const getTagList = () => {
  getAllTags().then((res: any) => {
    if(res.code === 0) {
      tagList.value = res.data.map((item: any) => {
        return {
          ...item,
          icon: item.icon ? `${baseURL}/imgs/${item.icon}` : ''
        }
      })
    }
  })
}
onMounted(() => {
  getTagList()
  getArtList(true)
})
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  padding-bottom: 50px;
}
.content {
  position: relative;
  box-sizing: border-box;
  display: flex;
  .left-menu-con {
    width: 200px;
    flex-shrink: 0;
  }
  .list-box {
    flex: 1;
    box-sizing:border-box;
    min-height: 400px; /* 计算一下min-height比较好 */
    padding: 30px 0 0;
    &.app {
      padding: 15px 15px 0;
    }
  }
  .list-box .list-wrap {
    overflow: hidden;
    width: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(5, calc((100% - 120px) / 5));
    gap: 30px;
    /* grid-template-columns: repeat(2, calc((100% - 18px) / 2));
    gap: 18px; */
  }
}
@media screen and (min-width:991px) and (max-width: 1600px) {
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(4, calc((100% - 75px) / 4));
    gap: 25px;
  }
}
@media screen and (min-width:577px) and (max-width: 990px) {
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(3, calc((100% - 30px) / 3));
    gap: 15px;
  }
}
@media screen and (min-width: 391px) and (max-width: 576px) {
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(2, calc((100% - 10px) / 2));
    gap: 10px;
  }
}
@media screen and (max-width: 390px) {
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(1, 100%);
    gap: 10px;
  }
}


</style>