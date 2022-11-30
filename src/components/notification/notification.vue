<template>
  <div>
    <transition name="goslide">
      <div v-show="visiable" :class="['notification-normal', item.type]">
        {{ item.message }}
        <div class="notification-normal__tip">
          <svg-icon class="icon" :icon-class="item.type === 'error' ? 'point' : item.type === 'success' ? 'check' : 'info'" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SvgIcon from '../SvgIcon.vue'
import { NoticeItem } from './type'
interface Props {
  item: NoticeItem
}
const props = withDefaults(defineProps<Props>(), {
  item: () => ({
    id: '',
    type: 'error',
    message: '',
    duration: 1000
  })
})
// const { duration } = toRefs(props.item)
const visiable = ref<boolean>(false) // 为了动画
const emit = defineEmits<{
  (e: 'onRemove', item: NoticeItem): void
}>()
onMounted(() => {
  visiable.value = true
  const timer = setTimeout(() => {
    clearTimeout(timer)
    visiable.value = false // 消失的动画执行，此时这条数据还没删除， 但是数据已经在页面消失
    // console.log('===duration visiable trigger===')
    emit('onRemove', props.item)
  }, props.item.duration)
})
</script>

<style lang="scss" scoped>
.notification-normal {
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;
  padding: 15px 20px;
  border-radius: 8px;
  color: #fff;
  min-width: 150px;
  max-width: 400px;
  margin-bottom: 15px;
  position: relative;

  &__tip {
    position: absolute;
    width: 20px;
    height: 20px;
    left: -10px;
    top: -7px;
    box-shadow: 0 0 0 2px #fff;
    border-radius: 50%;
    transition: 0.35s 0.35s;

    .icon {
      font-size: 20px;
    }
  }

  &.error {
    background: linear-gradient(90deg, #ff4949, #ff7849);
    box-shadow: 0 5px 8px rgba(255, 73, 73, 0.5);

    .notification-normal__tip {
      background: linear-gradient(0deg, #ff4949, #ff7849);
    }
  }

  &.info {
    background: linear-gradient(90deg, #20a0ff, #20b8ff);
    box-shadow: 0 3px 5px rgba(32, 160, 255, 0.5);

    .notification-normal__tip {
      background: linear-gradient(0deg, #20a0ff, #20b8ff);
    }
  }

  &.success {
    background: linear-gradient(90deg, #67c23a, #68e12c);
    box-shadow: 0 3px 5px rgba(103, 194, 58, 0.5);

    .notification-normal__tip {
      background: linear-gradient(0deg, #67c23a, #68e12c);
    }
  }
}
/* 动画transition */
.goslide-enter-from,
.goslide-leave-to {
  transform: translateX(50%);
  margin-bottom: 0;
  opacity: 0;
}
.goslide-enter-to,
.goslide-leave-from{
  /*定义进入结束和离开开始的透明度为1*/
  transform: translateX(0);
  margin-bottom: 15px;
  opacity: 1;
}
.goslide-enter-active,
.goslide-leave-active {
  /*定义进入和离开过渡状态的透明度变化的时间和变化曲线*/
  transition: margin-bottom 0.35s, opacity 0.2s 0.1s, transform 0.7s cubic-bezier(0, 1.5, 0.6, 1) 0.1s;
}
</style>