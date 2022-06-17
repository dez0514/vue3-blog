<template>
  <div class="year-list">
    <div :class="['year-title', (yearIndex === -1 || monthIndex === -1) ? 'active' : '']" @click="handleCheckOpen(-1)">全部</div>
    <div v-for="(item, index) in dateList" :key="index">
      <div  :class="['year-title', yearIndex === index ? 'active' : '']" @click="handleCheckOpen(index)">{{item.title}}</div>
      <div :class="['month-list', openIndex === index ? 'is_show' : '']" v-if="item.children && item.children.length > 0">
        <div v-for="(inner, idx) in item.children" :key="idx" @click="handleCheckMonth(index, idx)">
          <div :class="['month-title', (yearIndex === index && monthIndex === idx) ? 'active' : '']">{{inner.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const openIndex = ref<number>(-1) // 只是控制展开，不高亮
const yearIndex = ref<number>(-1) // 选月份的时候选年
const monthIndex = ref<number>(-1)
const dateList = [
  {
    title: '2022',
    children: [
      { title: '全年' },
      { title: '1月' },
      { title: '2月' },
      { title: '5月' },
      { title: '6月' }
    ]
  },
  {
    title: '2021',
    children: [
      { title: '全年' },
      { title: '3月' },
      { title: '4月' },
      { title: '5月' },
      { title: '6月' }
    ]
  },
  {
    title: '2020',
    children: [
      { title: '全年' },
      { title: '3月' },
      { title: '4月' }
    ]
  }
]
// 只是控制是否展开
const handleCheckOpen = (openindex: number) => {
  if(openIndex.value === openindex) return
  openIndex.value = openindex
  if(openindex === -1) {
    monthIndex.value = -1
    yearIndex.value = -1
  }
}
const handleCheckMonth = (yearindex: number, monthindex:number) => {
  if(yearIndex.value === yearindex && monthIndex.value === monthindex) return
  monthIndex.value = monthindex
  yearIndex.value = yearindex
}
</script>
<style lang="scss" scoped>
.year-title {
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: var(--primary);
  }
}
.month-list {
  overflow: hidden;
  display: none;
  transition: all 1s;
  &.is_show {
    display: block;
  }
}
.month-title {
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  padding-left: 40px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: var(--primary);
  }
}
.active {
  color: var(--primary);
}
</style>