<template>
  <div :class="['year-list', inside ? 'inside' : '']">
    <div :class="['year-title', (yearIndex === -1 || monthIndex === -1) ? 'active' : '']" @click="handleCheckOpen(-1)">全部</div>
    <div v-for="(item, index) in dateList" :key="index">
      <div  :class="['year-title', yearIndex === index ? 'active' : '']" @click="handleCheckOpen(index)">{{item.title}}</div>
      <div :class="['month-list', openIndex === index ? 'is_show' : '']" :style="{'--month-list-height' : item.children.length * 40 + 'px' }" v-if="item.children && item.children.length > 0">
        <div v-for="(inner, idx) in item.children" :key="idx" @click="handleCheckMonth(index, idx)">
          <div :class="['month-title', (yearIndex === index && monthIndex === idx) ? 'active' : '']">{{inner.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs } from "vue"
const props = defineProps({
  inside: { type: Boolean, default: false } // 在app sidebar中使用时，背景白色，pc端 外面使用时 无背景色
})
const { inside } = toRefs(props)
const openIndex = ref<number>(-1) // 只是控制展开，不高亮
const yearIndex = ref<number>(-1) // 选月份的时候选年
const monthIndex = ref<number>(-1)
const dateList = [
  {
    title: '2022年',
    children: [
      { title: '全年' },
      { title: '1月' },
      { title: '2月' },
      { title: '5月' },
      { title: '6月' }
    ]
  },
  {
    title: '2021年',
    children: [
      { title: '全年' },
      { title: '3月' },
      { title: '4月' },
      { title: '5月' },
      { title: '6月' }
    ]
  },
  {
    title: '2020年',
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
  transition: height .5s;
  height: 0;
  &.is_show {
    height: var(--month-list-height);
    transition: height .5s;
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
.inside {
  background: #fff;
  .year-title.active {
    box-shadow: 0 5px 7px var(--gray_opacity_1);
  }
  .month-list {
    box-shadow: inset 0 0 7px var(--gray_opacity_1);
  }
  /* .month-title {
    background: #fff;
  } */
}
</style>