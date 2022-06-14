<template>
  <swiper class="swiper-text-container" 
    :watchSlidesProgress="true"
    :loop="true"
    :resistanceRatio="0"
    :pagination="false"
    @slideChange="onSlideChange"
    @swiper="onSwiper"
    @resize="resize"
  >
    <swiper-slide>
      <div >
        11111
      </div>
    </swiper-slide>
    <swiper-slide>
      <div>
        2222
      </div>
    </swiper-slide>
    <swiper-slide>
      <div>
        3333
      </div>
    </swiper-slide>
    <swiper-slide>
      <div>
        4444
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
  // init(swiper)
};
// const init = (swiper: any) => {
//   console.log('init==', swiper);
// }
const resize = (swiper: any) => {
  console.log('resize===', swiper)
  swiper.update();
}
const onSlideChange = () => {
  console.log('slide change');
};

</script>
<style lang="scss">
.swiper-text-container {
  width: 100%;
  height: 100%;
  padding-top: 200px;
}

.swiper-slide {
  width: 100%;
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