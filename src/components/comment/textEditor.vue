<template>
  <div>
    <textarea class="comment-mde" ref="commentmde" v-model="content" @input="onTextChange" placeholder="写点痕迹..."
      rows="5"></textarea>
    <div class="btn-wraps">
      <div class="btn-box">
        <div ref="emoji" class="btn emojo" @click="handleShowEmoji">
          <svg-icon icon-class="emoji"></svg-icon>
          <div class="emoji-list-wrap" v-show="showEmoji">
            <ul class="emoji-list">
              <li class="emoji-item" v-for="(item, index) in faceList" :key="index"
                @click.prevent="handleClickEmoji(item)">
                <img :src="getImgUrl(item.url)" alt="">
              </li>
            </ul>
          </div>
        </div>
        <div class="btn preview" @click="handlePreview">
          <svg-icon icon-class="preview"></svg-icon>
        </div>
      </div>
      <div class="btn-box">
        <div class="btn tips">
          <svg-icon class="icon" icon-class="tip"></svg-icon>
          <div>可使用部分markdown语法</div>
        </div>
        <div class="btn cancel">取消回复</div>
        <div class="btn submit">
          <svg-icon class="icon" icon-class="publish"></svg-icon>
          <div>发布评论</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const emoji = ref(null)
const content = ref<string>('')
const showEmoji = ref<boolean>(false)
interface faceItem {
  title: string;
  url: string
}
const faceList: faceItem[] = [
  { title: '微笑', url: 'weixiao.gif' },
  { title: '嘻嘻', url: 'xixi.gif' },
  { title: '哈哈', url: 'haha.gif' },
  { title: '可爱', url: 'keai.gif' },
  { title: '可怜', url: 'kelian.gif' },
  { title: '挖鼻', url: 'wabi.gif' },
  { title: '吃惊', url: 'chijing.gif' },
  { title: '害羞', url: 'haixiu.gif' },
  { title: '挤眼', url: 'jiyan.gif' },
  { title: '闭嘴', url: 'bizui.gif' },
  { title: '鄙视', url: 'bishi.gif' },
  { title: '爱你', url: 'aini.gif' },
  { title: '泪', url: 'lei.gif' },
  { title: '偷笑', url: 'touxiao.gif' },
  { title: '亲亲', url: 'qinqin.gif' },
  { title: '生病', url: 'shengbing.gif' },
  { title: '太开心', url: 'taikaixin.gif' },
  { title: '白眼', url: 'baiyan.gif' },
  { title: '右哼哼', url: 'youhengheng.gif' },
  { title: '左哼哼', url: 'zuohengheng.gif' },
  { title: '嘘', url: 'xu.gif' },
  { title: '衰', url: 'shuai.gif' },
  { title: '吐', url: 'tu.gif' },
  { title: '哈欠', url: 'haqian.gif' },
  { title: '抱抱', url: 'baobao.gif' },
  { title: '怒', url: 'nu.gif' },
  { title: '疑问', url: 'yiwen.gif' },
  { title: '馋嘴', url: 'chanzui.gif' },
  { title: '拜拜', url: 'baibai.gif' },
  { title: '思考', url: 'sikao.gif' },
  { title: '汗', url: 'han.gif' },
  { title: '困', url: 'kun.gif' },
  { title: '睡', url: 'shui.gif' },
  { title: '钱', url: 'qian.gif' },
  { title: '失望', url: 'shiwang.gif' },
  { title: '酷', url: 'ku.gif' },
  { title: '色', url: 'se.gif' },
  { title: '哼', url: 'heng.gif' },
  { title: '鼓掌', url: 'guzhang.gif' },
  { title: '晕', url: 'yun.gif' },
  { title: '悲伤', url: 'beishang.gif' },
  { title: '抓狂', url: 'zhuakuang.gif' },
  { title: '黑线', url: 'heixian.gif' },
  { title: '阴险', url: 'yinxian.gif' },
  { title: '怒骂', url: 'numa.gif' },
  { title: '互粉', url: 'hufen.gif' },
  { title: '书呆子', url: 'shudaizi.gif' },
  { title: '愤怒', url: 'fennu.gif' },
  { title: '感冒', url: 'ganmao.gif' },
  { title: '心', url: 'xin.gif' },
  { title: '伤心', url: 'shangxin.gif' },
  { title: '猪', url: 'zhu.gif' },
  { title: '熊猫', url: 'xiongmao.gif' },
  { title: '兔子', url: 'tuzi.gif' },
  { title: 'OK', url: 'ok.gif' },
  { title: '耶', url: 'ye.gif' },
  { title: 'GOOD', url: 'good.gif' },
  { title: 'NO', url: 'no.gif' },
  { title: '赞', url: 'zan.gif' },
  { title: '来', url: 'lai.gif' },
  { title: '弱', url: 'ruo.gif' },
  { title: '草泥马', url: 'caonima.gif' },
  { title: '神马', url: 'shenma.gif' },
  { title: '囧', url: 'jiong.gif' },
  { title: '浮云', url: 'fuyun.gif' },
  { title: '给力', url: 'geili.gif' },
  { title: '围观', url: 'weiguan.gif' },
  { title: '威武', url: 'weiwu.gif' },
  { title: '话筒', url: 'huatong.gif' },
  { title: '蜡烛', url: 'lazhu.gif' },
  { title: '蛋糕', url: 'dangao.gif' },
  { title: '发红包', url: 'fahongbao.gif' }
]
const getImgUrl = (name: string) => {
  return new URL(`/src/assets/face/${name}`, import.meta.url).href
}
const onTextChange = () => { }
const handleShowEmoji = () => {
  showEmoji.value = !showEmoji.value
}
const handleClickEmoji = (item: faceItem) => {
  console.log('face==', item)
}
const handlePreview = () => { }
onClickOutside(emoji, () => {
  if (showEmoji.value) {
    showEmoji.value = false
  }
})
</script>
<style lang="scss" scoped>
.comment-editor {
  margin-bottom: 30px;
}

