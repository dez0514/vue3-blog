<template>
  <div class="archive">
    <banner :banner="bannerBg" title="博客归档" />
    <div class="content">
      <div style="width: 150px;flex-shrink: 0;padding-top: 20px;" v-if="(isPc && dateList.length > 0)">
        <left-menu-wrap>
          <template #default>
            <nav-times ref="navtimes" :list="dateList" @change="getNavTime" />
          </template>
        </left-menu-wrap>
      </div>
      <div class="list-box" :style="{ padding: !isPc ? '15px 15px 0' : '30px 0 0'}">
        <div class="list-wrap">
          <div v-for="(item, index) in articleList" :key="index">
            <card-line :info="item"></card-line>
          </div>
        </div>
        <loading :is-show="isShowLoad" :status="loadState" :height="300" :isfixed="isLoadFixed" @refresh="getArchiveList" />
      </div>
    </div>
    <pagination :total="total" :page-size="pageSize" v-model:currentPage="pageNumber"></pagination>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import NavTimes from '../../components/NavTimes.vue'
import banner from '../../components/banner/banner.vue'
import pagination from '../../components/pagination.vue'
import cardLine from '../../components/cardLine.vue'
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
import { getArchivePage, getArchiveTime } from '../../api/articles'
import bannerBg from '../../assets/images/write.jpg'
import loading from '../../components/loading/loading.vue'
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
const navtimes = ref<InstanceType<typeof NavTimes> | null>(null)
const pageNumber = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const articleList = ref<any>([])
const dateList = ref<any>([])
const curyear = ref<number>(0)
const curmonth = ref<number>(0)
const getTimeList = () => {
  getArchiveTime({}, { loading: true }).then((res: any) => {
    if(res.code === 0) {
      res.data.forEach((item: any) => {
        item.title = `${item.year}年`
        item.monthArr = item.monthArr.map((inner:string) => {
          return {
            title: `${Number(inner)}月`,
            value: Number(inner)
          }
        })
        item.monthArr.unshift({ title: '全年', value: 0 })
      })
      dateList.value = res.data
    }
  })
}
const getNavTime = ({ year, month } : { year: number, month: number }) => {
  console.log('get===', year, month)
  curyear.value = year
  curmonth.value = month
  pageNumber.value = 1
  getArchiveList()
}
const getArchiveList = () => {
  setLoadState(true, 0, true)
  const params = {
    year: curyear.value,
    month: curmonth.value,
    pageSize: pageSize.value,
    pageNum: pageNumber.value
  }
  getArchivePage(params, { loading: true }).then((res: any) => {
    if(res.code === 0) {
      articleList.value = res.data
      total.value = Number(res.total)
      if(articleList.value.length > 0) {
        setLoadState(false, 0, false)
      } else {
        setLoadState(true, 1, false)
      }
    } else {
      articleList.value = [] // 清空
      total.value = 0
      setLoadState(true, 2, false)
    }
  }).catch(() => {
    articleList.value = []
    total.value = 0
    setLoadState(true, 2, false)
  })
}
onMounted(() => {
  getTimeList()
  getArchiveList()
})
</script>
<style lang="scss" scoped>
.archive {
  position: relative;
  padding-bottom: 50px;
}
.content {
  position: relative;
  box-sizing: border-box;
  display: flex;
  .list-box {
    box-sizing:border-box;
    min-height: 350px; // 606px;
    /* width: calc(100% - 150px); */
    flex: 1;
  }
  .list-box .list-wrap {
    overflow: hidden;
    width: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, calc((100% - 18px) / 2));
    gap: 18px;
  }
}
@media screen and (max-width: 990px) {
  .content .list-box {
    width: 100%;
  }
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(1, 100%);
    gap: 10px;
  }
}

</style>