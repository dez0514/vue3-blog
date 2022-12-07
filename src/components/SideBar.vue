<template>
  <div :class="['side-wrap', isCollapse ? 'rotate' : '']">
    <div class="side-container">
      <div class="side-route">
        <div :class="['route-item', tabIndex === index ? 'active' : '']" v-for="(item, index) in tabList" :key="index" @click="handleChangeRouter(index, item)">
          <svg-icon class="icon" :icon-class="item.class"></svg-icon>
          <div>{{item.title}}</div>
        </div>
      </div>
      <div class="extra-sideinfo">
        <div class="side-tags" v-if="(tagsList.length > 0)">
          <div class="side-title">
            <div class="side-txt">标签</div>
          </div>
          <div class="side-tag-list">
            <div class="side-tag-item" v-for="(item, index) in tagsList" :key="index" @click="handJumpTag(item.name)">{{ item.name }}</div>
          </div>
        </div>
        <div class="side-artlist" v-if="router.currentRoute.value.name === 'archive'">
          <div class="side-title">
            <div class="side-txt">时间轴</div>
          </div>
          <div class="art-list">
            <nav-times :inside="true"></nav-times>
          </div>
        </div>
        <div class="side-artlist" v-show="(router.currentRoute.value.name !== 'detail' && lastestList.length > 0)">
          <div class="side-title">
            <div class="side-txt">最新博客</div>
          </div>
          <div class="art-list" v-show="(lastestList.length > 0)">
            <div class="article" v-for="(item, index) in lastestList" :key="index" @click="handleToDetail(item.id)">
              <div class="cover"><img :src="item.banner" alt=""></div>
              <div class="desc">
                <div class="art-tit">{{ item.title }}</div>
                <div class="icon-count">
                  <div class="icon-desc blog">
                    <svg-icon class="icon" icon-class="blog"></svg-icon>
                    <div class="txt">{{ item.views }}</div>
                  </div>
                  <div class="icon-desc like">
                    <svg-icon class="icon" icon-class="like"></svg-icon>
                    <div class="txt">{{ item.likes }}</div>
                  </div>
                  <div class="icon-desc message">
                    <svg-icon class="icon" icon-class="message"></svg-icon>
                    <div class="txt">{{ item.commentCount }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="side-artlist" v-show="(router.currentRoute.value.name !== 'detail' && hotList.length > 0)">
          <div class="side-title">
            <div class="side-txt">热门博客</div>
          </div>
          <div class="art-list" v-show="(hotList.length > 0)">
            <div class="article" v-for="(item, index) in hotList" :key="index"  @click="handleToDetail(item.id)">
              <div class="cover"><img :src="item.banner" alt=""></div>
              <div class="desc">
                <div class="art-tit">{{ item.title }}</div>
                <div class="icon-count">
                  <div class="icon-desc blog">
                    <svg-icon class="icon" icon-class="blog"></svg-icon>
                    <div class="txt">{{ item.views }}</div>
                  </div>
                  <div class="icon-desc like">
                    <svg-icon class="icon" icon-class="like"></svg-icon>
                    <div class="txt">{{ item.likes }}</div>
                  </div>
                  <div class="icon-desc message">
                    <svg-icon class="icon" icon-class="message"></svg-icon>
                    <div class="txt">{{ item.commentCount }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="side-artlist" v-if="(router.currentRoute.value.name === 'detail' && detailMenuList.length > 0)">
          <div class="side-title">
            <div class="side-txt">目录</div>
          </div>
          <div class="art-list">
            <div class="menu-list">
              <div v-for="(item,index) in detailMenuList" :key="index">
                <div :class="['menu-item', item.nodeName, activeMenuIndex === index ? 'active':'']" @click="handleClickMenu(index, item)">
                  <span :id="`heading${item.hrefIndex}`">{{ item.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router";
import { configStore } from '../store'
import { storeToRefs } from 'pinia'
import NavTimes from './NavTimes.vue'
import { getAllTags } from '../api/tags'
import { baseURL } from '../api/urls'
import { tagItem } from '../types/index'
import { getArticlesPage } from '../api/articles'
import { detailPageStore } from '../store/detail'
import { emitter } from '../utils/useEmit'
import { MdTitle } from '../utils/marked'
const configStores = configStore()
const detailStore = detailPageStore()
const { isPc, isCollapse } = storeToRefs(configStores)
const { detailMenuList, activeMenuIndex } = storeToRefs(detailStore)
const router = useRouter();
console.log('router=====', router)
interface tabItem {
  title: string;
  name: string;
  class: string;
  width: number;
}
const tabIndex = ref<number>(0)
const tabList: tabItem[] = [
  { title: '博客', name: 'home', class: 'blog', width: 77 },
  { title: '归档', name: 'archive', class: 'archive', width: 77 },
  { title: '关于我', name: 'about', class: 'me', width: 91 },
  { title: '留言板', name: 'messageboard', class: 'message', width: 91 }
]
const tagsList = ref<tagItem[]>([])
const lastestList = ref<any>([])
const hotList = ref<any>([])
const getTagList = () => {
  getAllTags().then((res: any) => {
    if(res.code === 0) {
      tagsList.value = res.data.map((item: any) => {
        return {
          ...item,
          icon: item.icon ? `${baseURL}/imgs/${item.icon}` : ''
        }
      })
    }
  })
}
const handleToDetail = (id: number | string) => {
  router.push({ name: 'detail', params: { id: id } })
  configStores.updateConfig({ isCollapse: false, isShowMask: false })
}
const handleClickMenu = (index: number, item: MdTitle) => {
  emitter.emit('change-detail-menuindex', { index, item })
  configStores.updateConfig({ isCollapse: false, isShowMask: false })
}
const getArtList = (ishot: boolean = false) => {
  const params = {
    pageSize: 5,
    pageNum: 1,
    ishot: ishot
  }
  getArticlesPage(params).then((res: any) => {
    console.log('getlist==', res)
    if(res.code === 0) {
      if(ishot) {
        hotList.value = res.data
      } else {
        lastestList.value = res.data
      }
    }
  })
}
const handJumpTag = (item: string) => {
  router.push({ name: 'blog', params: { tag: item }})
  configStores.updateConfig({ isCollapse: false, isShowMask: false })
}
const handleChangeRouter = (index: number, item: tabItem) => {
  tabIndex.value = index
  router.push({ name: item.name })
  configStores.updateConfig({ isCollapse: false, isShowMask: false })
}
watch(() => router.currentRoute.value, (value) => {
  if(!isPc.value) {
    console.log("app路由变化了", value)
    const index = tabList.findIndex(item => item.name === value.name)
    tabIndex.value = index
    if(value.name === 'detail') {

    }
  }
})
onMounted(() => {
  getTagList()
  getArtList()
  getArtList(true)
})
</script>
<style lang="scss" scoped>
.side-wrap {
  z-index: var(--zIndex_6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background: var(--gray_9);
  transition: all .5s;
  transform-origin: right;
  transform: translateX(-250px) translateZ(100px) perspective(300px) rotateY(-55deg);
  &.rotate {
    transform-origin: right;
    transform: translateX(0) translateZ(100px) perspective(300px) rotateY(0deg);
  }
}
.side-container {
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  height: 100vh;
  padding: 10px;
}
.route-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 14px;
  padding: 0 30px 0 15px;
  color: var(--text-color);
  text-shadow: 0 1px var(--white);
  border-radius: 20px;
  transition: .25s;
  cursor: pointer;
  .icon {
    margin-right: 5px;
  }
  &:hover {
    color: var(--primary);
  }
  &.active {
    background: linear-gradient(90deg, var(--primary), var(--analogous_light_1));
    box-shadow: 0 10px 15px var(--primary_opacity_4);
    color: #fff;
    text-shadow: none;
  }
}
.extra-sideinfo {
  margin-top: 20px;
  padding-left: 5px;
}
.side-title {
  border-bottom: 1px solid #d8e0ea;
  box-shadow: 0 1px rgba(255, 255, 255, .5);
  .side-txt {
    position: relative;
    display: inline-block;
    padding-bottom: 8px;
    color: var(--text-color);
    font-size: 14px;
    font-weight: 600;
    transition: .25s;
    &:hover {
      color: var(--primary);
    }
  }
  .side-txt::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 50%;
    height: 3px;
    background: linear-gradient(#58b7ff 30%,#20a0ff 70%) var(--primary);
    border-radius: 3px;
    box-shadow: 0 3px 4px rgba(32,160,255,.5);
    transition: width .25s;
  }
}
.side-tag-list {
  padding-top: 8px;
  .side-tag-item {
    margin: 8px 6px 0 0;
    position: relative;
    display: inline-block;
    font-size: 12px;
    padding: 0 10px;
    background-color: #fff;
    color: var(--text_color);
    line-height: 30px;
    box-shadow: 0 13px 15px rgba(0,0,0,.1);
    border-radius: 7px;
    transition: .25s;
    cursor: pointer;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background-color: var(--primary);
      color: #fff;
    }
  }
}
.side-artlist {
  overflow: hidden;
  margin-top: 20px;
}
.art-list {
  padding-top: 10px;
}
.article {
  display: flex;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  .cover {
    width: 60px;
    img {
      display: block;
      width: 100%;
    }
  }
  .desc {
    flex: 1;
    box-sizing: border-box;
    padding-left: 12px;
    .art-tit {
      width: 100%;
      text-shadow: 0 1px var(--white_default);
      margin-bottom: 6px;
      color: var(--text_color);
      font-size: 14px;
      font-weight: 600;
      transition: .25s;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
    }
    .icon-count {
      display: flex;
      align-items: center;
      .icon-desc {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-right: 10px;
        .icon {
          margin-right: 5px;
        }
        &.blog {
          color: var(--primary);
        }
        &.like {
          color: var(--color_2);
        }
        &.message {
          color: var(--color_3);
        }
      }
    }
  }
  &:hover .art-tit {
    color: var(--primary)
  }
}
.article:not(:first-child) {
  margin-top: 20px;
}
// 目录
.menu-list {
  margin-top: 8px;
  position: relative;
  padding: 8px 8px 20px 8px;
  .menu-item {
    position: relative;
    display: inline-block;
    font-weight: 700;
    background: linear-gradient(90deg, var(--white), var(--gray_9) 6px, var(--gray_7));
    filter: drop-shadow(0 1px 0 var(--gray_opacity_2)) drop-shadow(0 -1px 0 var(--white)) drop-shadow(5px 6px 5px var(--gray_opacity_1));
    font-size: 14px;
    line-height: 34px;
    height: 34px;
    padding: 0 12px 0 20px;
    margin: 20px 0 5px -5px;
    border-bottom-left-radius: 5px;
    vertical-align: bottom;
    text-shadow: 0 1px var(--white);
    transition: 0.25s;
    cursor: pointer;
    span {
      max-width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      color: var(--gray_4);
      text-decoration: none;
      &:hover {
        color: var(--primary);
      }
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: -16px;
      display: inline-block;
      border: 17px solid #d8e0ea;
      border-left-width: 8px;
      border-right: 8px solid transparent;
      border-bottom: 17px solid transparent;
      vertical-align: bottom;
    }
    &::before {
      content: "";
      border: 3px solid rgba(31, 45, 61, 0.2);
      position: absolute;
      left: 0;
      top: -7px;
      border-left: 3px solid transparent;
      border-top: 3px solid transparent;
      transform-origin: bottom;
      transform: scaleY(0.8);
    }
    &.active {
      background: linear-gradient(90deg,var(--analogous_light_2),var(--analogous) 6px,var(--primary_dark_1));
      text-shadow: 0 -1px var(--primary_dark_2);
      filter: drop-shadow(0 1px 0 var(--primary_dark_1)) drop-shadow(6px 7px 8px var(--primary_opacity_4));
      box-shadow: none;
      span {
        color: var(--white);
      }
      &::after {
        border-top: 17px solid var(--primary_dark_1);
        border-left: 8px solid var(--primary_dark_1);
      }
      &::before {
        border-bottom: 3px solid var(--analogous_dark_1);
        border-right: 3px solid var(--analogous_dark_1);
      }
    }
  }
  .menu-item.h3 {
    background: none;
    margin-top: 5px;
    padding-left: 25px;
    filter: none;
    span {
      text-shadow: none;
    }
    &::after {
      display: none;
    }
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: 1px solid var(--gray_6);
      background: var(--white);
      left: 5px;
      display: block;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      -webkit-transition: .3s;
      transition: .3s;
    }
    &.active {
      span {
        color: var(--primary);
        text-shadow: none; 
      }
      &::before {
        content: "";
        width: 17px;
        height: 10px;
        border-radius: 4px 100% 100% 4px/4px 80% 80% 4px;
        border-color: var(--primary);
        background: var(--primary_light_1);
        box-shadow: 0 1px var(--analogous_light_2) inset,0 2px 3px var(--primary_opacity_3);
        left: 1px;
        top: 50%;
        transform: translateY(-50%);
        transition: .3s linear .3s;
        box-sizing: border-box;
      }
    }
  }
}
.menu-list::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 8px;
  bottom: 0;
  width: 6px;
  background: linear-gradient(90deg, #fff 1px, #d8e0ea);
  border: 1px solid #cad1db;
  box-shadow: 0.5px 3px 5px rgba(31, 45, 61, 0.1);
  border-radius: 4px;
}
</style>