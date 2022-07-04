<template>
  <div class="detail">
    <banner />
    <div class="content">
      <div :class="['menu-box', isShowMenu ? '':'hide']" v-show="isPc">
        <left-menu-wrap>
          <template #default>
            <div class="toc-wrap">
              目录
            </div>
          </template>
        </left-menu-wrap>
      </div>
      <div :class="['art-wrap', isShowMenu ? '':'hideside']">
        <div class="article-content">
          <github-corner position="left" fill="#20a0ff" color="#fff" :blank="true" repo="https://github.com/dez0514" />
          <div class="meta">
            <div>6月30日.2022年</div>
            <div class="meta-icon"><svg-icon icon-class="time" /></div>
            <div class="meta-txt">JavaScript·vue</div>
            <div class="meta-icon"><svg-icon icon-class="tag" /></div>
            <div class="meta-txt">100</div>
            <div class="meta-icon"><svg-icon icon-class="blog" /></div>
          </div>
          <div class="control-wrap">
            <div class="control-content">
              <div class="control-btn">
                <div class="control-icon"><svg-icon icon-class="like" /></div>
                <div class="control-txt">6</div>
              </div>
              <div class="control-btn">
                <div class="control-icon"><svg-icon icon-class="message" /></div>
                <div class="control-txt">2</div>
              </div>
              <div class="control-btn">
                <div class="control-icon" @click="handleChangeShowMenu"><svg-icon :icon-class="isShowMenu ? 'full_screen':'full_screen_cancel'" /></div>
              </div>
            </div>
          </div>
          <div class="article-content-wrap">
            文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容
          </div>
        </div>
        <div class="article-comment-wrap">
          <comment />
        </div>
      </div>
    </div>
    <pagination :total="100" v-model:current-page="pageNumber"></pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import banner from '../../components/banner/banner.vue'
