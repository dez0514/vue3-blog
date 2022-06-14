<template>
  <swiper class="swiper-pic-container" 
    :watchSlidesProgress="true"
    :loop="true"
    :resistanceRatio="0"
    :pagination="false"
    @slideChange="onSlideChange"
    @swiper="onSwiper"
    @setTransition="setTransition"
    @setTranslate="setTranslate"
    @resize="resize"
  >
    <!-- :autoplay="autoplayOptions"  :modules="modules" -->
    <swiper-slide>
      <div class="mobile-banner">
        <img src="../assets/pg1.png" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="mobile-banner">
        <img src="../assets/pg2.png" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="mobile-banner">
        <img src="../assets/pg3.png" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="mobile-banner">
        <img src="../assets/pg4.png" />
      </div>
    </swiper-slide>
  </swiper>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import "swiper/css/bundle";
import { ref } from "vue"
// import { Pagination, A11y, Autoplay } from 'swiper'
// import { PaginationOptions } from 'swiper/types/modules/pagination';
// const autoplayOptions = {
//   delay: 5000,
//   disableOnInteraction: false,
//   loop: false,
//   pauseOnMouseEnter: true,
//   reverseDirection: false
// }
// const paginationOptions: PaginationOptions = {
//   type: 'custom', // 自定义的配合 renderCustom
//   clickable: true,
//   renderCustom: (swiper, current, total) => renderCustom(swiper, current, total)
// }
// const renderCustom = (swiper: any, current: number, total: number) => {
//   let paginationHtml = "<div class='abc'>";
//   for (let i = 0; i < total; i++) {
//     // 判断是否是激活焦点，是的话添加active类，不是就只添加基本样式类
//     if (i === (current - 1)) {
//       paginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
//     } else {
//       paginationHtml += '<span class="swiper-pagination-customs"></span>';
//     }
//   }
//   paginationHtml += '</div>'
//   // console.log('paginationHtml===', paginationHtml)
//   return paginationHtml
//   // return current + ' of ' + total;
// }
// const modules = [Pagination, A11y, Autoplay]
const controlSwiper = ref(null)

const onSwiper = (swiper: any) => {
  console.log(swiper);
  controlSwiper.value = swiper
  init(swiper)
};
const init = (swiper: any) => {
  let slides = swiper.slides;
  for (let i = 0; i < slides.length; i++) {
    let slide = slides.eq(i);
    slide.css("zIndex", 100 - i); //设置slide的z-index层级
  }
}
const resize = (swiper: any) => {
  console.log('resize===', swiper)
  swiper.update();
}
const setTranslate = (swiper: any) => {
  let slides = swiper.slides;
  let offsetAfter = swiper.width * 0.95; //每个slide的位移值
  for (let i = 0; i < slides.length; i++) {
    let slide = slides.eq(i);
    //  获取 progress 需要配合 watchSlidesProgress="true"
    let progress = slides[i].progress;
    if (progress <= 0) {
      //右边slide位移
      slide.transform("translate3d(" + progress * offsetAfter + "px, 0, 0) scale(" + (1 - Math.abs(progress) / 20) + ")")
      slide.css("opacity", (progress + 3)); //最右边slide透明
    }
    if (progress > 0) {
      slide.transform("rotate(" + (-progress * 5) + "deg)"); //左边slide旋转
      slide.css("opacity", (1 - progress)); //左边slide透明
    }
  }
}
const setTransition = (swiper: any, transition: any) => {
  for (let i = 0; i < swiper.slides.length; i++) {
    let slide = swiper.slides.eq(i);
    slide.transition(transition);
  }
}
const onSlideChange = () => {
  console.log('slide change');
};

</script>
<style lang="scss">
.swiper-pic-container {
  width: 200px;
  height: 200px;
}

.swiper-slide {
  width: 100%;
  margin-right: 0;
  text-align: center;
}

.swiper-slide div {
  width: 100%;
  border-radius: 7px;
  margin: 10px 0 10px 4%;
}

.swiper-slide div img {
  width: 86%;
  display: block;
  border-radius: 7px;
}
/* .swiper-pagination-custom {
  height: 50px;
} */
.swiper-pagination-customs {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: pink;
  &.swiper-pagination-customs-active {
    background: blue;
  }
}
</style>