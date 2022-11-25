<template>
  <div class="massageboard">
    <banner :banner="bannerBg" title="留言板" extraTitle="同道中人，理性留言"></banner>
    <div class="message-content">
      <comment topic-type="messageboard" :data-list="commentsArr" @refresh-list="getCommentList" />
    </div>
    <pagination :total="total" :page-size="pageSize" v-model:current-page="pageNumber" @change="getCommentList" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import banner from '../../components/banner/banner.vue';
import comment from '../../components/comment/index.vue'
import pagination from '../../components/pagination.vue';
import bannerBg from '../../assets/comment.jpg'
import { ICommentList } from '../../types'
const pageNumber = ref<number>(1)
const total = ref<number>(30)
const pageSize = ref<number>(10)
const commentsArr = ref<ICommentList[]>([])
const getCommentList = () => {
  console.log('pageNumber===', pageNumber.value)
  commentsArr.value = [
    {
      id: 1,
      topic_id: '',
      topic_type: 'messageboard',
      from_uid: 'zwd',
      create_time: '2022.11.24',
      content: '评论内容',
      replyList: [
        {
          id: 1,
          comment_id: 1,
          reply_type: 'comment',
          reply_id: 1, // ===comment_id
          content: '回复评论',
          from_uid: 'dez',
          to_uid: 'zwd',
          create_time: '2022.11.25'
        },
        {
          id: 2,
          comment_id: 1,
          reply_type: 'comment',
          reply_id: 1, // ===comment_id
          content: '回复自己的评论',
          from_uid: 'zwd',
          to_uid: 'zwd',
          create_time: '2022.11.25'
        },
        {
          id: 3,
          comment_id: 1,
          reply_type: 'reply',
          reply_id: 2, // ===第二条的id(此条是回复上一条回复的回复)
          content: '回复第二条回复的回复',
          from_uid: 'cz',
          to_uid: 'dez',
          create_time: '2022.11.25'
        }
      ]
    }
  ]
}
onMounted(() => {
  getCommentList()
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