import comment from '../../components/comment/index.vue'
import pagination from '../../components/pagination.vue';
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
import { GithubCorner } from '@vfup/github-corner'
import '@vfup/github-corner/dist/style.css'
const configStores = configStore()
const { isPc } = storeToRefs(configStores);
const isShowMenu = ref<boolean>(true)
const pageNumber = ref<number>(1)
const handleChangeShowMenu = () => {
  isShowMenu.value = !isShowMenu.value
}
</script>
<style lang="scss" scoped>
.detail {
  position: relative;
  padding-bottom: 50px;
}
.content {
  position: relative;
  box-sizing: border-box;
  display: flex;
  .menu-box {
    overflow: hidden;
    flex-shrink: 0;
    transition: all 0.5s;
    width: 250px;
    opacity: 1;
    &.hide {
      width: 0;
      opacity: 0;
      transform: translateY(20px);
    }
  }
  .art-wrap {
    box-sizing:border-box;
    padding-left: 20px;
    margin-top: 20px;
    flex: 1;
    transition: all .5s;
    min-height: calc(100vh - 78px - 138px - 320px - 50px - 20px);
    &.hideside {
      padding-left: 0;
    }
  }
  .art-wrap .article-content {
    position: relative;
    box-sizing: border-box;
    padding: 30px 40px;
    width: 100%;
    flex: 1;
    border-radius: 13px;
    box-shadow: 0 13px 15px var(--gray_opacity_1);
    background-color: var(--white);
    :deep(.github-corner) {
      overflow: hidden;
      border-top-right-radius: 8px;
    }
  }
}
.meta {
  position: absolute;
  top: 30px;
  right: 40px;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 12px;
  .meta-icon {
    margin-left: 5px;
  }
  .meta-txt {
    margin-left: 5px;
  }
}
.control-wrap {
  position: absolute;
  right: -10px;
  top: 50px;
  color: var(--white);
  filter: drop-shadow(-5px 6px 5px rgba(255,73,73,.3));
  .control-content {
    position: relative;
    padding-right: 10px;
    background: linear-gradient(90deg,#ff4949,#ff7849 calc(100% - 6px),#ffb350);
    border-bottom-right-radius: 5px;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 16px;
    .control-btn {
      padding: 0 10px;
      display: flex;
      align-items: center;
      color: hsla(0,0%,100%,.5);
    }
    .control-txt {
      margin-left: 4px;
      font-size: 12px;
    }
  }
  &::before {
    content: "";
    position: absolute;
    left: -16px;
    top: 0;
    border-color: transparent #ff4949 #ff4949 transparent;
    border-style: solid;
    border-width: 20px 8px;
    vertical-align: bottom;
  }
  &::after {
    position: absolute;
    right: 0;
    top: -10px;
    content: "";
    display: block;
    border-color: transparent transparent #ca1f1e #ca1f1e;
    border-style: solid;
    border-width: 5px;
    transform-origin: bottom;
    transform: scaleY(.75);
  }
}
.article-content-wrap {
  padding-top: 72px;
}
.article-comment-wrap {
  margin-top: 20px;
}
</style>
<style lang="scss" scoped>
// 目录样式
.toc-wrap {
  margin-top: 20px;
  box-sizing: border-box;
  width: 250px;
  padding: 8px;
}
.toc-wrap {
  overflow: hidden;
  overflow-y: auto;
  max-height: calc(100vh - 58px);
}
:deep(.toc-wrap) div > .anchor-ul {
  padding: 0.1px 0 20px;
  margin-left: 5px;
  position: relative;
  > li {
    cursor: pointer;
    display: inline-block;
    position: relative;
    margin: 20px 0 5px -5px;
    padding-right: 16px;
    filter: drop-shadow(0 1px 0 rgba(31, 45, 61, 0.2))
      drop-shadow(0 -1px 0 #fff) drop-shadow(5px 6px 5px rgba(31, 45, 61, 0.1));
    color: #8492a6;
    .toc-item {
      max-width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      font-weight: 700;
      background: linear-gradient(90deg, #fff, #f0f2f7 6px, #d8e0ea);
      font-size: 14px;
      line-height: 34px;
      height: 34px;
      padding: 0 12px 0 20px;
      border-bottom-left-radius: 5px;
      vertical-align: bottom;
      text-shadow: 0 1px #fff;
      transition: 0.25s;
      cursor: pointer;
    }
    .toc-item::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      border: 17px solid #d8e0ea;
      border-left-width: 8px;
      border-right: 8px solid transparent;
      border-bottom: 17px solid transparent;
      vertical-align: bottom;
    }
  }
  > li.active {
    color: #fff;
    filter: drop-shadow(0 1px 0 #0394ff)
      drop-shadow(6px 7px 8px rgba(32, 160, 255, 0.4));
    .toc-item {
      background: linear-gradient(90deg, #76d5ff, #20baff 6px, #0394ff);
      text-shadow: 0 1px #0084e6;
      color: #fff;
    }
    .toc-item::after {
      content: "";
      border: 17px solid #0394ff;
      border-left-width: 8px;
      border-right: 8px solid transparent;
      border-bottom: 17px solid transparent;
    }
  }
  .anchor-ul li {
    text-shadow: 0 1px #fff;
    margin: 5px 0;
    .toc-item {
      display: inline-block;
      padding: 10px 0 10px 20px;
      position: relative;
      color: #657487;
      transition: 0.3s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 205px;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
    }
    .toc-item::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: 1px solid #cad1db;
      background: #fff;
      left: 0;
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: 0.3s;
    }
  }
  .anchor-ul li.active {
    text-shadow: 0 1px #fff;
    .toc-item {
      color: #20a0ff;
      font-weight: 600;
    }
    .toc-item::before {
      content: "";
      width: 17px;
      height: 10px;
      border-radius: 4px 100% 100% 4px/4px 80% 80% 4px;
      border: 1px solid #20a0ff;
      background: #59b8ff;
      box-shadow: 0 1px #76d5ff inset, 0 2px 3px rgba(32, 160, 255, 0.3);
      left: -3px;
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: 0.3s;
    }
  }
  li:hover * {
    color: #409eff;
  }
  .anchor-ul li:hover * {
    color: #409eff;
  }
}
:deep(.toc-wrap) div > .anchor-ul > li:before {
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

:deep(.toc-wrap) div > .anchor-ul:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 6px;
  background: linear-gradient(90deg, #fff 1px, #d8e0ea);
  border: 1px solid #cad1db;
  box-shadow: 0.5px 3px 5px rgba(31, 45, 61, 0.1);
  border-radius: 4px;
}
/* :deep(.markdown-body) p,
:deep(.markdown-body) pre,
:deep(.markdown-body) ul {
  margin: 1.5rem 0;
}
:deep(.markdown-body) p:first-child,
:deep(.markdown-body) pre:first-child,
:deep(.markdown-body) ul:first-child {
  margin-top: 0;
}
:deep(.markdown-body) h1 {
  font-size: 24px;
} */
/* .tocs {
  width: 250px;
} */
</style>