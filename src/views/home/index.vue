<template>
  <div class="home">
    <banner />
    <div class="content">
      <div style="width: 200px">
        <left-menu-wrap>
          <template #default>
            <year-month-tree />
          </template>
        </left-menu-wrap>
      </div>
      <div class="list-wrap">
        <!-- <card></card>
        <card></card>
        <card></card>
        <card></card>
        <card></card>
        <card></card>
        <card></card>
        <card></card>
        <card></card>
        <card></card> -->
        <card-line></card-line>
        <card-line></card-line>
        <card-line></card-line>
        <card-line></card-line>
        <card-line></card-line>
        <card-line></card-line>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import YearMonthTree from '../../components/yearMonthTree.vue'
import banner from '../../components/banner.vue'
// import card from '../../components/card.vue'
import cardLine from '../../components/cardLine.vue'
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
    padding-top: 30px;
    width: calc(100% - 200px);
    flex: 1;
    display: grid;
    /* grid-template-columns: repeat(5, calc((100% - 120px) / 5));
    gap: 30px; */
    grid-template-columns: repeat(2, calc((100% - 18px) / 2));
    gap: 18px;
  }
}
</style>