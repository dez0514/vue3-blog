<template>
  <div class="about">
    <banner :banner="bannerBg" title="关于我" />
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
            <li><span>职业</span>：<span>切图仔</span></li>
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
        <div class="meta margin-top" v-show="repoList.length > 0">
          <div class="title">瞎搞</div>
        </div>
        <div class="about-content">
          <div class="repo-list">
            <div class="repo" v-for="(item, index) in repoList" :key="index" @click="handleClickRepo(item.html_url)">
              <div class="name">{{ item.name }}</div>
              <div class="time">{{ item.created_at }}</div>
              <div class="repo-icon-wrap">
                <div class="repo-icon-item">
                  <svg-icon class="icon" icon-class="star"></svg-icon>
                  {{ item.stargazers_count || 0 }}
                </div>
                <div class="repo-icon-item">
                  <svg-icon class="icon" icon-class="branch"></svg-icon>
                  {{ item.forks_count || 0 }}
                </div>
                <div class="repo-icon-item">
                  <svg-icon class="icon" icon-class="eyes"></svg-icon>
                  {{ item.subscribers_count || 0 }}
                </div>
              </div>
            </div>
          </div>
          <loading :is-show="isShowLoad" :status="loadState" />
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
import bannerBg from '../../assets/images/me.jpg'
import { getRepos } from '../../api/user'
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import loading from '../../components/loading/loading.vue'
const isShowLoad = ref<boolean>(false)
const loadState = ref<0 | 1 | 2>(0)
const setLoadState = (showType: boolean, status: 0 | 1 | 2) => {
  isShowLoad.value = showType
  loadState.value = status
}
const repoList = ref<any[]>([])
const handleClickRepo = (url: string) => {
  window.open(url, '_github')
}
const getRepoList = () => {
  setLoadState(true, 0)
  getRepos().then((res: any) => {
    setLoadState(false, 0)
    if(res.code === 0) {
      repoList.value = res.data.map((item: any) => {
        return {
          ...item,
          created_at: item.created_at ? dayjs(item.created_at).format('MM月DD日 · YYYY年') : '',
          updated_at: item.updated_at ? dayjs(item.updated_at).format('MM月DD日 · YYYY年') : ''
        }
      })
    } else {
      setLoadState(true, 2)
    }
  }).catch(() => {
    setLoadState(true, 2)
  })
}
onMounted(() => {
  getRepoList()
})
</script>
<style lang="scss" scoped>
.about {
  padding-bottom: 50px;
}
@media screen and (max-width: 990px) {
  .about {
    padding-bottom: 20px;
  }
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
.repo-list {
  display: grid;
  grid-template-columns: repeat(4, calc((100% - 120px) / 4));
  gap: 40px;
  .repo {
    /* max-width: 300px; */
    padding: 14px;
    -webkit-box-shadow: 0 0 7px var(--gray_opacity_1);
    box-shadow: 0 0 7px var(--gray_opacity_1);
    -webkit-transition: .25s;
    transition: .25s;
    cursor: pointer;
    color: var(--gray_4);
    -webkit-tap-highlight-color: transparent;
    .name {
      font-size: 18px;
    }
    .time {
      margin: 3px 0;
      font-size: 12px;
    }
    .repo-icon-wrap {
      display: flex;
      align-items: center;
      font-size: 12px;
      .repo-icon-item {
        margin-right: 10px;
      }
    }
    &:hover {
      box-shadow: 0 0 20px var(--gray_opacity_1);
      transform: translateX(4px);
    }
  }
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
  .repo-list {
    display: grid;
    grid-template-columns: repeat(2, calc((100% - 20px) / 2));
    gap: 20px;
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
  .repo-list {
    display: grid;
    grid-template-columns: repeat(1, calc(100%));
    gap: 10px;
  }
}
</style>
