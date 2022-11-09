<template>
  <div class="pagination-wrapper">
    <ul :style="{ '--transleft': `${anchorLeft}px` }" v-show="total > pageSize">
      <!-- <li class="pagination-anchor"></li> -->
      <li class="pagination-item prev" @click="prevClick" v-show="showPrevBtn"
        @mouseenter="hanleHover('prev')"
        @mouseleave="hanleHover(-1)"
      >
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
      <li class="pagination-item next" @click="nextClick" v-show="showNextBtn"
        @mouseenter="hanleHover('next')"
        @mouseleave="hanleHover(-1)"
      >
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
  total?: number // 总页数
}
const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  currentPage: 1,
  total: 0,
})

const { pageSize, currentPage, total } = toRefs(props)
const maxPageCount = ref<number>(5) // 最多显示的页数（也可以设为属性传入进来），最好设置为 >=5 && <=21 的奇数
const emit = defineEmits<{
  (e: 'update:currentPage', num: number): void,
  (e: 'change', num: number): void
}>()
const current = computed({
  get: () => currentPage.value,
  set: (value: number) => emit('update:currentPage', value) // 需要在父组件中显示传入update方法
})
const hoverIndex = ref<number>(-1)
// 滑块偏移距离，默认和当前页面位置一致。增加hover效果
const anchorLeft = computed(() => {
  if(total.value === 0) return 0
  if(hoverIndex.value > -1) {
    return 38 * hoverIndex.value
  }
  if(!showPrevBtn.value || current.value === 1) return 0 // 第一页
  if(!showNextBtn.value) { // 在最后一页
    if(showPrevDot.value) { // 显示前dot
      return 38 * (maxPageCount.value + 1)
    } else {
      return 38 * current.value
    }
  }
  // 下面判断不考虑在 第一页 和 最后一页 的情况
  if(showPrevDot.value && showNextDot.value) { // 显示前后dot，说明在中间，那就正中间， 
    return 38 * (maxPageCount.value + 4 - 1) / 2
  } else if(showPrevDot.value) { // 显示前dot,不显示后dot,说明靠后
    return 38 * (maxPageCount.value + 1 - (pageCount.value - current.value))
  } else { 
  // 1.显示后dot,不显示前dot, 说明靠前
  // 2.dot 都不显示 说明在最大以内
    return 38 * current.value
  }
})
// hover页码时，滑块位置跟随 计算hover索引位置
const hanleHover = (typeOrindex: string | number) => {
  if (typeOrindex === 'prev') {
    hoverIndex.value = 0
    return
  }
  if (typeOrindex === 'next') { // 最后一个
    if(showPrevDot.value && showNextDot.value) {
      hoverIndex.value = maxPageCount.value + 2 + 1
    } else if(!showPrevDot.value && !showNextDot.value) {
      hoverIndex.value = pageCount.value
    } else {
      if(showPrevBtn.value) {
        hoverIndex.value = maxPageCount.value + 2
      } else {
        hoverIndex.value = maxPageCount.value + 1
      }
    }
    return
  }
  if(typeOrindex === -1) {
    hoverIndex.value = -1
    return
  }
  if(typeof typeOrindex === 'number') { // 滑入某个页码
    if(!showPrevDot.value && !showNextDot.value) { // 小于最大页码数量
      if(showPrevBtn.value) {
        hoverIndex.value = typeOrindex + 1 - 1
      } else {
        hoverIndex.value = typeOrindex - 1
      }
    } else if(showPrevDot.value && showNextDot.value) {
      // 当前页码在中间 上下按钮肯定存在，不需要写条件判断
      if(typeOrindex === 1) { // 滑入第一页
        hoverIndex.value = 1
      } else if(typeOrindex === pageCount.value) { // 滑入最后一页
        hoverIndex.value = maxPageCount.value + 2 + 1 - 1
      } else { // 滑入中间的数字页码
        // hoverIndex.value = typeOrindex + 2 - 1
        let temp = current.value - typeOrindex
        let n = halfMaxPageCount.value - temp // 距离中间位置的偏移数
        hoverIndex.value = n + 2
      }
    } else if(!showPrevDot.value && showNextDot.value) { // 显示后dot时，当前页靠前 hover 只有最后一页 多加一个dot偏移
      if(showPrevBtn.value) { // 当前不在第一页 显示上页按钮 多加1个
        if(typeOrindex === pageCount.value) {
          hoverIndex.value = maxPageCount.value + 2 - 1
        } else {
          hoverIndex.value = typeOrindex + 1 - 1
        }
      } else { // 当前在第一页
        if(typeOrindex === pageCount.value) {
          hoverIndex.value = maxPageCount.value + 1 - 1
        } else {
          hoverIndex.value = typeOrindex - 1
        }
      }
    } else { // 显示前dot， 说明当前页靠后，一定存在prev按钮
      if(typeOrindex === 1) {
        hoverIndex.value = 1
      } else {
        hoverIndex.value = maxPageCount.value + 1 - (pageCount.value - typeOrindex)
      }
    }
  }
}
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
  // console.log('list===', arr)
  return arr
})
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
        border-radius: 50%;
        background: linear-gradient(#fff, #f7f8fa);
        transition: all 0s;
        /* box-shadow: 0 6px 6px rgb(31, 45, 61, .05), 0 10px 10px rgb(31, 45, 61, .15), inset 0 -1px 2px hsl(0deg, 0%, 100%, 50%); */
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
      transition: transform .3s linear;
      transform: translateX(var(--transleft));
      box-shadow: 0 6px 6px rgb(31, 45, 61, .05), 0 10px 10px rgb(31, 45, 61, .15), inset 0 -1px 2px hsl(0deg, 0%, 100%, 50%);
      z-index: 1;
    }
  }
}
@media screen and (max-width: 990px) {
 .pagination-wrapper {
    transform: translate(-50%, calc(-100% - 5px));
 }
}
</style>