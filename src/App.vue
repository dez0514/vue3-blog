<template>
  <div>
    <vheader></vheader>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>

</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import vheader from './components/vheader.vue'
</script>

<style scoped>
.content {
  padding-top: 58px;
}
</style>
