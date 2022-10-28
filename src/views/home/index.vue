<template>
  <div class="home">
    <banner mode="swiper" />
    <div class="content">
      <div style="width: 200px;flex-shrink: 0;" v-if="isPc">
        <left-menu-wrap>
          <template #default>
            <nav-tags @change="getCurTag" />
          </template>
        </left-menu-wrap>
      </div>
      <div class="list-box" :style="{ padding: !isPc ? '15px 15px 0' : '30px 0 0'}">
        <div class="list-wrap">
          <card v-for="(item, index) in articleList" :key="index" :info="item"></card>
        </div>
      </div>
    </div>
    <pagination :total="100" v-model:current-page="pageNumber"></pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import NavTags from '../../components/NavTags.vue'
import banner from '../../components/banner/banner.vue'
import card from '../../components/card.vue'
import pagination from '../../components/pagination.vue'
// import cardLine from '../../components/cardLine.vue'
import { getArticlesPage } from '../../api/articles'
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
const configStores = configStore()
const { isPc } = storeToRefs(configStores);
const pageNumber = ref<number>(1)
const total = ref<number>(0)
const pageSize = ref<number>(10) 
const articleList = ref([])
const ishot = ref<boolean>(false)
const tag = ref<string>('')
const getCurTag = (obj: { tag: string, ishot: boolean }) => {
  tag.value = obj.tag
  ishot.value = obj.ishot
  pageNumber.value = 1
  getArtList()
}
const getArtList = () => {
  const params = {
    pageSize: pageSize.value,
    pageNum: pageNumber.value,
    ishot: ishot.value,
    tag: tag.value
  }
  getArticlesPage(params).then((res: any) => {
    console.log(res)
    if(res.code === 0) {
      articleList.value = res.data
      total.value = Number(res.total)
    } else {

    }
  })
}
onMounted(() => {
  getArtList()
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
  .list-box {
    box-sizing:border-box;
    min-height: 606px;
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
    gap: 15px;
  }
}


</style>