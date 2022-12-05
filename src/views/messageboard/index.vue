<template>
  <div class="massageboard">
    <banner :banner="bannerBg" title="留言板" extraTitle="同道中人，理性留言"></banner>
    <div class="message-content">
      <comment topic-type="messageboard" :data-list="commentsArr" @refreshList="searchList" />
      <loading :is-show="isShowLoad" :status="loadState" :height="300" :isfixed="isLoadFixed" @refresh="searchList" />
    </div>
    <pagination :total="total" :page-size="pageSize" v-model:current-page="pageNumber" @change="searchList" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import banner from '../../components/banner/banner.vue';
import comment from '../../components/comment/index.vue'
import pagination from '../../components/pagination.vue';
import bannerBg from '../../assets/comment.jpg'
import { ICommentList } from '../../types'
import { getCommentList } from '../../api/comments'
import loading from '../../components/loading/loading.vue'
const isShowLoad = ref<boolean>(false)
const loadState = ref<0 | 1 | 2>(0)
const isLoadFixed = ref<boolean>(false)
const setLoadState = (showType: boolean, status: 0 | 1 | 2, isFixed: boolean) => {
  isShowLoad.value = showType
  loadState.value = status
  isLoadFixed.value = isFixed // 加载时用fix， 失败,无数据时用 false
}
const pageNumber = ref<number>(1)
const total = ref<number>(0)
const pageSize = ref<number>(10)
const commentsArr = ref<ICommentList[]>([])
const getCommentData = () => {
  setLoadState(true, 0, true)
  const params = {
    pageSize: pageSize.value,
    pageNum: pageNumber.value
  }
  getCommentList(params).then((res: any) => {
    if(res.code === 0) {
      setLoadState(false, 0, false)
      commentsArr.value = res.data
      total.value = Number(res.total)
    } else {
      commentsArr.value = []
      total.value = 0
      setLoadState(true, 2, true)
    }
  }).catch(() => {
    commentsArr.value = []
    total.value = 0
    setLoadState(true, 2, true)
  })
}
const searchList = () => {
  pageNumber.value = 1
  getCommentData()
}
onMounted(() => {
  searchList()
})
</script>
<style lang="scss" scoped>
.massageboard {
  min-height: calc(100vh - 58px - 138px);
  position: relative;
}
@media screen and (max-width: 990px) {
  .massageboard {
    min-height: calc(100vh - 58px - 60px);
  }
}
.message-content {
  margin-top: 20px;
  padding-bottom: 50px;
}
</style>