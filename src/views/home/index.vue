<template>
  <div>
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
        12345
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import YearMonthTree from '../../components/yearMonthTree.vue'
// import cover from '../../assets/test.jpg'
import banner from '../../components/banner.vue'
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  display: flex;
  .list-wrap {
    padding-top: 30px;
    width: calc(100% - 200px);
  }
}
</style>