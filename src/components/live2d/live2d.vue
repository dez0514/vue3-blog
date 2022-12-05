<template>
  <div>
    <canvas id="live2d" width="280" height="250"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import '../../assets/libs/live2d.min';
const loadLive2d = (modelId: number, texturesId: number) => {
  const url = `/api/client/live2d/${modelId}/textures/${texturesId}`
  window.loadlive2d('live2d', url, console.log('[Status]', 'live2d', `模型${modelId}-${texturesId}加载完成`))
}
onMounted(() => {
  loadLive2d(0, 0)
})
</script>

<style lang="less" scoped>
#live2d {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: var(--zIndex_2);
}
</style>

