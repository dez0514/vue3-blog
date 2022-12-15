<template>
  <div class="emoji-container">
    <div class="emoji-tabs">
      <div v-for="(item, index) in tabList" :key="index"
        :class="['emoji-tab-item', item.type === activeTab ? 'act' : '']" @click="handleEmojiTab(item.type)">
        {{ item.name }}
      </div>
    </div>
    <div class="emoji-content" ref="emojiContent">
      <ul class="emoji-list" v-for="(item, index) in Object.keys(emojiMap)" :key="index">
        <li class="emoji-item" v-show="item === activeTab" v-for="(inner, idx) in emojiMap[item as ITabType]" :key="`${index}_${idx}`" :title="inner.cn"
          @click.prevent="handleClickEmoji(inner)">
          <img class="emoji-pic" :src="inner.url" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { qqList, douyinList, biliList, EmojiItem } from './emoji'
import { setScrollTop } from '../../utils/dom'
type ITabType = 'qq' | 'douyin' | 'bilibili'  // | 'weibo' | 'tieba'
interface ITabListItem {
  name: string;
  type: ITabType;
}
const emit = defineEmits<{
  (e: 'emojiClick', item: EmojiItem): void,
}>()
const tabList: ITabListItem[] = [
  { name: 'QQ', type: 'qq' },
  { name: '抖音', type: 'douyin' },
  { name: 'bilibili', type: 'bilibili' },
  // { name: '微博', type: 'weibo' },
  // { name: '贴吧', type: 'tieba' }
]
const emojiMap = {
  qq: [...qqList],
  douyin: [...douyinList],
  bilibili: [...biliList],
  // weibo: [],
  // tieba: []
}
const activeTab = ref<ITabType>('qq')
const emojiContent = ref<HTMLDivElement | null>(null)
const handleEmojiTab = (type: ITabType) => {
  activeTab.value = type
  setScrollTop(0, { container: emojiContent.value, animate: true, duration: 1000 })
}
const handleClickEmoji = (item: EmojiItem) => {
  emit('emojiClick', item)
}
</script>
<style lang="scss" scoped>
.emoji-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  user-select: none;
  .emoji-tabs {
    display: flex;
    align-items: center;
    height: 42px;
    border-bottom: 1px solid #e6eaf0;
    padding: 0 5px 10px 5px;
    margin-bottom: 10px;

    .emoji-tab-item {
      margin-right: 10px;
      min-width: 60px;
      padding: 5px;
      text-align: center;
      cursor: pointer;
      border-radius: 20px;
      &.act {
        color: #20a0ff;
        background-color: var(--primary_opacity_1);
      }
    }
  }

  .emoji-content {
    overflow: hidden;
    overflow-y: auto;
    max-height: 200px;
    .emoji-list {
      .emoji-item {
        box-sizing: border-box;
        position: relative;
        background: #f7f7f7;
        padding: 5px 10px;
        border-radius: 5px;
        display: inline-block;
        font-size: 12px;
        line-height: 14px;
        margin: 0 5px 10px 5px;
        cursor: pointer;
        transition: 0.3s;
        -webkit-tap-highlight-color: transparent;
        img {
          max-width: 100%;
          height: 32px;
        }
      }
    }
  }
}

@media(any-hover: hover) {
  .emoji-container .emoji-tabs .emoji-tab-item:hover {
    color: #20a0ff;
    background-color: var(--primary_opacity_1);
  }
  .emoji-container .emoji-content .emoji-list .emoji-item:hover {
    transform: scale(1.3);
    background: unset;
  }
}
</style>