<template>
  <div className="notification-container">
    <!-- <div v-for="(item, index) in list" :key="index"> -->
    <transition name="goslide">
      <div v-show="visiable" :class="['notification-normal', type]">
        {{ message }}
        <div className="notification-normal__tip">
          <svg-icon class="icon" :icon-class="type === 'error' ? 'point' : type === 'success' ? 'check' : 'info'" />
        </div>
      </div>
    </transition>
    <!-- </div> -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, toRefs, ref } from 'vue'
import SvgIcon from '../SvgIcon.vue'
interface Props {
  type: 'error' | 'info' | 'success';
  message: string;
  duration: number;
  onRemove: () => void
}
const props = withDefaults(defineProps<Props>(), {
  type: 'error',
  message: '',
  duration: 1000,
  onRemove: () => { }
})
const { type, message, duration } = toRefs(props)
const visiable = ref<boolean>(false)
const list = ref<any>([]) // 消息提示队列
onMounted(() => {
  visiable.value = true
  setTimeout(() => {
    visiable.value = false
    // props.onRemove()
  }, duration.value)
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

/* &-animate {
    &-enter,
    &-appear {
      transform: translateX(50%);
      margin-bottom: 0;
      opacity: 0;
    }

    &-enter-active,
    &-appear-active {
      transform-origin: right;
      margin-bottom: 15px;
      transform: translateX(0);
      opacity: 1;
      transition: margin-bottom 0.35s, opacity 0.2s 0.1s, transform 0.7s cubic-bezier(0, 1.5, 0.6, 1) 0.1s;
    }

    &-exit-active {
      margin-bottom: 0;
      opacity: 0;
      transform: translateX(50%);
      transition: height 0.25s ease 0.25s, margin-bottom 0.25s ease 0.25s, opacity 0.25s, transform 0.25s;
    }
  } */
</style>