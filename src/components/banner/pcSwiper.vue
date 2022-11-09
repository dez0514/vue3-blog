<template>
  <swiper class="swiper-pc-container" 
    :loop="true"
    :resistanceRatio="0"
    :pagination="false"
    :followFinger="false"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    @resize="resize"
  >
    <swiper-slide v-for="item in list" :key="item.articleId">
      <div class="slide-content">
        <div class="slide-desc">
          <div class="title">{{ item.title }}</div>
            <div class="tag-wrap">
              <div class="tag" v-for="(inner, idx) in item.tagList" :key="`${item.articleId}_${idx}`">{{ inner.name }}</div>
            </div>
            <div class="btn-read-wrap">
              <div class="btn-read" @click="goDetail(item.articleId)">
                <svg-icon class="icons" icon-class="right-arrow"></svg-icon>阅读全文
              </div>
            </div>
        </div>
        <div class="img-wrap" v-show="item.banner" :style="{ '--url': `url(${item.banner})` }"></div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import "swiper/css/bundle";
import { ref, toRefs } from "vue"
import { useRouter } from "vue-router";
const emit = defineEmits<{
  (e: 'changeSlideIndex', articleId: number | string): void
}>()
const router = useRouter();
interface tagItem {
  name?: string;
}
interface bannerItem {
  title?: string;
  extraTitle?: string;
  banner?: string;
  tagList: tagItem[];
  articleId: string | number;
}
interface Props {
  list?: bannerItem[];
}
const props = withDefaults(defineProps<Props>(), {
  list: [] as any,
})
const { list  } = toRefs(props)
const controlSwiper = ref(null)
const onSwiper = (swiper: any) => {
  console.log('list===', list.value);
  console.log('swiper===', swiper);
  controlSwiper.value = swiper
  // loop = true 时的bug, 默认停在最后一页，手动切到第一页
  swiper.updateSlides();
  swiper.slideTo(1, 0, false);
};
const onSlideChange = (swiper: any) => {
  console.log('slide change========', swiper.activeIndex, swiper.realIndex);
  console.log('list===', list.value);
  const articleId = list.value[swiper.realIndex].articleId
  emit('changeSlideIndex', articleId)
};
const resize = (swiper: any) => {
  console.log('resize===', swiper)
  swiper.update();
}
const goDetail = (id: string | number | undefined) => {
  if(id) {
    router.push(`/detail/${id}`)
  }
}
</script>
<style lang="scss" scoped>
.swiper-pc-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 100%;
}

.swiper-slide .slide-content {
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  .slide-desc {
    flex: 1;
    margin-right: 30px;
    padding-left: 60px;
  }
  .title {
    font-size: 28px;
    font-weight: 600;
    color: var(--white);
  }
  .tag-wrap {
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: var(--white);
    text-shadow: 0 2px 3px var(--gray_opacity_5);
    opacity: .6;
    font-size: 16px;
    margin: 10px 0;
    .tag {
      margin: 0 8px;
      padding: 3px 0;
      position: relative;
      color: var(--white);
    }
  }
  .btn-read-wrap {
    display: flex;
    .btn-read {
      padding: 9px 7px;
      text-decoration: none;
      color: var(--white);
      border: 1px solid var(--white_opacity_3);
      border-radius: 7px;
      -webkit-transition: .25s;
      transition: .25s;
      margin-top: 5px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: var(--primary);
        background: var(--white);
      }
    }
  }
  .img-wrap {
    margin-right: 60px;
    width: 220px;
    height: 220px;
    border-radius: 12px;
    box-shadow: 0 8px 15px rgba(0, 0 , 0, .4), 60px 0 20px -30px rgba(0, 0, 0, .5), -60px 0 20px -30px rgba(0, 0, 0, .5);
    background: var(--url) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
  }
}
</style>