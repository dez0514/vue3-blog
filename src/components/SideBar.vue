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
        <div class="side-tags">
          <div class="side-title">
            <div class="side-txt">标签</div>
          </div>
          <div class="side-tag-list">
            <div class="side-tag-item" v-for="(item, index) in tagsList" :key="index">{{ item }}</div>
          </div>
        </div>
        <div class="side-artlist">
          <div class="side-title">
            <div class="side-txt">时间轴</div>
          </div>
          <div class="art-list">
            <year-month-tree :inside="true"></year-month-tree>
          </div>
        </div>
        <div class="side-artlist">
          <div class="side-title">
            <div class="side-txt">最新博客</div>
          </div>
          <div class="art-list">
            <div class="article" v-for="(item, index) in lastestList" :key="index">
              <div class="cover"><img :src="item.cover" alt=""></div>
              <div class="desc">
                <div class="art-tit">{{ item.title }}</div>
                <div class="icon-count">
                  <div class="icon-desc blog">
                    <svg-icon class="icon" icon-class="blog"></svg-icon>
                    <div class="txt">{{item.comments}}</div>
                  </div>
                  <div class="icon-desc message">
                    <svg-icon class="icon" icon-class="message"></svg-icon>
                    <div class="txt">{{item.reads}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="side-artlist">
          <div class="side-title">
            <div class="side-txt">热门博客</div>
          </div>
          <div class="art-list">
            <div class="article" v-for="(item, index) in hotList" :key="index">
              <div class="cover"><img :src="item.cover" alt=""></div>
              <div class="desc">
                <div class="art-tit">{{ item.title }}</div>
                <div class="icon-count">
                  <div class="icon-desc blog">
                    <svg-icon class="icon" icon-class="blog"></svg-icon>
                    <div class="txt">{{item.comments}}</div>
                  </div>
                  <div class="icon-desc message">
                    <svg-icon class="icon" icon-class="message"></svg-icon>
                    <div class="txt">{{item.reads}}</div>
                  </div>
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
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router";
import { configStore } from '../store'
import { storeToRefs } from 'pinia'
import YearMonthTree from './yearMonthTree.vue'
import png1 from '../assets/pg1.png'
const configStores = configStore()
const { isCollapse } = storeToRefs(configStores)
const router = useRouter();
const route = useRoute();
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
const tagsList = ['Vue', 'React', 'Mongodb', 'test', '自定义', 'node', '随笔']
const lastestList = [
  {
    title: '测试文章标题',
    cover: png1,
    comments: 0,
    reads: 0
  },
  {
    title: '测试文章标题测试文章标题测试文章标题测试文章标题22',
    cover: png1,
    comments: 0,
    reads: 0
  }
]
const hotList = [
  {
    title: '测试热门文章标题',
    cover: png1,
    comments: 0,
    reads: 0
  },
  {
    title: '测试热门文章标题2',
    cover: png1,
    comments: 0,
    reads: 0
  },
  {
    title: '测试热门文章标题',
    cover: png1,
    comments: 0,
    reads: 0
  },
  {
    title: '测试热门文章标题2',
    cover: png1,
    comments: 0,
    reads: 0
  },
  {
    title: '测试热门文章标题',
    cover: png1,
    comments: 0,
    reads: 0
  },
  {
    title: '测试热门文章标题2',
    cover: png1,
    comments: 0,
    reads: 0
  },
  {
    title: '测试热门文章标题',
    cover: png1,
    comments: 0,
    reads: 0
  },
  {
    title: '测试热门文章标题2',
    cover: png1,
    comments: 0,
    reads: 0
  }
]
const handleChangeRouter = (index: number, item: tabItem) => {
  tabIndex.value = index
  router.push({ name: item.name })
  configStores.updateCollapse(false)
}
onMounted(() => {
  setTimeout(() => {
    const index = tabList.findIndex(item => item.name === route.name)
    if (index > -1) {
      tabIndex.value = index
    }
  }, 300)
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
</style>