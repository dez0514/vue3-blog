<template>
  <div class="about">
    <banner />
    <div class="about-wrap">
      <div class="about-box">
        <div class="meta">
          <div class="title">关于我</div>
        </div>
        <div class="about-content">
          <div class="tips">独揽月下萤火，照亮一纸寂寞</div>
          <ul class="list">
            <li><span>姓名</span>：<span>zwd</span></li>
            <li><span>民族</span>：<span>汉族</span></li>
            <li><span>地区</span>：<span>上海</span></li>
            <li><span>籍贯</span>：<span>湖北 黄冈</span></li>
            <li><span>qq</span>：<span>2573433803</span></li>
            <li><span>email</span>：<span>2573433803@qq.com</span></li>
            <li><span>职业</span>：<span>小切图仔</span></li>
            <li><span>爱好</span>：<span>篮球、LOL、追剧</span></li>
            <li><span>歌手</span>：<span>陈信宏、周杰伦、许嵩</span></li>
            <li><span>电影</span>：<span>都看亿点</span></li>
          </ul>
        </div>
        <div class="meta margin-top">
          <div class="title">站点</div>
        </div>
        <div class="about-content">
          <div class="list-link">
            <div class="links">
              <div class="link-title">GitHub</div>
              <div class="link-desc">https://github.com/dez0514</div>
            </div>
          </div>
        </div>
        <div class="meta margin-top">
          <div class="title">博客说明</div>
        </div>
        <div class="about-content">
          <div class="tips">颜色，效果均模仿 <a href='https://dzblog.cn/' target="_blank">Wintermelon's blog</a> 保留版权。代码自己实现，练手玩玩无商用。学习vue3。</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import banner from '../../components/banner/banner.vue'
</script>
<style lang="scss" scoped>
.about {
  padding-bottom: 50px;
}
.about-wrap {
  position: relative;
  padding: 50px 0 50px;
  margin: 20px auto 0;
  width: 100%;
  border-radius: 13px;
  box-shadow: 0 13px 15px var(--gray_opacity_1);
  background-color: var(--white);
}
.meta {
  position: relative;
  padding: 0 40px;
  .title {
    font-size: 16px;
    font-weight: 400;
    color: var(--primary);
    position: relative;
    display: inline-block;
  }
  .title:before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    bottom: -14px;
    left: -5px;
    background: linear-gradient(90deg, var(--analogous), var(--primary));
    box-shadow: 0 0 6px var(--primary);
    z-index: 1;
  }
  .title:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: "";
    right: -20px;
    min-width: 100px;
    height: 3px;
    position: absolute;
    bottom: -13px;
    left: 0;
    z-index: 2;
    background: linear-gradient(
        90deg,
        var(--primary),
        var(--title_gradient_2) 80%,
        var(--title_gradient_0)
      )
      no-repeat 0 1px/100% 1px;
  }
}
.about-content {
  padding-top: 30px;
  padding-left: 40px;
  padding-right: 40px;
}
.list {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
.list-link .links{
  padding: 12px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--gray_10);
  .link-title {
    flex: 1
  }
  .link-desc {
    flex: 1.6;
    word-break: break-all;
  }
}
.list li:nth-child(4n + 1),
.list li:nth-child(4n + 2) {
  background-color: var(--gray_10);
}

.list li {
  padding: 12px 10px;
}
.list li {
  border-bottom: 1px solid var(--gray_8);
}
.tips {
  font-size: 14px;
  line-height: 1.5;
}
.tips::first-letter {
  font-size: 16px;
  font-weight: 600;
  margin-right: 2px;
}
.margin-top {
  margin-top: 30px;
}
@media screen and (max-width: 990px) {
  .about-wrap {
    border-radius: 0;
    padding: 15px 0 15px;
    margin: 10px auto 0;
  }
  .meta {
    padding: 0 12px;
  }
  .about-content {
    padding-top: 20px;
    padding-left: 12px;
    padding-right: 12px;
  }
  .list {
    margin-top: 14px;
    display: grid;
    grid-template-columns: repeat(1, 100%);
  }
  .list li:nth-child(2n + 1) {
    background-color: var(--gray_10);
  }
  .list li:nth-child(2n) {
    background-color: var(--white);
  }
}
@media screen and (max-width: 450px) {
  .list li {
    font-size: 14px;
  }
}
</style>
