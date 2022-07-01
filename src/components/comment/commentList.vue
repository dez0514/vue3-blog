<template>
  <div class="comments-list-wrap">
    <div v-for="(item, index) in commentsList" :key="index">
      <div class="wrapper">
        <div class="side">
          <div class="avatar"></div>
        </div>
        <div class="main">
          <div class="name-wrap">
            <div class="nick">百度百度</div>
            <div class="time">2021.07.03</div>
            <div class="reply-btn">
              <svg-icon class="icon" icon-class="reply" />
            </div>
          </div>
          <div class="content">
            <div class="desc">
              大佬
              请问react今日头条中的views/Article/index.js中的articleInfo的数据怎么获取到的？是使用@connect吗,请问react今日头条中的views/Article/index.js中的articleInfo的数据怎么获取到的？是使用@connect吗
            </div>
          </div>
        </div>
      </div>
      <div class="edit-box">
        <text-editor />
      </div>
      <div class="children">
        <ul>
          <li>
            <div class="wrapper">
              <div class="side">
                <div class="avatar"></div>
              </div>
              <div class="main">
                <div class="name-wrap">
                  <div class="nick">百度百度</div>
                  <div class="time">2021.07.03</div>
                  <div class="reply-btn">
                    <svg-icon class="icon" icon-class="reply" />
                  </div>
                </div>
                <div class="content">
                  <div class="desc">
                    大佬
                    请问react今日头条中的views/Article/index.js中的articleInfo的数据怎么获取到的？是使用@connect吗,请问react今日头条中的views/Article/index.js中的articleInfo的数据怎么获取到的？是使用@connect吗
                  </div>
                </div>
              </div>
            </div>
            <div class="edit-box">
              <text-editor />
            </div>
          </li>
          <li>
            <div class="wrapper">
              <div class="side">
                <div class="avatar"></div>
              </div>
              <div class="main">
                <div class="name-wrap">
                  <div class="nick">百度百度</div>
                  <div class="time">2021.07.03</div>
                  <div class="reply-btn">
                    <svg-icon class="icon" icon-class="reply" />
                  </div>
                </div>
                <div class="content">
                  <div class="desc">
                    大佬
                    请问react今日头条中的views/Article/index.js中的articleInfo的数据怎么获取到的？是使用@connect吗,请问react今日头条中的views/Article/index.js中的articleInfo的数据怎么获取到的？是使用@connect吗
                  </div>
                </div>
              </div>
            </div>
            <div class="edit-box"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TextEditor from './textEditor.vue';
const commentsList = [{}, {}]
</script>
<style lang="scss" scoped>
.comments-list-wrap {
  overflow: hidden;
  width: 100%;
  margin-top: 20px;
}

.wrapper {
  display: flex;

  .side .avatar {
    width: 42px;
    height: 42px;
    border: 1px solid #e6eaf0;
    border-radius: 6px;
    background-color: pink;
  }

  .main {
    flex: 1;

    .name-wrap {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 6px;
      line-height: 21px;
      border-bottom: 1px solid #e6eaf0;
      transition: border-color 0.25s;

      .nick {
        font-weight: 600;
        font-size: 14px;
        color: #738192;
      }

      .time {
        font-size: 12px;
        transition: 0.25s;
      }

      .reply-btn {
        box-sizing: border-box;
        position: absolute;
        right: 0;
        bottom: 0;
        border: 1px solid #e6eaf0;
        background: #fff;
        color: #8492a6;
        box-shadow: 0 3px 5px rgba(32, 160, 255, 0.1);
        padding: 0 10px;
        border-radius: 10px;
        line-height: 17px;
        height: 20px;
        transition: 0.25s;
        transform: translate(38px, 50%);
        opacity: 0;
        pointer-events: none;

        .icon {
          fill: currentColor;
          font-size: 16px;
        }
      }
    }

    .content .desc {
      padding: 3px 6px 0;
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 4px;
    }
  }
}

.children {
  margin-left: 48px;
}

.wrapper:hover {

  .side .avatar,
  .main .name-wrap {
    border-color: #20a0ff;
  }

  .time {
    transform: translateX(-38px);
  }

  .main .reply-btn {
    color: #20a0ff;
    border-color: #20a0ff;
    box-shadow: 0 5px 8px rgba(32, 160, 255, 0.3);
    transform: translate(0, 50%);
    opacity: 1;
    pointer-events: auto;
  }
}

.pagination-wrap {
  text-align: center;
  margin-top: 20px;
}
</style>