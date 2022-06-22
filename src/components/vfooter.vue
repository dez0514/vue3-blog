<template>
  <div class="footer">
    <!-- <div class="visitor">博客已运行：00天00小时00分00秒</div> -->
    <div class="copy-right">保留版权作者 Wintermelon</div>
    <div class="bn-num"><span class="bspan">昨天太近、明天太远</span>鄂ICP备2020019488号-1</div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  box-sizing: border-box;
  height: 138px;
  background-color: var(--gray_8);
  padding-top: 40px;
  box-shadow: 0 1px var(--white_opacity_5) inset;
  border-top: 1px solid var(--gray_7);
}

.visitor {
  font-size: 14px;
  color: var(--gray_5);
  text-align: center;
  margin-bottom: 15px;
}

.copy-right,
.bn-num,
.devide {
  color: var(--gray_5);
  font-size: 12px;
  text-align: center;
}

.bn-num {
  margin-top: 10px;
}

.bspan {
  display: inline-block;
  margin-right: 10px;
}
</style>