<template>
  <div id="detail" class="detail">
    <banner :banner="detailInfo?.banner" :title="detailInfo?.title" :tagList="detailInfo?.tagList" :shadow="true" :isBlur="true" :showRightImg="true" />
    <div class="content">
      <div :class="['menu-box', isShowMenu ? '':'hide']" v-show="isPc && detailMenuList.length > 0">
        <left-menu-wrap>
          <template #default>
            <div class="toc-wrap">
              <div class="menu-list">
                <div v-for="(item,index) in detailMenuList" :key="index">
                  <div :class="['menu-item', item.nodeName, activeMenuIndex === index ? 'active':'']" @click="handleClickMenu(index, item)">
                    <span :id="`heading${item.hrefIndex}`">{{ item.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </left-menu-wrap>
      </div>
      <div id="art_wrap" :class="['art-wrap', (isPc && isShowMenu && detailMenuList.length > 0) ? '':'hideside']">
        <div :class="['article-content', isPc ? '_pc' : '']">
          <github-corner position="left" fill="#20a0ff" color="#fff" :blank="true" repo="https://github.com/dez0514" />
          <div class="meta">
            <div>6月30日.2022年</div>
            <div class="meta-icon"><svg-icon icon-class="time" /></div>
            <div class="meta-txt">JavaScript·vue</div>
            <div class="meta-icon"><svg-icon icon-class="tag" /></div>
            <div class="meta-txt">100</div>
            <div class="meta-icon"><svg-icon icon-class="blog" /></div>
          </div>
          <div :class="['control-wrap', isPc ? 'show_after' : '']">
            <div class="control-content">
              <div class="control-btn">
                <div class="control-icon"><svg-icon icon-class="like" /></div>
                <div class="control-txt">6</div>
              </div>
              <div class="control-btn">
                <div class="control-icon"><svg-icon icon-class="message" /></div>
                <div class="control-txt">2</div>
              </div>
              <div class="control-btn" v-if="isPc && detailMenuList.length > 0">
                <div class="control-icon" @click="handleChangeShowMenu"><svg-icon :icon-class="isShowMenu ? 'full_screen':'full_screen_cancel'" /></div>
              </div>
            </div>
          </div>
          <div class="article-content-wrap md-container">
            <div ref="detailbox" v-html="detailInfo && detailInfo.content"></div>
          </div>
        </div>
        <div class="article-comment-wrap">
          <comment />
        </div>
      </div>
    </div>
    <pagination :total="100" v-model:current-page="pageNumber"></pagination>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick, onUnmounted } from 'vue'
import LeftMenuWrap from '../../components/leftMenuWrap.vue'
import banner from '../../components/banner/banner.vue'
import comment from '../../components/comment/index.vue'
import pagination from '../../components/pagination.vue';
import { configStore } from '../../store'
import { storeToRefs } from 'pinia'
import { GithubCorner } from '@vfup/github-corner'
import '@vfup/github-corner/dist/style.css'
import { getArticleDetail } from '../../api/articles'
import { useRoute } from 'vue-router'
import { formartMd, getMdTitleList, MdTitle } from '../../utils/marked'
import { setScrollTop, getOffsetTop } from '../../utils/dom'
import debounce from 'lodash/debounce'
const configStores = configStore()
const { isPc } = storeToRefs(configStores);
const isShowMenu = ref<boolean>(true)
const pageNumber = ref<number>(1)
const route = useRoute()
const detailInfo = ref<any>(null)
const detailMenuList = ref<MdTitle[]>([])
const activeMenuIndex = ref<number>(0)
const detailbox = ref(null as HTMLDivElement | null)
// const curScrollTop = ref<number>(0)
const handleChangeShowMenu = () => {
  isShowMenu.value = !isShowMenu.value
}
const handleClickMenu = (index: number, item: MdTitle) => {
  if (activeMenuIndex.value === index) return
  activeMenuIndex.value = index
  // 不用锚点, 锚点会刷新页面
  // 最终滚动位置 = 标题距离art_wrap的距离 + art_wrap距离页面顶部的距离 - routerView的paddingTop
  // 其实pc就等于 banner高度320 + 间距20
  const pageOffset = getOffsetTop(document.getElementById('detail'))
  const parentOffset = getOffsetTop(document.getElementById('art_wrap'))
  const top = item.scrollTop + parentOffset - pageOffset
  setScrollTop(top, { animate: true, duration: 1000 })
  console.log(item)
  console.log(`heading${item.hrefIndex}`)
}
const getArticleById = (id: string | number) => {
  getArticleDetail({ id }, { isLoading: false }).then((res: any) => {
    console.log('detail===', res)
    if (res.code === 0) {
      if(Object.keys(res.data).length === 0) {
        return
      }
      const content = formartMd(res.data.content)
      detailInfo.value = { ...res.data, content }
      nextTick(() => {
        if (detailbox.value) {
          detailMenuList.value = getMdTitleList(detailbox.value)
          console.log('detailMenuList===', detailMenuList.value)
          const mdDomId = window.location.hash // 锚点就是hash值
          if (mdDomId) {
            const headerId = mdDomId.slice(1) // 去掉 #
            const hDom = document.getElementById(headerId)
            if (hDom) { // 如果找到锚点对应的元素 就把他滚到最顶部
              hDom.scrollIntoView(true)
              const index = detailMenuList.value.findIndex((item: any) => item.id === headerId)
              if (index > -1) {
                activeMenuIndex.value = index
              }
            }
          }
        }
      })
    } else {
    }
  }).catch(() => {
  })
}
const handleScrollPage = () => {
  const distance = document.documentElement.scrollTop // 滚动条卷起高度
  console.log(distance)
  const pageOffset = getOffsetTop(document.getElementById('detail'))
  const parentOffset = getOffsetTop(document.getElementById('art_wrap'))
  // 和点击时一样pc时：parentOffset - pageOffset = 340
  // 滚动distance 小于 340 时，一直停在第一个标题， 之后就取距离哪个标题近，哪个标题高亮
  // 记录剩下的距离
  const top = distance <= parentOffset - pageOffset ? 0 : distance - (parentOffset - pageOffset)
  //注意：item.scrollTop 是该标题元素 距离 art_wrap 顶部的距离
  const temp = detailMenuList.value.map((item:any) => Math.abs(item.scrollTop - top))
  const min = Math.min(...temp)
  const index = temp.findIndex((item:number) => item === min)
  activeMenuIndex.value = index
}
const debounceScroll = debounce(handleScrollPage, 100)
onMounted(() => {
  if (route.params.id) {
    if(typeof route.params.id === 'string' || typeof route.params.id === 'number') {
      getArticleById(route.params.id)
    }
  }
  window.addEventListener('scroll', debounceScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', debounceScroll)
})
</script>
<style lang="scss" scoped>
.detail {
  position: relative;
  /* overflow: hidden; */
  padding-bottom: 50px;
}
.content {
  position: relative;
  box-sizing: border-box;
  display: flex;
  .menu-box {
    overflow: hidden;
    flex-shrink: 0;
    transition: all 0.5s;
    width: 250px;
    opacity: 1;
    &.hide {
      width: 0;
      opacity: 0;
      transform: translateY(20px);
    }
  }
  .art-wrap {
    box-sizing:border-box;
    padding-left: 20px;
    margin-top: 20px;
    flex: 1;
    width: 0;
    transition: all .5s;
    min-height: calc(100vh - 78px - 138px - 320px - 50px - 20px);
    &.hideside {
      padding-left: 0;
    }
  }
  .art-wrap .article-content {
    position: relative;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    flex: 1;
    /* border-radius: 8px; */
    box-shadow: 0 13px 15px var(--gray_opacity_1);
    background-color: var(--white);
    &._pc {
      border-radius: 8px;
      padding: 30px 40px;
    }
    &._pc :deep(.github-corner) {
      overflow: hidden;
      border-top-right-radius: 8px;
    }
  }
}
.meta {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 12px;
  .meta-icon {
    margin-left: 5px;
  }
  .meta-txt {
    margin-left: 5px;
  }
}
.art-wrap .article-content._pc {
  .meta {
    position: absolute;
    top: 30px;
    right: 40px;
  }
}
.control-wrap {
  position: absolute;
  right: 0;
  top: 32px;
  color: var(--white);
  filter: drop-shadow(-5px 6px 5px rgba(255,73,73,.3));
  &.show_after {
    right: -10px;
    top: 50px;
  }
  .control-content {
    position: relative;
    padding-right: 0;
    background: linear-gradient(90deg, var(--color_5), #ff7849);
    border-bottom-right-radius: 0;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 16px;
    .control-btn {
      padding: 0 10px;
      display: flex;
      align-items: center;
      color: hsla(0,0%,100%,.5);
    }
    .control-txt {
      margin-left: 4px;
      font-size: 12px;
    }
  }
  &.show_after .control-content {
    padding-right: 10px;
    background: linear-gradient(90deg,var(--color_5),#ff7849 calc(100% - 6px),#ffb350);
    border-bottom-right-radius: 5px;
  }
  &::before {
    content: "";
    position: absolute;
    left: -16px;
    top: 0;
    border-color: transparent var(--color_5) var(--color_5) transparent;
    border-style: solid;
    border-width: 20px 8px;
    vertical-align: bottom;
  }
  &.show_after::after {
    position: absolute;
    right: 0;
    top: -10px;
    content: "";
    display: block;
    border-color: transparent transparent #ca1f1e #ca1f1e;
    border-style: solid;
    border-width: 5px;
    transform-origin: bottom;
    transform: scaleY(.75);
  }
}
.article-content-wrap {
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  padding-top: 72px;
}
.article-comment-wrap {
  margin-top: 20px;
}
// 目录
.toc-wrap {
  padding-top: 20px;
}
.menu-list {
  position: relative;
  padding: 8px 8px 20px 8px;
  .menu-item {
    position: relative;
    display: inline-block;
    font-weight: 700;
    background: linear-gradient(90deg, var(--white), var(--gray_9) 6px, var(--gray_7));
    filter: drop-shadow(0 1px 0 var(--gray_opacity_2)) drop-shadow(0 -1px 0 var(--white)) drop-shadow(5px 6px 5px var(--gray_opacity_1));
    font-size: 14px;
    line-height: 34px;
    height: 34px;
    padding: 0 12px 0 20px;
    margin: 20px 0 5px -5px;
    border-bottom-left-radius: 5px;
    vertical-align: bottom;
    text-shadow: 0 1px var(--white);
    transition: 0.25s;
    cursor: pointer;
    span {
      max-width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      color: var(--gray_4);
      text-decoration: none;
      &:hover {
        color: var(--primary);
      }
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: -16px;
      display: inline-block;
      border: 17px solid #d8e0ea;
      border-left-width: 8px;
      border-right: 8px solid transparent;
      border-bottom: 17px solid transparent;
      vertical-align: bottom;
    }
    &::before {
      content: "";
      border: 3px solid rgba(31, 45, 61, 0.2);
      position: absolute;
      left: 0;
      top: -7px;
      border-left: 3px solid transparent;
      border-top: 3px solid transparent;
      transform-origin: bottom;
      transform: scaleY(0.8);
    }
    &.active {
      background: linear-gradient(90deg,var(--analogous_light_2),var(--analogous) 6px,var(--primary_dark_1));
      text-shadow: 0 -1px var(--primary_dark_2);
      filter: drop-shadow(0 1px 0 var(--primary_dark_1)) drop-shadow(6px 7px 8px var(--primary_opacity_4));
      box-shadow: none;
      span {
        color: var(--white);
      }
      &::after {
        border-top: 17px solid var(--primary_dark_1);
        border-left: 8px solid var(--primary_dark_1);
      }
      &::before {
        border-bottom: 3px solid var(--analogous_dark_1);
        border-right: 3px solid var(--analogous_dark_1);
      }
    }
  }
  .menu-item.h3 {
    background: none;
    margin-top: 5px;
    padding-left: 25px;
    filter: none;
    span {
      text-shadow: none;
    }
    &::after {
      display: none;
    }
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: 1px solid var(--gray_6);
      background: var(--white);
      left: 5px;
      display: block;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      -webkit-transition: .3s;
      transition: .3s;
    }
    &.active {
      span {
        color: var(--primary);
        text-shadow: none; 
      }
      &::before {
        content: "";
        width: 17px;
        height: 10px;
        border-radius: 4px 100% 100% 4px/4px 80% 80% 4px;
        border-color: var(--primary);
        background: var(--primary_light_1);
        box-shadow: 0 1px var(--analogous_light_2) inset,0 2px 3px var(--primary_opacity_3);
        left: 1px;
        top: 50%;
        transform: translateY(-50%);
        transition: .3s linear .3s;
        box-sizing: border-box;
      }
    }
  }
}
.menu-list::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 8px;
  bottom: 0;
  width: 6px;
  background: linear-gradient(90deg, #fff 1px, #d8e0ea);
  border: 1px solid #cad1db;
  box-shadow: 0.5px 3px 5px rgba(31, 45, 61, 0.1);
  border-radius: 4px;
}
</style>
