<template>
  <div class="search">
    <banner :banner="bannerBg" :title="`搜索：${keyword}`" :extraTitle="`找到 ${total} 个结果`" />
    <div class="content">
      <div :class="['list-box', isPc ? '' : 'app']">
        <div class="list-wrap">
          <card v-for="(item, index) in resultList" :key="index" :info="item"></card>
        </div>
        <loading :is-show="isShowLoad" :status="loadState" :height="300" :isfixed="isLoadFixed" @refresh="getArtList" />
      </div>
    </div>
    <pagination :total="total" :page-size="pageSize" v-model:current-page="pageNumber"></pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import bannerBg from '../../assets/search-bg.jpg'
import banner from '../../components/banner/banner.vue'
import card from '../../components/card.vue'
import pagination from '../../components/pagination.vue'
import loading from '../../components/loading/loading.vue'
import { useRoute } from 'vue-router'
import { getArticlesPage } from '../../api/articles'
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
const configStores = configStore()
const { isPc } = storeToRefs(configStores);
const isShowLoad = ref<boolean>(false)
const loadState = ref<0 | 1 | 2>(0)
const isLoadFixed = ref<boolean>(false)
const setLoadState = (showType: boolean, status: 0 | 1 | 2, isFixed: boolean) => {
  isShowLoad.value = showType
  loadState.value = status
  isLoadFixed.value = isFixed // 加载时用fix， 失败,无数据时用 false
}
const route = useRoute()
const pageNumber = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const keyword = computed(() => {
  return route.query.keyword || ''
})
const resultList = ref<any[]>([])
const getArtList = () => {
  setLoadState(true, 0, true)
  const params = {
    pageSize: pageSize.value,
    pageNum: pageNumber.value,
    keyword: keyword.value
  }
  getArticlesPage(params).then((res: any) => {
    console.log('getlist==', res)
    if(res.code === 0) {
      resultList.value = res.data
      total.value = Number(res.total)
      if(resultList.value.length > 0) {
        setLoadState(false, 0, false)
      } else {
        setLoadState(true, 1, false)
      }
    } else {
      resultList.value = []
      total.value = 0
      setLoadState(true, 2, false)
    }
  }).catch(() => {
    resultList.value = []
    total.value = 0
    setLoadState(true, 2, false)
  })
}
onMounted(() => {
  getArtList()
})
</script>
<style lang="scss" scoped>
.search {
  position: relative;
  padding-bottom: 50px;
}
.content {
  position: relative;
  box-sizing: border-box;
  display: flex;
  .list-box {
    box-sizing:border-box;
    width: 100%;
    min-height: calc(100vh - 82px - 138px - 320px - 50px);
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