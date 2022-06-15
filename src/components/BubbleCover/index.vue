<template>
  <div ref="containerRef" :class="['bubble-cover', className, radius ? 'bubble-cover__radius' : '', shadow ? 'bubble-cover__shadow' : '']">
    <div :class="['bubble-cover__bg', isBlur ? 'bubble-cover__bg-blur' : '']">
      <div v-if="cover" class="bubble-cover__bg-img" :style="{ backgroundImage: `url(${cover})` }"></div>
    </div>
    <canvas className="bubble-cover__canvas" ref="bubbleCanvas" :width="canvas.width" :height="canvas.height"></canvas>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from 'vue';
import Bubble from './bubble'
interface Props {
  refs?: any,
  width?: number,
  height?: number,
  cover?: string,
  className?: string,
  isBlur?: boolean,
  direction?: 'vertical' | 'horizontal',
  interval?: number[],
  radius?: boolean,
  shadow?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  isBlur: true,
  interval: () => []
})
const { width, height, refs, cover, className, isBlur, direction, interval, radius, shadow } = toRefs(props)
const containerRef = ref<HTMLDivElement | null>(null)
const bubbleCanvas = ref<HTMLCanvasElement | null>(null)
console.log('bubbleCanvas===', bubbleCanvas.value)


const bubbles = ref<Bubble[]>([])
const total = ref<number>(0)
const canvas = ref({
  width: 0,
  height: 0
})
const setCanvasSize = () => {
  if(containerRef.value) {
    const o = containerRef.value.getBoundingClientRect()
    canvas.value = {
      width: o.width,
      height: o.height
    }
    total.value = Math.ceil(canvas.value.width * 0.04)
    setBubbles(total.value)
  }
}
const setBubbles = (total: number) => {
  const arr: Bubble[] = []
  for (let i = 0; i < total; i++) {
    const b = new Bubble({
      width: canvas.value.width,
      height: canvas.value.height,
      direction: direction.value,
      interval: interval.value
    })
    arr.push(b)
  }
  bubbles.value = arr
}
const render = () => {
  const ctx = bubbleCanvas.value?.getContext('2d')
  if (bubbles.value.length === 0 || !ctx) {
    return
  }
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  bubbles.value.forEach((bubble) => {
    bubble.draw(ctx)
  })
  // console.log('bubble==', bubbles.value)
  requestAnimationFrame(render)
}
const init = () => {
  setCanvasSize()
  setTimeout(() => {
    render()
  },500)
}
onMounted(() => {
  init()
  // window.addEventListener('resize', () => init())
})
onUnmounted(() => {
  // window.removeEventListener('resize', () => {})
})
</script>
<style lang="scss" scoped>
.bubble-cover {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: 0.5s;

  &__radius {
    border-radius: 10px;
  }

  &__shadow {
    box-shadow: 0 15px 20px var(--gray_opacity_2);
  }

  &__bg {
    width: 100%;
    height: 100%;

    &-img {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      background-size: cover;
      background-position: center;
      transition: background-image 0.5s linear;
    }

    &-blur {
      filter: brightness(50%);

      .bubble-cover__bg-img {
        filter: blur(15px);
        transform: scale(1.1);
      }
    }
  }

  &__canvas {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>