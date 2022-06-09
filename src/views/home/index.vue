<template>
  <div>
    <svg-icon icon-class="blog"></svg-icon>
    <div class="box2"></div>
    <!-- <div class="box">
      <bubble-cover :cover="cover"></bubble-cover>
    </div> -->
    <div>
      <myswiper></myswiper>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import BubbleCover from '../../components/BubbleCover/index.vue'
// import cover from '../../assets/test.jpg'
import myswiper from '../../components/Myswiper.vue'
</script>
<style>
.box {
  width: 600Px;
  height: 300Px;
  /* background-color: #666; */
}
.blog {
  font-size: 0.18rem;
  color: #f60;
  /* 这里定义图标的颜色 */
}


.box2 {
  width: 120px;
  height: 60px;
  background-color: #1890ff;
}

/* 设备最大宽度1200px的样式 */
@media screen and (max-width: 1200px) {}

/* 平板 */
@media screen and (max-width: 768px) {}

/* 手机 */
@media screen and (max-width: 480px) {
  .box2 {
    width: 120Px;
    height: 60Px;
    background-color: #1890ff;
  }
}
</style>