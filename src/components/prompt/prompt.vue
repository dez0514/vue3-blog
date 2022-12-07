<template>
  <div>
    <div class="prompt-mask"></div>
    <div class="modal-prompt">
      <div class="modal-prompt__header">
        <div class="modal-prompt__name">{{ title }}</div>
        <svg-icon icon-class="close" class="modal-prompt__close" @click="handleCancel" />
      </div>
      <div class="modal-prompt__content">{{ content }}</div>
      <div class="modal-prompt__footer">
        <div class="btn-clear modal-prompt__btn modal-prompt__btn-cancel" @click="handleCancel">
          取消
        </div>
        <div :class="['btn-clear modal-prompt__btn modal-prompt__btn-confirm', loading]" @click="handleConfirm">
          <svg-icon v-show="loading" class="animate-loading" icon-class="loading" />
          {{ !loading ? '确定' : '' }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, ref } from 'vue'
import SvgIcon from '../SvgIcon.vue'
interface Props {
  title?: string;
  content?: string;
  onCancel?: () => void
  onConfirm?: () => void
}
const props = withDefaults(defineProps<Props>(), {
  title: '提示',
  content: '',
  onCancel: () => {},
  onConfirm: () => {}
})
const { title, content } = toRefs(props)
const loading = ref<boolean>(false)
const handleCancel = () => {
  if(loading.value) return
  props.onCancel()
}
const handleConfirm = async () => {
  try {
    loading.value = true
    await props.onConfirm()
    loading.value = false
    props.onCancel()
  } catch {
    loading.value = false
  }
}
</script>
<style lang="less" scoped>
.prompt-mask {
  z-index: var(--zIndex_7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gray_opacity_5);
}
.modal-prompt {
  z-index: var(--zIndex_8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 380px;
  padding: 10px 12px;
  border-radius: 8px;
  box-shadow: 0 13px 15px var(--gray_opacity_2);
  background-color: var(--white);
  font-size: 14px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__name {
    color: var(--gray_1);
    font-size: 16px;
    font-weight: 700;
  }

  &__close {
    color: var(--gray_4);
    font-size: 22px;
    cursor: pointer;
  }

  &__content {
    margin: 20px 0;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__btn {
    min-width: 48px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 14px;
    color: var(--gray_4);
    margin-left: 10px;
    text-align: center;
    cursor: pointer;

    &-confirm {
      color: var(--primary);
      position: relative;
      font-weight: 700;
      -webkit-tap-highlight-color: transparent;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 100%;
        background-color: var(--primary_opacity_1);
        transition: 0.25s;
        border-radius: 5px;
      }

      &:hover {
        &::after {
          background-color: var(--primary_opacity_2);
          padding: 0 5px;
        }
      }

      &.loading {
        pointer-events: none;

        .icon {
          animation: rotate360 2s linear infinite;
        }
      }
    }
  }
}
</style>