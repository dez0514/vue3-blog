<template>
  <div class="detail">
    <banner />
    <div class="content">
      <div style="width: 250px;flex-shrink: 0;" v-if="isPc">
        <left-menu-wrap>
          <template #default>
            <div>
              目录
            </div>
          </template>
        </left-menu-wrap>
      </div>
      <div class="art-wrap">
        <div class="article-content">
          文章
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import banner from '../../components/banner/banner.vue'
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
const configStores = configStore()
const { isPc } = storeToRefs(configStores);
</script>
<style lang="scss" scoped>
.detail {
  position: relative;
  padding-bottom: 50px;
}
.content {
  position: relative;
  box-sizing: border-box;
  display: flex;
  .art-wrap {
    margin-top: 20px;
    flex: 1;
    box-sizing:border-box;
    min-height: calc(100vh - 78px - 138px - 320px - 50px - 20px);
  }
  .art-wrap .article-content {
    overflow: hidden;
    width: 100%;
    height: 100%;
    flex: 1;
    border-radius: 13px;
    box-shadow: 0 13px 15px var(--gray_opacity_1);
    background-color: var(--white);
  }
}
</style>