<template>
  <div :class="['year-list', inside ? 'inside' : '']">
    <div :class="['year-title', (yearIndex === -1 || monthIndex === -1) ? 'active' : '']" @click="handleCheckOpen(-1)">全部</div>
    <div v-for="(item, index) in dateList" :key="index">
      <div :class="['year-title', yearIndex === index ? 'active' : '']" @click="handleCheckOpen(index)">{{item.title}}</div>
      <div :class="['month-list', openIndex === index ? 'is_show' : '']" :style="{'--month-list-height' : item.monthArr.length * 40 + 'px' }" v-if="item.monthArr && item.monthArr.length > 0">
        <div v-for="(inner, idx) in item.monthArr" :key="idx" @click="handleCheckMonth(index, idx, item.year, inner.value)">
          <div :class="['month-title', (yearIndex === index && monthIndex === idx) ? 'active' : '']">{{inner.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, toRefs } from "vue"
import { getArchiveTime } from '../api/articles'
const props = defineProps({
  inside: { type: Boolean, default: false } // 在app sidebar中使用时，背景白色，pc端 外面使用时 无背景色
})
const { inside } = toRefs(props)
const openIndex = ref<number>(-1) // 只是控制展开，不高亮
const yearIndex = ref<number>(-1) // 选月份的时候选年
const monthIndex = ref<number>(-1)
const dateList = ref<any>([])
const emit = defineEmits<{
  (e: 'change', obj: { year: number, month: number }): void
}>()
// 只是控制是否展开
const handleCheckOpen = (openindex: number) => {
  if(openIndex.value === openindex) return
  openIndex.value = openindex
  if(openindex === -1) {
    monthIndex.value = -1
    yearIndex.value = -1
    // 点全部也要emit出去
    emit('change', { year: 0, month: 0 })
  }
}
const handleCheckMonth = (yearindex: number, monthindex:number, year: number, month:number) => {
  if(yearIndex.value === yearindex && monthIndex.value === monthindex) return
  monthIndex.value = monthindex
  yearIndex.value = yearindex
  console.log(year, month)
  // 将年月emit出去
  emit('change', { year, month })
}
const getTimeList = () => {
  getArchiveTime({}, { loading: true }).then((res: any) => {
    console.log(res)
    if(res.code === 0) {
      res.data.forEach((item: any) => {
        item.title = `${item.year}年`
        item.monthArr = item.monthArr.map((inner:string) => {
          return {
            title: `${Number(inner)}月`,
            value: Number(inner)
          }
        })
        item.monthArr.unshift({ title: '全年', value: 0 })
      })
      dateList.value = res.data
    }
  })
}
onMounted(() => {
  getTimeList()
})
</script>
<style lang="scss" scoped>
.year-title {
  overflow: hidden;
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  font-size: 20px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
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
  -webkit-tap-highlight-color: transparent;
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