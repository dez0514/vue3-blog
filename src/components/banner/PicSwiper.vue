<template>
  <swiper class="swiper-pic-container" 
    :watchSlidesProgress="true"
    :loop="true"
    :resistanceRatio="0"
    :pagination="false"
    :followFinger="false"
    @slideChange="onSlideChange"
    @swiper="onSwiper"
    @setTransition="setTransition"
    @setTranslate="setTranslate"
    @resize="resize"
    @destroy="destroyCallback"
  >
    <!-- :autoplay="autoplayOptions"  :modules="modules" -->
    <swiper-slide v-for="(item, index) in list" :key="index">
      <div class="img-wrapper">
        <img :src="item?.banner" />
      </div>
    </swiper-slide>
  </swiper>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import "swiper/css/bundle";
import { ref, onUnmounted, onMounted, nextTick, toRefs } from "vue"
import { emitter } from '../../utils/useEmit'
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
interface Item {
  banner?: string;
  articleId: string | number;
}
interface Props {
  list: Item[];
}
const props = withDefaults(defineProps<Props>(), {
  list: [] as any,
})
const { list } = toRefs(props)
const controlSwiper = ref<any>(null)
const changeSlides = (type: String) => {
  if(controlSwiper.value && !controlSwiper.value.destroyed && controlSwiper.value.slidePrev && controlSwiper.value.slideNext) {
    // 条件判断 确保 controlSwiper 已经实例化再执行联动。controlSwiper.value.destroyed 为true时 说明新的swiper还没初始化完毕。
    console.log('controlSwiper emit===', controlSwiper.value)
    console.log('list pic ====', list.value)
    if(type === 'prev') {
      controlSwiper.value.slidePrev()
    } else if (type === 'next') {
      controlSwiper.value.slideNext()
    }
  }
}
const onSwiper = (swiper: any) => {
  // console.log(swiper);
  controlSwiper.value = swiper
  swiper.updateSlides();
  swiper.slideTo(1, 0, false);
  init(swiper)
};
const destroyCallback = () => {
  emitter.off('change-prev-slide', () => changeSlides('prev'))
  emitter.off('change-next-slide', () => changeSlides('next'))
}
const init = (swiper: any) => {
  let slides = swiper.slides;
  for (let i = 0; i < slides.length; i++) {
    let slide = slides.eq(i);
    slide.css("zIndex", 100 - i); //设置slide的z-index层级
  }
}
const resize = (swiper: any) => {
  // console.log('resize===', swiper)
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
const onSlideChange = (swiper: any) => {
  console.log('slide change pic========', swiper.activeIndex, swiper.realIndex);
};
onMounted(() => {
  nextTick(() => {
    emitter.on('change-prev-slide', () => changeSlides('prev'))
    emitter.on('change-next-slide', () => changeSlides('next'))
  })
})
onUnmounted(()=>{
  destroyCallback()
})
</script>
<style lang="scss" scoped>
.swiper-pic-container {
  width: 200px;
  height: 200px;
}

.swiper-slide {
  width: 100%;
  margin-right: 0;
  text-align: center;
}

.swiper-slide .img-wrapper {
  width: 100%;
  border-radius: 7px;
  margin: 30px 0 10px 4%; // 10
}

.swiper-slide .img-wrapper img {
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