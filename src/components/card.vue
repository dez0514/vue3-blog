<template>
  <div class="card-wrap" @click="jumpToDetail" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="cover" :style="{
      background: `gray url(${info?.banner}) no-repeat`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    }" />
    <div class="box">
      <div class="title">{{ info?.title }}</div>
      <div class="meta">
        <div class="time" :class="hoverIn ? 'none' : ''">{{ cardTime }}</div>
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
      <div class="tags">
        <div class="tags-scroll">
          <div class="tag-strip" v-for="(item, index) in info?.tagList" :key="index" :style="{ color: item.color }">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { toRefs, computed, ref } from 'vue';
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
.card-wrap {
  position: relative;
  width: 100%;
  background-color: var(--white);
  box-shadow: 0 13px 15px var(--gray_opacity_1);
  border-radius: 13px;
  overflow: hidden;

  .cover {
    width: 100%;
    padding-top: 100%;
  }

  .box {
    padding: 8px 15px;
    .title {
      overflow: hidden;
      color: var(--gray_1);
      font-size: 16px;
      margin-top: 6px;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .meta {
      margin-top: 4px;
      position: relative;
      .time {
        color: var(--gray_4);
        font-size: 12px;
        transition: opacity 0.25s;
        &.none {
          opacity: 0;
        }
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
    }

    .tags {
      position: relative;
      margin-top: 10px;

      .tags-scroll {
        overflow-x: auto;
        white-space: nowrap;

        .tag-strip {
          display: inline-block;
          font-size: 10px;
          padding: 0 10px;
          height: 23px;
          line-height: 20px;
          position: relative;
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
          opacity: .15;
          border-radius: 20px;
        }

        .tag-strip:hover {
          padding: 0 20px;
        }
      }
    }
  }
}

.tags::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20px;
  background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff);
}

.card-wrap .tags .tag-strip:not(:first-child) {
  margin-left: 4px;
}
</style>