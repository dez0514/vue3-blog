<template>
  <div class="archive">
    <banner />
    <div class="content">
      <div style="width: 150px;flex-shrink: 0;" v-if="isPc">
        <left-menu-wrap>
          <template #default>
            <nav-times />
          </template>
        </left-menu-wrap>
      </div>
      <div class="list-box" :style="{ padding: !isPc ? '15px 15px 0' : '30px 0 0'}">
        <div class="list-wrap">
          <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line>
          <card-line></card-line>
        </div>
      </div>
    </div>
    <pagination :total="100" v-model:currentPage="pageNumber"></pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import NavTimes from '../../components/NavTimes.vue'
import banner from '../../components/banner.vue'
import pagination from '../../components/pagination.vue'
import cardLine from '../../components/cardLine.vue'
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
const configStores = configStore()
const { isPc } = storeToRefs(configStores);
const pageNumber = ref<number>(1)
</script>
<style lang="scss" scoped>
.archive {
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
    width: calc(100% - 150px);
  }
  .list-box .list-wrap {
    overflow: hidden;
    width: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, calc((100% - 18px) / 2));
    gap: 18px;
  }
}
@media screen and (max-width: 990px) {
  .content .list-box {
    width: 100%;
  }
  .content .list-box .list-wrap {
    display: grid;
    grid-template-columns: repeat(1, 100%);
    gap: 10px;
  }
}

</style>