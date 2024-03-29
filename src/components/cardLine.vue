<template>
  <div class="card-line" @click="jumpToDetail" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="cover" :style="{
      background: `gray url(${info?.banner}) no-repeat`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    }" />
    <div class="card-line-main">
      <div class="title">{{ info?.title }}</div>
      <div class="time">{{ cardTime }}</div>
      <div class="tags">
        <div class="tags-scroll">
          <div class="tag-strip" v-for="(item, index) in info?.tagList" :key="index" :style="{ color: item.color }">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="icon-ct-wrap">
        <div class="icon-count">
          <div class="icon-desc blog" :class="hoverIn ? 'anim' : ''">
            <svg-icon class="icon" icon-class="blog"></svg-icon>
            <div class="txt">{{ info?.views }}</div>
          </div>
          <div class="icon-desc like" :class="hoverIn ? 'anim' : ''">
            <svg-icon class="icon" icon-class="like"></svg-icon>
            <div class="txt">{{ info?.likes }}</div>
          </div>
          <div class="icon-desc message" :class="hoverIn ? 'anim' : ''">
            <svg-icon class="icon" icon-class="message"></svg-icon>
            <div class="txt">{{ info?.commentCount }}</div>
          </div>
        </div>
      </div>
      <div class="desc">{{ info?.content }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, computed, ref } from 'vue';
import { useRouter } from "vue-router";
import dayjs from 'dayjs';
const router = useRouter();
// const route = useRoute();
const props = defineProps({
  info: { type: Object }
})
const { info } = toRefs(props)
const hoverIn = ref<boolean>(false)
const mouseEnter = () => {
  hoverIn.value = true
}
const mouseLeave = () => {
  hoverIn.value = false
}
// console.log('info===', info)
const cardTime = computed(() => {
  if (info && info.value && info.value.update_time) {
    return dayjs(info.value.update_time).format('MM月DD日 · YYYY年')
  } else if (info && info.value && info.value.create_time) {
    return dayjs(info.value.create_time).format('MM月DD日 · YYYY年')
  } else {
    return ''
  }
})
const jumpToDetail = () => {
  router.push(`/detail/${info?.value?.id}`)
}
</script>
<style lang="scss" scoped>
.card-line {
  box-sizing: border-box;
  display: flex;
  padding-bottom: 20px;
}

.card-line-main {
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  padding: 10px 0 10px 20px;
}

.icon-ct-wrap {
  position: relative;
  height: 15px;
  width: 100%;
}

.icon-count {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;

  .icon-desc {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-right: 10px;
    opacity: 0;
    transform: translateX(60px);
    transition: all 0.25s;
    .icon {
      margin-right: 5px;
    }
    &.blog {
      color: var(--primary);
    }
    &.like {
      color: var(--color_2);
      &.anim {
        transition-delay: 0.2s;
      }
    }
    &.message {
      color: var(--color_3);
      &.anim {
        transition-delay: 0.4s;
      }
    }
    &.anim {
      transform: translateX(0);
      opacity: 1;
    }
  }
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
  -webkit-tap-highlight-color: transparent;
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
  -webkit-tap-highlight-color: transparent;
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
      padding: 0 10px 3px;
      line-height: 20px;
      position: relative;
      display: inline-block;
      transition: padding 0.3s;
      -webkit-tap-highlight-color: transparent;
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
  padding-top: 4px;
  width: 100%;
  color: var(--gray_4);
  font-size: 16px;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>