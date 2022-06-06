<template>
  <div :class="['header', scrollHeight > 0 ? 'fixed' : '']">
    <div class="header-left">昨天太近，明天太远 {{route.name}}</div>
    <div class="header-right">
      <div class="tab-list">
        <div :class="['tab-item', tabIndex === index ? 'active' : '']" v-for="(item, index) in tabList" :key="index" @click="handleChangeRouter(index, item)" @mouseenter="hanleHoverTab(index)" @mouseleave="hanleHoverTab(-1)">
          <div class="icon">
            <svg-icon :icon-class="item.class"></svg-icon>
          </div>
          <div>{{ item.title }}</div>
        </div>
        <div class="anchor" :style="{ '--menu_width': tabList[hoverIndex].width + 'px', '--tranlate-left': translateX }"></div>
      </div>
      <div class="search-btn">
        <svg-icon icon-class="search"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
interface tabItem {
  title: string;
  name: string;
  class: string;
  width: number;
}
const tabList: tabItem[] = [
  { title: '博客', name: 'home', class: 'blog', width: 77 },
  { title: '归档', name: 'archive', class: 'archive', width: 77 },
  { title: '关于我', name: 'about', class: 'me', width: 91 },
  { title: '留言板', name: 'messageboard', class: 'message', width: 91 }
]
const tabIndex = ref<number>(0)
const hoverIndex = ref<number>(0)
const scrollHeight = ref<number>(0)
const translateX = computed(() => {
  if(hoverIndex.value > 0) {
    let x = 0
    for(let i = 0; i < hoverIndex.value; i++) {
      x += tabList[i].width
    }
    return x + 'px'
  }
  return 0
})
const handleChangeRouter = (index: number, item: tabItem) => {
  tabIndex.value = index
  hoverIndex.value = index
  router.push({ name: item.name })
}
const hanleHoverTab = (index: number) => {
  if(index === -1) {
    hoverIndex.value = tabIndex.value
    return
  }
  hoverIndex.value = index
}
const handleScrollWindow = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  // console.log('scrollTop==', scrollTop)
  scrollHeight.value = scrollTop
}
onMounted(() => {
  setTimeout(() => {
    const index = tabList.findIndex(item => item.name === route.name)
    if(index > -1) {
      tabIndex.value = index
      hoverIndex.value = index
    }
  }, 300)
  window.addEventListener('scroll', handleScrollWindow)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollWindow)
})
</script>
<style lang="scss">
.header {
  z-index: var(--zIndex_3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 56px;
  padding: 0 40px;
  font-size: 14px;
  align-items: center;
  transition: background-color .5s, box-shadow .5s, -webkit-box-shadow .5s;
  box-shadow: 0 1px var(--gray_7), 0 0 transparent, 0 2px var(--white);
  &.fixed {
    background-color: var(--white_opacity_9);
    box-shadow: 0 5px 7px var(--gray_opacity_1),0 -10px var(--white_opacity_0);
  }
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.tab-list {
  position: relative;
  display: flex;
  align-items: center;
}

.tab-item {
  display: flex;
  padding: 0 15px;
  height: 56px;
  line-height: 56px;
  color: var(--text_color);
  cursor: pointer;

  &.active {
    color: var(--primary);
  }

  .icon {
    font-size: 14px;
    margin-right: 5px;
  }
}

.anchor {
  position: absolute;
  left: 0;
  bottom: -2px;
  width: var(--menu_width);
  height: 3px;
  border-radius: 3px;
  background-color: var(--primary);
  transform: translateX(var(--tranlate-left));
  transition: width .5s linear, -webkit-transform .6s cubic-bezier(0, 0, 0, 1.33);
  transition: transform .6s cubic-bezier(0, 0, 0, 1.33), width .5s linear;
  transition: transform .6s cubic-bezier(0, 0, 0, 1.33), width .5s linear, -webkit-transform .6s cubic-bezier(0, 0, 0, 1.33);
}

.search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: var(--text_color);
  background-color: var(--gray_opacity_1);
  margin-left: 50px;
  transition: .3s;
  cursor: pointer;

  &:hover {
    background-color: var(--primary);
    color: var(--white);
    -webkit-box-shadow: 0 13px 15px -5px var(--primary_opacity_5);
    box-shadow: 0 13px 15px -5px var(--primary_opacity_5);
  }
}
</style>