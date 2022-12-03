<template>
  <div class="comments-list-wrap">
    <div v-for="(item, index) in commentsList" :key="index">
      <div class="wrapper">
        <div class="side">
          <div class="avatar">
            <div class="avatar-img" :style="{'background-image': `url(${item.avatar})`}"></div>
          </div>
        </div>
        <div class="main">
          <div class="name-wrap">
            <div :class="['nick', item.weburl ? 'has_url' : '']" @click="handleJumpWebUrl(item.weburl)">{{ item.nickname }}</div>
            <div class="time">{{ parseTime(item.create_time) }}</div>
            <div class="reply-btn" @click="hanleReply(item, 'comment', item.id)">
              <svg-icon class="icon" icon-class="reply" />
            </div>
          </div>
          <div class="content">
            <div class="desc">{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="edit-box" v-if="replyState.comment_id === item.id && replyState.to_uid === item.from_uid && replyState.reply_id === item.id">
        <text-editor  v-model="commentStr" :source="replyState" :showCancelBtn="true"  @cancelReplyEmit="cancelReplyCallback"  @submitEmit="submitCallback" />
      </div>
      <div class="children">
        <ul>
          <li v-for="(inner, idx) in item.replyList" :key="`${index}_${idx}`">
            <div class="wrapper">
              <div class="side">
                <div class="avatar">
                  <div class="avatar-img" :style="{'background-image': `url(${inner.from_avatar})`}"></div>
                </div>
              </div>
              <div class="main">
                <div class="name-wrap">
                  <div class="nick">
                    <span :class="inner.from_weburl ? 'has_url' : ''" @click="handleJumpWebUrl(inner.from_weburl)">{{ inner.from_nickname }}</span>
                    <span class="reply-txt">回复</span>
                    <span :class="inner.to_weburl ? 'has_url' : ''" @click="handleJumpWebUrl(inner.to_weburl)">{{ inner.to_nickname }}</span>
                  </div>
                  <div class="time">{{ parseTime(inner.create_time) }}</div>
                  <div class="reply-btn" @click="hanleReply(inner, 'reply', item.id)">
                    <svg-icon class="icon" icon-class="reply" />
                  </div>
                </div>
                <div class="content">
                  <div class="desc">{{ inner.content }}</div>
                </div>
              </div>
            </div>
            <div class="edit-box" v-if="replyState.comment_id === item.id && replyState.to_uid === inner.from_uid && replyState.reply_id === inner.id">
              <text-editor  v-model="commentStr" :source="replyState" :showCancelBtn="true" @cancelReplyEmit="cancelReplyCallback"  @submitEmit="submitCallback" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TextEditor from './textEditor.vue'
import { reactive, toRefs, ref } from 'vue'
import { replyItem, IreplyType, ICommentList } from '../../types'
import dayjs from 'dayjs';

interface Props {
  list?: ICommentList[];
}
// const { list = [] } = defineProps<Props>()
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
})
const emit = defineEmits<{
  (e: 'setCommentEditorStatus', status: boolean): void,
  (e: 'getListEmit'): void,
}>()
const commentStr = ref<string>('')
const commentsList = toRefs(props).list
const replyState = reactive<replyItem>({
  reply_type: '',
  reply_id:  '',
  to_uid: '', // 点这条的回复按钮，这条数据的from_uid就变成了要提交的to_uid
  comment_id: '' // 在那条评论下回复的
})
const parseTime = (timeStr: string | null | undefined) => {
  if(timeStr) {
    return dayjs(timeStr).format('MM月DD日 · YYYY年')
  } else {
    return ''
  }
}
const hanleReply = (clickItem: any, replyType: IreplyType, commentId : string | number) => {
  commentStr.value = '' // 清空框的内容
  // 回复事件：回复评论、回复回复
  replyState.reply_type = replyType
  replyState.reply_id = clickItem?.id
  replyState.to_uid = clickItem.from_uid
  replyState.comment_id = commentId
  // 通知隐藏评论框
  emit('setCommentEditorStatus', true)
  // 此处不触发接口，点发布才会触发提交动作
}
const cancelReplyCallback = () => {
  commentStr.value = '' // 清空框的内容
  // 点击取消回复时触发：清空回复时的赋值
  replyState.reply_type = ''
  replyState.reply_id = ''
  replyState.to_uid = ''
  replyState.comment_id = ''
  // 通知显示评论框
  emit('setCommentEditorStatus', false)
}
const handleJumpWebUrl = (url: string | undefined) => {
  if(url) {
    window.open(url, '_blank')
  }
}
const submitCallback = () => {
  // console.log('=====reply submit callback======')
  emit('getListEmit')
}
</script>
<style lang="scss" scoped>
.comments-list-wrap {
  overflow: hidden;
  width: 100%;
}

.wrapper {
  display: flex;

  .side .avatar {
    overflow: hidden;
    width: 42px;
    height: 42px;
    border: 1px solid #e6eaf0;
    border-radius: 6px;
    background-color: pink;
    .avatar-img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 2px solid #e6eaf0;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
    }
  }

  .main {
    flex: 1;

    .name-wrap {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 6px;
      line-height: 21px;
      border-bottom: 1px solid #e6eaf0;
      transition: border-color 0.25s;

      .nick {
        font-weight: 600;
        font-size: 14px;
        color: #738192;
      }
      .has_url:hover {
        color: var(--primary);
        cursor: pointer;
      }
      .reply-txt {
        margin: 0 6px;
        font-size: 12px;
        color: var(--gray_4);
        font-weight: 500;
      }
      .time {
        font-size: 12px;
        transition: 0.25s;
      }

      .reply-btn {
        box-sizing: border-box;
        position: absolute;
        right: 0;
        bottom: 0;
        border: 1px solid #e6eaf0;
        background: #fff;
        color: #8492a6;
        box-shadow: 0 3px 5px rgba(32, 160, 255, 0.1);
        padding: 0 10px;
        border-radius: 10px;
        line-height: 17px;
        height: 20px;
        transition: 0.25s;
        transform: translate(38px, 50%);
        opacity: 0;
        pointer-events: none;

        .icon {
          fill: currentColor;
          font-size: 16px;
        }
      }
    }

    .content .desc {
      padding: 3px 6px 0;
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 4px;
    }
  }
}

.children {
  margin-left: 48px;
}

.wrapper:hover {

  .side .avatar,
  .main .name-wrap {
    border-color: #20a0ff;
  }

  .time {
    transform: translateX(-38px);
  }

  .main .reply-btn {
    color: #20a0ff;
    border-color: #20a0ff;
    box-shadow: 0 5px 8px rgba(32, 160, 255, 0.3);
    transform: translate(0, 50%);
    opacity: 1;
    pointer-events: auto;
  }
}

.pagination-wrap {
  text-align: center;
  margin-top: 20px;
}
</style>