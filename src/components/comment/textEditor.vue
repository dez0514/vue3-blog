<template>
  <div>
    <textarea class="comment-mde" ref="commentmde" v-model="contentHtml" rows="5" placeholder="同道中人，理性留言..." @input="onTextChange" @blur="blurEvent"></textarea>
    <div :class="['emoji-board', showEmoji ? 'open': '']">
      <emoji-box @emojiClick="handleClickEmoji"/>
    </div>
    <div class="btn-wraps">
      <div class="btn-box">
        <div ref="emoji" class="btn emojo" @click="handleShowEmoji">
          <tooltip content="表情">
            <svg-icon icon-class="emoji"></svg-icon>
          </tooltip>
        </div>
        <div class="btn preview" @click="handlePreview">
          <tooltip content="预览">
            <svg-icon icon-class="preview"></svg-icon>
          </tooltip>
        </div>
      </div>
      <div class="btn-box">
        <div class="btn tips">
          <svg-icon class="icon" icon-class="tip"></svg-icon>
          <div>可使用部分markdown语法</div>
        </div>
        <div v-show="showCancelBtn" class="btn cancel" @click="handleCancelReply">取消回复</div>
        <div class="btn submit" @click="handleSubmit">
          <svg-icon class="icon" icon-class="publish"></svg-icon>
          <div>发布评论</div>
        </div>
      </div>
    </div>
    <div class="preview-content md-container" v-show="showPreview">
      <div v-html="previewContent"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import EmojiBox from './emoji.vue'