.comment-mde {
  box-sizing: border-box;
  width: 100%;
  display: block;
  color: #738192;
  background-color: #e6eaf0;
  resize: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 1.42858;
  border: 1px solid transparent;
  outline: none;
  -webkit-transition: all .5s cubic-bezier(.645, .045, .355, 1);
  transition: all .5s cubic-bezier(.645, .045, .355, 1);
}

.comment-mde:focus {
  box-shadow: 0 0 0 3px rgba(32, 160, 255, 0.2);
  ;
  border-color: #20a0ff;
  background-color: #fff;
}

.btn-wraps {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-box,
.btn {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.btn {
  padding: 0 5px;
}
.emojo {
  position: relative;
  margin-right: 10px;
  cursor: pointer;
}

.preview {
  font-size: 24px;
  cursor: pointer;
}

.tips {
  font-size: 12px;
  margin-right: 20px;
  .icon {
    margin-right: 2px;
  } 
}

.cancel {
  font-size: 14px;
  color: #8492a6;
  margin-right: 10px;
  transition: color .25s;
  cursor: pointer;
}

.cancel:hover {
  color: #20a0ff;
}

.submit {
  background: linear-gradient(90deg, #20a0ff, #3dc3ff);
  box-shadow: 0 3px 5px rgba(32, 160, 255, 0.3);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  transition: box-shadow .5s;
  cursor: pointer;

  .icon {
    font-size: 16px;
    margin-right: 5px;
  }
}

.emoji-list-wrap {
  box-sizing: border-box;
  z-index: 10;
  position: absolute;
  top: calc(100% + 12px);
  left: -5px;
  background: #fff;
  border: 1px solid #e6eaf0;
  padding: 10px;
  border-radius: 5px;
  user-select: none;

  .emoji-list {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    overflow-y: auto;
    width: 390px;
    max-height: 200px;

    .emoji-item {
      overflow: hidden;
      width: 26px;
      height: 26px;

      img {
        display: block;
        margin: 2px auto;
      }
    }
  }
}

.emoji-list-wrap::before {
  content: '';
  position: absolute;
  left: 10px;
  top: -10px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #e6eaf0;
  width: 0;
}
.emoji-list-wrap::after {
  content: '';
  position: absolute;
  left: 12px;
  top: -9px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 9px solid #fff;
  width: 0;
}
@media screen and (max-width: 990px) {
  .tips {
    display: none;
  }
  .emoji-list-wrap {
    width: calc(100vw - 20px);
    .emoji-list {
      width: 100%;
    }
  }
}
</style>