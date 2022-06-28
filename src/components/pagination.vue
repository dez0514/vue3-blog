<template>
  <div class="pagination-wrapper">
    <ul :style="{ '--transleft': `${anchorLeft}px` }" v-show="total > pageSize">
      <!-- <li class="pagination-anchor"></li> -->
      <li class="pagination-item prev" @click="prevClick" v-show="showPrevBtn">
        <svg-icon icon-class="left"></svg-icon>
      </li>
      <li class="pagination-item"
        :class="current === 1 ? 'act':''"
        @click="numClick(1)"
        @mouseenter="hanleHover(1)"
        @mouseleave="hanleHover(-1)"
      >1</li>
      <li class="pagination-item dot-prev" @click="dotClick('prev')" v-show="showPrevDot && pageCount > 1">
        <svg-icon class="dot-icon" icon-class="more"></svg-icon>
        <svg-icon class="dot-hover" icon-class="left"></svg-icon>
      </li>
      <template v-if="countList.length > 0">
        <li class="pagination-item"
          v-for="i in countList"
          :key="i"
          @click="numClick(i)"
          @mouseenter="hanleHover(i)"
          @mouseleave="hanleHover(-1)"
          :class="current === i ? 'act':''"
        >
        {{ i }}
        </li>
      </template>
      <li class="pagination-item dot-next" @click="dotClick('next')" v-show="showNextDot && pageCount > 1">
        <svg-icon class="dot-icon" icon-class="more"></svg-icon>
        <svg-icon class="dot-hover" icon-class="right"></svg-icon>
      </li>
      <li class="pagination-item"
       :class="current === pageCount ? 'act':''"
        v-if="pageCount > 1"
        @click="numClick(pageCount)"
        @mouseenter="hanleHover(pageCount)"
        @mouseleave="hanleHover(-1)"
      >{{ pageCount }}</li>
      <li class="pagination-item next" @click="nextClick" v-show="showNextBtn">
        <svg-icon icon-class="right"></svg-icon>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue'
interface Props {
  pageSize?: number, // 每页条数
  currentPage?: number, // 当前页码
  total?: number, // 总页数
  // maxPageCount?: number, // 最大显示多少个页面
}
const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  currentPage: 1,
  total: 0,
  // maxPageCount: 7
})
const { pageSize, currentPage, total } = toRefs(props)
const maxPageCount = ref<number>(7) // 最多显示的页数，最好设置为 >=5 <=21 的奇数
const emit = defineEmits<{
  (e: 'update:currentPage', num: number): void,
  (e: 'change', num: number): void
}>()
const current = computed({
  get: () => currentPage.value,
  set: (value: number) => emit('update:currentPage', value) // 需要在父组件中显示传入update方法
})
const hoverIndex = ref<number>(-1)
const anchorLeft = computed(() => {
  return 0
  // 考虑两个dot按钮 和 上下页按钮 显示隐藏情况
  // if(total.value === 0) return 0
  // if(!showPrevBtn && !showPrevDot && !showNextBtn && !showNextDot) {
  //   if(hoverIndex.value > -1) {
  //     return 38 * (hoverIndex.value - 1)
  //   } else {
  //     return 38 * (current.value - 1)
  //   }
  // } else {

  // }
})
// 总页数
const pageCount = computed(() => Math.ceil(total.value / pageSize.value))
const halfMaxPageCount = computed(() => (maxPageCount.value - 1) / 2)
const showPrevDot = computed(() => {
  let showPrevDot = false
  if (pageCount.value > maxPageCount.value) {
    if (current.value > maxPageCount.value - halfMaxPageCount.value) {
      showPrevDot = true
    }
  }
  return showPrevDot
})
const showNextDot = computed(() => {
  let showNextDot = false
  if (pageCount.value > maxPageCount.value) {
    console.log('reduce===', pageCount.value - halfMaxPageCount.value)
    console.log('current===', current.value)
    if (current.value < pageCount.value - halfMaxPageCount.value) {
      showNextDot = true
    }
  }
  return showNextDot
})
const showPrevBtn = computed(() => pageCount.value > 1 && current.value > 1)
const showNextBtn = computed(() => pageCount.value > 1 && current.value < pageCount.value)
const countList = computed(() => {
  let arr: number[] = []
  if (showPrevDot.value && !showNextDot.value) {
    const startPage = pageCount.value - (maxPageCount.value - 2)
    for (let i = startPage; i < pageCount.value; i++) {
      arr.push(i)
    }
  } else if (!showPrevDot.value && showNextDot.value) {
    for (let i = 2; i < maxPageCount.value; i++) {
      arr.push(i)
    }
  } else if (showPrevDot.value && showNextDot.value) {
    const offset = Math.floor(maxPageCount.value / 2) - 1;
    for (let i = current.value - offset; i <= current.value + offset; i++) {
      arr.push(i)
    }
  } else {
    for (let i = 2; i < pageCount.value; i++) {
      arr.push(i)
    }
  }
  console.log('list===', arr)
  return arr
})
const hanleHover = (index: number) => {
  hoverIndex.value = index
}
const prevClick = () => {
  console.log('prev page')
  if (current.value === 1) return
  current.value--
  emit('change', current.value)
}
const nextClick = () => {
  console.log('next page')
  if(current.value === pageCount.value) return
  current.value++
  emit('change', current.value)
}
const numClick = (num: number) => {
  console.log('numClick==', num)
  current.value = num
  emit('change', num)
}
const dotClick = (type: string) => {
  const maxPageOffset = maxPageCount.value - 2
  let newPage = current.value
  if (type === 'prev') {
    newPage = current.value - maxPageOffset
  } else if (type === 'next') {
    newPage = current.value + maxPageOffset
  }
  if (newPage < 1) {
    newPage = 1
  }
  if (newPage > pageCount.value) {
    newPage = pageCount.value
  }
  current.value = newPage
  emit('change', current.value)
}
</script>
<style lang="scss" scoped>
.pagination-wrapper {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  user-select: none;

  ul {
    position: relative;
    text-align: center;
    display: inline-block;
    white-space: nowrap;
    margin: 0;
    background: #e0e4ec;
    border-radius: 100px;
    box-shadow: 0 1px hsl(0deg, 0%, 100%, 50%), 0 5px 10px rgb(31, 45, 61, .15) inset;

    .pagination-item {
      position: relative;
      display: inline-block;
      cursor: pointer;
      color: #99a9bf;
      text-shadow: 0 1px hsl(0deg, 0%, 100%, 75%);
      width: 38px;
      height: 38px;
      line-height: 38px;
      font-size: 14px;
      transition: .25s;
      z-index: 2;

      .dot-hover {
        display: none;
      }

      &.dot-prev:hover {
        .dot-icon {
          display: none;
        }

        .dot-hover {
          display: inline-block;
        }
      }

      &.dot-next:hover {
        @extend .dot-prev;
      }
      &.act {
        color: red
      }
    }

    .pagination-anchor {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(#fff, #f7f8fa);
      transition: -webkit-transform .3s linear;
      transition: transform .3s linear;
      transition: transform .3s linear, -webkit-transform .3s linear;
      transform: translateX(var(--transleft));
      box-shadow: 0 6px 6px rgb(31, 45, 61, .05), 0 10px 10px rgb(31, 45, 61, .15), inset 0 -1px 2px hsl(0deg, 0%, 100%, 50%);
      z-index: 1;
    }
  }
}
</style>