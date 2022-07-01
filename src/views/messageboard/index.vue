<template>
  <div class="massageboard">
    <banner></banner>
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