<template>
  <div>
    <InputLabel required class="modal-login__input" value="" prefixIcon="email" placeholder="邮箱" type="email"
      :disabled="false" />
    <InputLabel class="modal-login__input" value="" prefixIcon="yonghu" placeholder="昵称" :disabled="false" />
    <InputLabel class="modal-login__input" value="" prefixIcon="link" placeholder="网址" type="url" :disabled="false" />
  </div>
</template>
<script lang="ts" setup>
import InputLabel from './inputLabel.vue'
</script>
