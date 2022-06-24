<template>
  <div class="home">
    <banner />
    <div class="content">
      <div style="width: 200px;flex-shrink: 0;">
        <left-menu-wrap>
          <template #default>
            <nav-tags />
          </template>
        </left-menu-wrap>
      </div>
      <div style="box-sizing:border-box; padding-top: 30px;min-height: 606px">
        <div class="list-wrap">
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <!-- <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import NavTags from '../../components/NavTags.vue'
import banner from '../../components/banner.vue'
import card from '../../components/card.vue'
// import cardLine from '../../components/cardLine.vue'
</script>
<style lang="scss" scoped>
.home {
  padding-bottom: 50px;
}
.content {
  box-sizing: border-box;
  position: relative;
  display: flex;
  .list-wrap {
    overflow: hidden;
    width: calc(100% - 200px);
    flex: 1;
    display: grid;
    grid-template-columns: repeat(5, calc((100% - 120px) / 5));
    gap: 30px;
    /* grid-template-columns: repeat(2, calc((100% - 18px) / 2));
    gap: 18px; */
  }
}
</style>