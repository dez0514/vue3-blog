<template>
  <swiper class="swiper-text-container" 
    :loop="true"
    :resistanceRatio="0"
    :pagination="false"
    :followFinger="false"
    @slideChange="onSlideChange"
    @slidePrevTransitionStart="onSlidePrevStart"
    @slideNextTransitionStart="onSlideNextStart"
    @swiper="onSwiper"
    @resize="resize"
  >
    <swiper-slide>
      <div class="slide-content">
        <div class="slide-desc">
          <div class="title">从0搭建一套属于自己的博客系统</div>
            <div class="tag-wrap">
              <div class="tag">vue</div>
              <div class="tag">react</div>
              <div class="tag">mongo</div>
            </div>
            <div class="btn-read-wrap">
              <div class="btn-read">
                <svg-icon class="icons" icon-class="right-arrow"></svg-icon>阅读全文
              </div>
            </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide-content">
        <div class="slide-desc">
          <div class="title">标题文章测试1</div>
            <div class="tag-wrap">
              <div class="tag">vue</div>
              <div class="tag">react</div>
              <div class="tag">mongo</div>
            </div>
            <div class="btn-read-wrap">
              <div class="btn-read">
                <svg-icon class="icons" icon-class="right-arrow"></svg-icon>阅读全文
              </div>
            </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide-content">
        <div class="slide-desc">
          <div class="title">标题文章测试2</div>
            <div class="tag-wrap">
              <div class="tag">vue</div>
              <div class="tag">react</div>
              <div class="tag">mongo</div>
            </div>
            <div class="btn-read-wrap">
              <div class="btn-read">
                <svg-icon class="icons" icon-class="right-arrow"></svg-icon>阅读全文
              </div>
            </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide-content">
        <div class="slide-desc">
          <div class="title">标题文章测试3</div>
            <div class="tag-wrap">
              <div class="tag">vue</div>
              <div class="tag">react</div>
              <div class="tag">mongo</div>
            </div>
            <div class="btn-read-wrap">
              <div class="btn-read">
                <svg-icon class="icons" icon-class="right-arrow"></svg-icon>阅读全文
              </div>
            </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import "swiper/css/bundle";
import { ref } from "vue"
import { emitter } from '../../utils/useEmit'
const controlSwiper = ref(null)
const onSwiper = (swiper: any) => {
  // console.log(swiper);
  controlSwiper.value = swiper
  // init(swiper)
};
// const init = (swiper: any) => {
//   console.log('init==', swiper);
// }
const resize = (swiper: any) => {
  // console.log('resize===', swiper)
  swiper.update();
}
const onSlideChange = (swiper: any) => {
  // console.log('slide change', controlSwiper.value); // realIndex,  activeIndex
  // console.log('ccccc===', swiper.activeIndex)
  // emitter.emit('change-slide', swiper.activeIndex)
};
const onSlidePrevStart = (swiper: any) => {
  emitter.emit('change-prev-slide')
}
const onSlideNextStart= (swiper: any) => {
  emitter.emit('change-next-slide')
}

</script>
<style lang="scss" scoped>
.swiper-text-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 100%;
  text-align: center;
}

.swiper-slide .slide-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  box-sizing: border-box;
  padding: 200px 10px 10px;
  width: 100%;
  height: 100%;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: var(--white);
  }
  .tag-wrap {
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    color: var(--white);
    text-shadow: 0 2px 3px var(--gray_opacity_5);
    opacity: .6;
    font-size: 16px;
    margin: 4px 0;
    .tag {
      margin: 0 8px;
      padding: 3px 0;
      position: relative;
      color: var(--white);
    }
  }
  .btn-read-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
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
}
</style>