import tooltip from '../tooltip.vue'
import { ref, toRefs, computed, watch } from 'vue'
import { ITopicType, IreplyType } from '../../types'
import { addComment, addReply } from '../../api/comments'
import { useLoginInfo } from '../../utils/useLoginInfo'
import notification from '../notification/index'
import { checkMint } from '../../utils'
import { EmojiItem, formatEmoji } from './emoji'
import { formartMd } from '../../utils/marked'
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
const configStores = configStore()
const { isShowMask } = storeToRefs(configStores)
const { global_loginInfo } = useLoginInfo()
const emit = defineEmits<{
  (e: 'submitEmit'): void,
  (e: 'cancelReplyEmit'): void,
  (e: 'update:modelValue', params: string): void
}>()
interface ISourceType {
  topic_type?: ITopicType; 
  topic_id?: string | number;
  reply_type?: IreplyType;
  reply_id?: string | number;
  to_uid?: string | number;
  comment_id?: string | number;
}
interface Props {
  source: ISourceType,
  showCancelBtn?: boolean;
  modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {
  source: () => {
    return {
      topic_type: '',
      topic_id: '',
      reply_type: '',
      reply_id:  '',
      to_uid: '',
      comment_id: ''
    }
  },
  showCancelBtn: false,
  modelValue: ''
})
const { source, showCancelBtn, modelValue } = toRefs(props)
const { topic_type, topic_id, reply_type, reply_id, to_uid, comment_id } = source.value
const from_uid = ref<string>('') // 获取登录用户
// 偷懒写法 content 在组件内控制的，多个text-editor切换显示用v-if, 否则各自的值不会清空，始终只有一个text-editor
// const content = ref<string>('')
const commentmde = ref<HTMLTextAreaElement | null>(null)
const contentHtml = computed({
  get() {
    return modelValue.value
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})
console.log('contentHtml===', contentHtml.value)
const emoji = ref(null)
const showEmoji = ref<boolean>(false)
const blurIndex = ref<number | null | undefined>(null)
const showPreview = ref<boolean>(false)
const previewContent = ref<string>('')
watch(isShowMask, (val) => {
  // 监听系统遮罩层，如果关闭，同时关闭弹窗
  if(!val) {
    showPreview.value = false
  }
})
const blurEvent = () => {
  // console.log(commentmde.value?.selectionStart)
  blurIndex.value = commentmde.value?.selectionStart
}
// 插入内容到指定光标处
const handleInsertContent = (text: string) => {
  console.log('text==', text)
  const index = blurIndex.value
  if(typeof index === 'object' || typeof index === 'undefined') { // null undefined
    contentHtml.value+= text
  } else {
    const str = contentHtml.value
    contentHtml.value = str.slice(0, index) + text + str.slice(index)
  }
  commentmde.value?.focus()
}
const onTextChange = () => { }
const handleShowEmoji = () => {
  showEmoji.value = !showEmoji.value
}
const handleClickEmoji = (item: EmojiItem) => {
  console.log('face==', item)
  handleInsertContent(`[emoji=${item.name}]`)
}
const handlePreview = () => {
  if (!contentHtml.value) {
    notification.show({
      type: 'error',
      message: '随便写写'
    })
    return
  }
  configStores.updateConfig({ isShowMask: true })
  showPreview.value = true
  const replaceEmojiContent = formatEmoji(contentHtml.value)
  const replaceMdContent = formartMd(replaceEmojiContent)
  previewContent.value = replaceMdContent
  console.log('replaceMdContent==', replaceMdContent)
}
const handleCancelReply = () => {
  // 通知清空点击回复按钮时的赋值情况
  emit('cancelReplyEmit')
}
const handleSubmit = async () => {
  console.log('contentHtml.value====', contentHtml.value)
  try {
    from_uid.value = global_loginInfo.email
    if (!from_uid.value) {
      notification.show({
        type: 'error',
        message: '请先登录'
      })
      return
    }
    if (!contentHtml.value) {
      notification.show({
        type: 'error',
        message: '随便写写'
      })
      return
    }
    const obj = checkMint(contentHtml.value)
    console.log(obj)
    if(!obj.pass) {
      notification.error(`您的留言包含以下敏感词汇：${obj.words.join('、')}`)
      return
    }
    // 提交接口 addComment, addReply
    if(!comment_id) { // 评论
      const cParams = {
        topicId: topic_id,
        topicType: topic_type,
        content: contentHtml.value,
        fromUid: from_uid.value
      }
      console.log('cParams==', cParams)
      const res: any = await addComment(cParams)
      if(res.code === 0) {
        contentHtml.value = ''
        emit('submitEmit')
      }
    } else { // 回复
      const rParams = {
        commentId: comment_id,
        replyId: reply_id,
        replyType: reply_type,
        fromUid: from_uid.value,
        toUid: to_uid,
        content: contentHtml.value
      }
      console.log('rParams==', rParams)
      const res: any = await addReply(rParams)
      console.log('res reply==', res)
      if(res.code === 0) {
        contentHtml.value = ''
        emit('cancelReplyEmit')
        emit('submitEmit')
      }
    }
  } catch {
    notification.show({
      type: 'error',
      message: '网络错误！'
    })
  }
}
</script>
<style lang="scss" scoped>
.comment-editor {
  margin-bottom: 30px;
}

.comment-mde {
  box-sizing: border-box;
  margin-bottom: 2px;
  width: 100%;
  display: block;
  color: #738192;
  background-color: #e6eaf0;
  resize: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 1.42858;
  border: 1px solid transparent;
  outline: none;
  -webkit-transition: all .5s cubic-bezier(.645, .045, .355, 1);
  transition: all .5s cubic-bezier(.645, .045, .355, 1);
}

.comment-mde:focus {
  box-shadow: 0 0 0 3px rgba(32, 160, 255, 0.2);
  ;
  border-color: #20a0ff;
  background-color: #fff;
}
.emoji-board {
  overflow: hidden;
  max-height: 0;
  transition: .5s max-height;
  border-radius: 8px;
  border: 0;
  &.open  {
    max-height: 272px;
    border: 1px solid #e6eaf0;
  }
}
.btn-wraps {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-box,
.btn {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.btn {
  padding: 0 5px;
}
.emojo {
  position: relative;
  margin-right: 10px;
  cursor: pointer;
}

.preview {
  font-size: 24px;
  cursor: pointer;
}

.tips {
  font-size: 12px;
  margin-right: 20px;
  .icon {
    margin-right: 2px;
  } 
}

.cancel {
  font-size: 14px;
  color: #8492a6;
  margin-right: 10px;
  transition: color .25s;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.cancel:hover {
  color: #20a0ff;
}

.submit {
  background: linear-gradient(90deg, #20a0ff, #3dc3ff);
  box-shadow: 0 3px 5px rgba(32, 160, 255, 0.3);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  transition: box-shadow .5s;
  cursor: pointer;

  .icon {
    font-size: 16px;
    margin-right: 5px;
  }
}

@media screen and (max-width: 990px) {
  .tips {
    display: none;
  }
}
.preview-content {
  position: fixed;
  z-index: var(--zIndex_6);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 60vw;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 13px 15px var(--gray_opacity_2);
}
</style>