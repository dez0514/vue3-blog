<template>
  <div class="tooltip-box" :style="{ '--tooltip_color': color || 'var(--primary)' }">
    <slot></slot>
    <div :class="['tooltip-arrow', `tooltip-arrow__${direction}`]" :style="{ ...contentStyle }">{{ content }}</div>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, CSSProperties } from 'vue'
interface Props {
  content: any;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  color?: string;
  contentStyle?: CSSProperties
}
const props = withDefaults(defineProps<Props>(), {
  content: '',
  direction: 'top',
  color: '',
  contentStyle: () => ({})
})
const { content, direction, color } = toRefs(props)
</script>
<style lang="less" scoped>
.mixinColor (@color) {
  .tooltip-arrow {
    background-color: @color;
  }
  .tooltip-arrow__top::before {
    border-top-color: @color !important;
  }
  .tooltip-arrow__bottom::before {
    border-bottom-color: @color !important;
  }
  .tooltip-arrow__left::before {
    border-left-color: @color !important;
  }
  .tooltip-arrow__right::before {
    border-right-color: @color !important;
  }
}
.tooltip-box {
  position: relative;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  .mixinColor(var(--tooltip_color));
  .tooltip-arrow {
    min-width: 60px;
    position: absolute;
    padding: 10px;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    opacity: 0;
    transition: all 0.5s;
    pointer-events: none;
    font-size: 12px;
    white-space: nowrap;

    &::before {
      content: '';
      position: absolute;
      background: transparent;
      border: 7px solid transparent;
    }
  }

  .tooltip-arrow__top {
    bottom: e('calc(100% + 12px)');
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 20px;

    &::before {
      top: calc(100% - 1px);
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .tooltip-arrow__bottom {
    top: e('calc(100% + 12px)');
    left: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;

    &::before {
      bottom: calc(100% + 1px);
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .tooltip-arrow__left {
    right: e('calc(100% + 12px)');
    margin-right: 20px;
    top: 50%;
    transform: translateY(-50%);

    &::before {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .tooltip-arrow__right {
    left: e('calc(100% + 12px)');
    margin-left: 20px;
    top: 50%;
    transform: translateY(-50%);

    &::before {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &:hover {
    .tooltip-arrow__top {
      opacity: 1;
      margin-bottom: 0;
    }
    .tooltip-arrow__bottom {
      opacity: 1;
      margin-top: 0;
    }
    .tooltip-arrow__left {
      opacity: 1;
      margin-right: 0;
    }
    .tooltip-arrow__right {
      opacity: 1;
      margin-left: 0;
    }
  }
}
</style>

