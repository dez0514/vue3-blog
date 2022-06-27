<template>
  <div class="pagination-wrapper">
    <ul :style="{ '--transleft': '38px' }">
      <li class="pagination-anchor"></li>
      <li class="pagination-item prev">
        <svg-icon icon-class="left"></svg-icon>
      </li>
      <li class="pagination-item">1</li>
      <li class="pagination-item dot-prev">
        <svg-icon class="dot-icon" icon-class="more"></svg-icon>
        <svg-icon class="dot-hover" icon-class="left"></svg-icon>
      </li>
      <li class="pagination-item">2</li>
      <li class="pagination-item dot-next">
        <svg-icon class="dot-icon" icon-class="more"></svg-icon>
        <svg-icon class="dot-hover" icon-class="right"></svg-icon>
      </li>
      <li class="pagination-item">3</li>
      <li class="pagination-item next">
        <svg-icon icon-class="right"></svg-icon>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue'
interface Props {
  pageSize: number,
  pageNum: number,
  currentPage: number,
  total: number
}
const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  pageNum: 1,
  currentPage: 1,
  total: 0
})
const { pageSize, pageNum, currentPage, total } = toRefs(props)
const hoverIndex = ref<number>(0)
const pageCount = computed(() => Math.ceil(total.value / pageSize.value))
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
    }
    .pagination-anchor {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(#fff,#f7f8fa);
      transition: -webkit-transform .3s linear;
      transition: transform .3s linear;
      transition: transform .3s linear,-webkit-transform .3s linear;
      transform: translateX(var(--transleft));
      box-shadow: 0 6px 6px rgb(31, 45, 61, .05), 0 10px 10px rgb(31, 45, 61, .15), inset 0 -1px 2px hsl(0deg, 0%, 100%, 50%);
      z-index: 1;
    }
  }
}
</style>