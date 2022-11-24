<template>
  <div class="comment-wrapper">
    <div class="flag-wrap">
      <div class="flag-con">
        <div class="flag-desc">
          <svg-icon icon-class="message" />
          <div class="count">0条留言</div>
        </div>
      </div>
    </div>
    <text-editor :source="commentState" />
    <comment-list />
  </div>
</template>
<script lang="ts" setup>
import TextEditor from './textEditor.vue';
import commentList from './commentList.vue';
import { commentItem } from '../../types'
import { reactive } from 'vue'
const commentState = reactive<commentItem>({
  topic_type: '', // 留言 || 文章评论
  topic_id:  '', // 文章id || ''
  from_uid:  '' // 永远都是当前登录的用户
})
</script>
<style lang="scss" scoped>
.comment-wrapper {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding: 100px 40px 40px;
  border-radius: 8px;
  box-shadow: 0 13px 15px var(--gray_opacity_1);
  background-color: var(--white);
}
.flag-wrap {
  filter: drop-shadow(5px 6px 5px rgba(32, 160, 255, 0.3));
  position: absolute;
  top: 30px;
  left: -10px;
}
@media screen and (max-width: 990px) {
  .comment-wrapper {
    box-sizing: border-box;
    padding: 70px 10px 10px;
    border-radius: 0;
  }
  .flag-wrap {
    top: 15px;
  }
}
.flag-wrap::before {
  content: "";
  position: absolute;
  left: 0;
  top: -10px;
  border-color: transparent #008bc9 #008bc9 transparent;
  border-style: solid;
  border-width: 5px;
  transform-origin: bottom;
  transform: scaleY(0.75);
}

.flag-wrap::after {
  content: "";
  position: absolute;
  right: -16px;
  top: 0;
  border-color: #0394ff transparent transparent #0394ff;
  border-style: solid;
  border-width: 20px 8px;
  vertical-align: bottom;
}

.flag-con {
  display: flex;
  justify-content: center;
  padding-left: 10px;
  background: linear-gradient(90deg, #76d5ff, #20baff 6px, #0394ff);
  border-bottom-left-radius: 5px;
  height: 40px;
  font-size: 16px;
}

.flag-desc {
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  .count {
    margin-left: 10px;
  }
}
</style>