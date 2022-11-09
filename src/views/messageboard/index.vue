<template>
  <div class="massageboard">
    <banner :banner="bannerBg" title="留言板" extraTitle="同道中人，理性留言"></banner>
    <div class="message-content">
      <comment />
    </div>
    <pagination :total="100" v-model:current-page="pageNumber"></pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import banner from '../../components/banner/banner.vue';
import comment from '../../components/comment/index.vue'
import pagination from '../../components/pagination.vue';
import bannerBg from '../../assets/comment.jpg'
const pageNumber = ref<number>(1)
</script>
<style lang="scss" scoped>
.massageboard {
  min-height: calc(100vh - 58px - 138px);
  position: relative;
}
@media screen and (max-width: 990px) {
  .massageboard {
    min-height: calc(100vh - 58px - 60px);
  }
}
.message-content {
  margin-top: 20px;
  padding-bottom: 50px;
}
</style>