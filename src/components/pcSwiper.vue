<template>
  <swiper class="swiper-pc-container" 
    :loop="true"
    :resistanceRatio="0"
    :pagination="false"
    :followFinger="false"
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
        <div class="img-wrap">
          <img src="../assets/pg1.png" alt="">
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
        <div class="img-wrap">
          <img src="../assets/pg2.png" alt="">
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
        <div class="img-wrap">
          <img src="../assets/pg3.png" alt="">
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
        <div class="img-wrap">
          <img src="../assets/pg4.png" alt="">
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
const controlSwiper = ref(null)
const onSwiper = (swiper: any) => {
  console.log(swiper);
  controlSwiper.value = swiper
};
const resize = (swiper: any) => {
  console.log('resize===', swiper)
  swiper.update();
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
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
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
    img {
        display: block;
        width: 100%;
    }
  }
}
</style>