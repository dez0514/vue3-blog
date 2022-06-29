<template>
  <div class="home">
    <banner mode="swiper" />
    <div class="content">
      <div style="width: 200px;flex-shrink: 0;" v-if="isPc">
        <left-menu-wrap>
          <template #default>
            <nav-tags />
          </template>
        </left-menu-wrap>
      </div>
      <div class="list-box" :style="{ padding: !isPc ? '15px 15px 0' : '30px 0 0'}">
        <div class="list-wrap">
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <!-- <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card> -->
          <!-- <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card> -->
          <!-- <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line> -->
        </div>
      </div>
    </div>
    <pagination :total="100" v-model:currentPage="pageNumber"></pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import NavTags from '../../components/NavTags.vue'
import banner from '../../components/banner.vue'
import card from '../../components/card.vue'
import pagination from '../../components/pagination.vue'
// import cardLine from '../../components/cardLine.vue'
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
const configStores = configStore()
const { isPc } = storeToRefs(configStores);
const pageNumber = ref<number>(1)
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  padding-bottom: 50px;
}
.content {
  position: relative;
  box-sizing: border-box;
  display: flex;
  .list-box {
    box-sizing:border-box;
    min-height: 606px;
  }
  .list-box .list-wrap {
    overflow: hidden;
    width: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(5, calc((100% - 120px) / 5));
    gap: 30px;
    /* grid-template-columns: repeat(2, calc((100% - 18px) / 2));
    gap: 18px; */
  }
}
@media screen and (min-width:991px) and (max-width: 1600px) {
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(4, calc((100% - 75px) / 4));
    gap: 25px;
  }
}
@media screen and (min-width:577px) and (max-width: 990px) {
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(3, calc((100% - 30px) / 3));
    gap: 15px;
  }
}
@media screen and (min-width: 391px) and (max-width: 576px) {
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(2, calc((100% - 10px) / 2));
    gap: 10px;
  }
}
@media screen and (max-width: 390px) {
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(1, 100%);
    gap: 0;
  }
}


</style>