
<template>
  <div class="notification-container">
    <div v-for="item in list" :key="item.id">
      <notification :item="item" @onRemove="onRemove"></notification>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import notification from './notification.vue';
import { NoticeItem } from './type'
interface Props {
  onEnd: () => void
}
const props = withDefaults(defineProps<Props>(), {
  onEnd: () => {}
})
const list = ref<any>([]) // 消息提示队列
const onAdd = (item: NoticeItem) => {
  // console.log('===add trigger===')
  list.value = [...list.value, item]
}
const onRemove = (item: NoticeItem) => {
  // console.log('===remove trigger===')
  const timer = setTimeout(() => {
    clearTimeout(timer)
    list.value = list.value.filter((v: NoticeItem) => v.id !== item.id)
    // console.log('====props.onEnd====')
    if(list.value.length === 0) {
      props.onEnd()
    }
  }, 500) // 为了消失的时有动画 慢500ms再销毁被隐藏的数据
}
defineExpose({
  onAdd
})
</script>
<style lang="scss" scoped>
.notification {
  &-container {
    position: fixed;
    bottom: 8px;
    right: 8px;
    z-index: var(--zIndex_9);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
</style>