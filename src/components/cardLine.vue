<template>
  <div class="card-line">
    <div class="cover" :style="{ backgroundImage: `url(${png})` }"
      @click="jumpToDetail"></div>
    <div class="card-line-main">
      <div class="title" @click="jumpToDetail">Promise的完全实现的完全实现的完全实现的完全实现</div>
      <div class="time">6月30日 · 2021年</div>
      <div class="tags">
        <div class="tags-scroll">
          <div class="tag-strip" style="color: rgb(24, 144, 255)">React</div>
          <div class="tag-strip" style="color: rgb(134, 137, 140)">源码解读</div>
          <div class="tag-strip" style="color: rgb(219, 86, 64)">JavaScript</div>
          <div class="tag-strip" style="color: rgb(120, 109, 93)">Node</div>
          <div class="tag-strip" style="color: rgb(183, 235, 143)">Webpack</div>
          <div class="tag-strip" style="color: rgb(24, 144, 255)">React</div>
          <div class="tag-strip" style="color: rgb(134, 137, 140)">源码解读</div>
          <div class="tag-strip" style="color: rgb(219, 86, 64)">JavaScript</div>
          <div class="tag-strip" style="color: rgb(120, 109, 93)">Node</div>
        </div>
      </div>
      <div class="desc">
        开发中Promise是及其常用的语法，基本上对于异步的处理大都是通过Promise来进行完成。Promise规范有很多，ES6最终采用的是Promise/A+
        规范,所以以下代码也基本是基于这个规范来进行编写的。
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import png from '../assets/test.jpg'
const jumpToDetail = () => {
  console.log('gooo====')
}
</script>
<style lang="scss" scoped>
.card-line {
  display: flex;
  padding-bottom: 20px;
}

.card-line-main {
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  padding: 10px 0 10px 20px;
}

.cover {
  overflow: hidden;
  flex-shrink: 0;
  width: 150px;
  height: 134px;
  display: block;
  box-shadow: 0 13px 15px var(--gray_opacity_2);
  transition: box-shadow 0.25s, transform 0.25s;
  border-radius: 8px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  cursor: pointer;
}

.cover:hover {
  transform: translateY(13px);
  box-shadow: 0 3px 5px var(--gray_opacity_3);
}

.title {
  overflow: hidden;
  margin-bottom: 5px;
  color: var(--gray_1);
  font-size: 16px;
  font-weight: 600;
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.title:hover {
  color: var(--primary);
}

.time {
  color: var(--gray_4);
  font-size: 12px;
  transition: opacity 0.25s;
}

.tags {
  position: relative;
  margin: 5px 0;
  height: 23px;

  .tags-scroll {
    overflow-x: auto;
    /* overflow: hidden; */
    white-space: nowrap;

    .tag-strip {
      display: inline-block;
      font-size: 10px;
      padding: 0 10px;
      line-height: 20px;
      position: relative;
      display: inline-block;
      transition: padding 0.3s;
    }

    .tag-strip::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: currentColor;
      opacity: 0.15;
      border-radius: 20px;
    }

    .tag-strip:hover {
      padding: 0 20px;
    }
  }
}

.tags::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 3px;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), var(--gray_9));
}

.tags .tag-strip:not(:first-child) {
  margin-left: 4px;
}

.desc {
  padding-top: 20px;
  width: 100%;
  color: var(--gray_4);
  font-size: 16px;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>