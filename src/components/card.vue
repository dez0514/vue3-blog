<template>
  <div class="card-wrap" @click="jumpToDetail">
    <div class="cover" :style="{
      background: `gray url(${info?.banner}) no-repeat`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover'}"
    />
    <div class="box">
      <div class="title">{{ info?.title }}</div>
      <div class="meta">
        <time class="time">{{ cardTime }}</time>
      </div>
      <div class="tags">
        <div class="tags-scroll">
          <div class="tag-strip"
            v-for="(item, index) in info?.tagList"
            :key="index"
            :style="{ color: item.color }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { toRefs, computed } from 'vue';
import dayjs from 'dayjs';
const router = useRouter();
// const route = useRoute();
const props = defineProps({
  info: { type: Object }
})
const { info } = toRefs(props)
// console.log('info===', info)
const cardTime = computed(() => {
  if(info && info.value && info.value.update_time) {
    return dayjs(info.value.update_time).format('MM月DD日 · YYYY年')
  } else if(info && info.value && info.value.create_time) {
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