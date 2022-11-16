<template>
  <div class="resume-page">
    <div class="resume-container">
      <div class="resume-left">
        <div class="head">
          <img class="avatar" src="../../assets/resume-avatar.jpg" alt="">
          <div class="name">zzz的简历</div>
        </div>
        <div class="base-info">
          <div class="info-title">基本信息</div>
          <div class="base-item">
            <span class="tit">名字：</span>
            <span>zwd</span>
          </div>
          <div class="base-item">
            <span class="tit">性别：</span>
            <span>男</span>
          </div>
          <div class="base-item">
            <span class="tit">毕业院校：</span>
            <span>xxx</span>
          </div>
          <div class="base-item">
            <span class="tit">专业：</span>
            <span>xxx</span>
          </div>
          <div class="base-item">
            <span class="tit">毕业时间：</span>
            <span>2017年6月</span>
          </div>
          <div class="base-item">
            <span class="tit">博客：</span>
            <a href="#" class="link">xxx</a>
          </div>
          <div class="base-item">
            <span class="tit">GitHub：</span>
            <a href="www.github.com/dez0514" class="link">www.github.com/dez0514</a>
          </div>
        </div>
        <div class="base-info">
          <div class="info-title grayyellow">联系方式</div>
          <div class="base-item">
            <span class="tit">电话：</span>
            <span>xxx</span>
          </div>
          <div class="base-item">
            <span class="tit">邮箱：</span>
            <span>xxx</span>
          </div>
          <div class="base-item">
            <span class="tit">微信：</span>
            <span>xxx</span>
          </div>
          <div class="base-item">
            <span class="tit">QQ：</span>
            <span>xxx</span>
          </div>
        </div>
        <div class="base-info">
          <div class="info-title yellow">应聘岗位</div>
          <div class="job-name">前端研发工程师</div>
        </div>
        <div class="extra-word">
          我是一个对前端由衷热爱、有趣的前端工程师。 我目前正在寻找前端工程师岗位的工作机会，希望在前端开发领域，让我所掌握的技能落实到实处，献上一点绵薄之力！
        </div>
      </div>
      <div class="resume-right">
        <div class="right-title">项目与工作经验</div>
        <div class="company-list">
          <div class="componay-item">
            <div class="company-name">北京世纪好未来科技教育有限公司（时间-时间）</div>
            <div class="project-list">
              <div class="project-item">
                <div class="name">前端埋点管理平台</div>
                <div class="intro">前端项目埋点录入编辑、sdk上报、数据看板于一体的管理平台，规范埋点和自动生成通用数据看板，并可快速生成自定义看板。包含登录/添加协同用户模块，上传oss/版本管理模块，通用echarts图表和自定义图表模块等.</div>
                <div class="technology">技术栈：vue/koa2/mongodb</div>
                <div class="desc-list">
                  <div class="desc-item">1、担任产品、设计、交互、前端、后端多个角色，独自完成平台的设计和搭建；</div>
                  <div class="desc-item">2、开发兼容web/node、微信支付宝百度头条等小程序的日志上报sdk；</div>
                  <div class="desc-item">3、通过koa2框架搭建node服务，并实现oauth第三方授权登录，mongodb存储数据等功能</div>
                </div>
                <div class="pic-list">
                  <img src="https://aimee.mangoya.cn/img/foodweb.png" alt="" @click="handleSetIsReview('https://aimee.mangoya.cn/img/foodweb.png', true)" />
                  <img src="https://aimee.mangoya.cn/img/foodweb.png" alt="" @click="handleSetIsReview('https://aimee.mangoya.cn/img/foodweb.png', true)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tip">
      <span class="link" @click="handleClickDownload">word下载</span>
      <span>最后更新时间：xxx</span>
    </div>
    <div v-show="isReview && reviewSrc" class="review-img" @click="handleSetIsReview('', false)">
      <img :src="reviewSrc" alt="">
    </div>
  </div>
</template>
<script lang="ts" setup>
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'
import { ref } from 'vue'
const isReview = ref<boolean>(false)
const reviewSrc = ref<string>('')
const resumeData = {
  username: 'The Shy',
  cellphone: 18888888888,
  email: '123@qq.com',
  gender: 'male',
  birthday: '2000.10.28',
  location: 'shanghai',
  school: 'xxx',
  jobs: 'web',
  skills: 'vue react node',
  workExperience: [
    {
      dateRange: '2020.06-至今',
      company: '好未来科技',
      jobs: 'web'
    },
    {
      dateRange: '2018.06-2020.06',
      company: '好未来科技2',
      jobs: 'java'
    }
  ],
  projects: [
    {
      name: '可视化编辑平台',
      content: '为解决功能相似或简易静态页面的重复工作量，面向运营和开发人员，通过拖拽搭建h5页面，结合创建、编辑、上线于一体的低代码平台。支持复杂的自定义组件生态，模板定制等功能，并集成用户权限管理、项目数据看板、组件管理等功能。',
      technology: 'react/koa2/mongodb',
      desc: '核心开发'
    },
    {
      name: '前端埋点管理平台',
      content: '为解决功能相似或简易静态页面的重复工作量，面向运营和开发人员，通过拖拽搭建h5页面，结合创建、编辑、上线于一体的低代码平台。支持复杂的自定义组件生态，模板定制等功能，并集成用户权限管理、项目数据看板、组件管理等功能。',
      technology: 'react/koa2/mongodb',
      desc: '核心开发'
    }
  ]
}
const handleSetIsReview = (url: string, showflag: boolean) => {
  reviewSrc.value = url
  isReview.value = showflag
}
const wordExport = (docData: any) => {
  PizZipUtils.getBinaryContent('/resume.docx', (error: any, content: any) => {
    if (error) throw error
    // 有图片的话，需加上下面这段代码
    let opts: any = {}
    opts.centered = false
    opts.fileType = 'docx'
    opts.getImage = (tagValue: any) => {
      return new Promise((resolve, reject) => {
        PizZipUtils.getBinaryContent(tagValue, (error: any, content: any) => {
          if (error) {
            return reject(error)
          }
          return resolve(content)
        })
      })
    }
    opts.getSize = function () {
      return [255, 195]//这里是生成的word文件里图片的宽和高
    }
    let imageModule = new ImageModule(opts)
    console.log(content)
    let zip = new PizZip(content)
    let doc = new docxtemplater().loadZip(zip).attachModule(imageModule).compile()
    doc.resolveData(docData).then(() => {
      console.log('ready')
      doc.render()
      var out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      saveAs(out, 'resume.docx')
    })
  })
}
const handleClickDownload = () => {
  wordExport(resumeData)
}
</script>
<style lang="scss" scoped>
.resume-container {
  overflow: hidden;
  margin: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 14%), 0 3px 1px -2px rgba(0, 0, 0, 20%), 0 1px 5px 0 rgba(0, 0, 0, 12%);
  .resume-left {
    box-sizing: border-box;
    padding: 15px;
    width: 350px;
    flex-shrink: 0;
    background: #394A5A;
    .head {
      width: 100%;
      text-align: center;
      margin: 25px 0;
      .avatar {
        overflow: hidden;
        display: block;
        margin: 0 auto;
        width: 128px;
        height: 128px;
        padding: 4px;
        border-radius: 50%;
        background: #fff;
      }
      .name {
        margin-top: 10px;
        color: #fff;
        font-size: 28px;
        font-weight: 400;
      }
    }
    .base-info {
      padding-bottom: 30px;
      .info-title {
        position: relative;
        height: 50px;
        line-height: 50px;
        width: 100%;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 14%), 0 3px 1px -2px rgba(0, 0, 0, 20%), 0 1px 5px 0 rgba(0, 0, 0, 12%);
        border-color: #6B3645;
        background-color: #B05051;
        margin: 5px 0 15px 30px;
        font-size: 22px;
        border-radius: 0 4px 0 0;
        display: inline-block;
        padding-left: 20px;
        box-sizing: border-box;
        color: #fff;
        &.grayyellow {
          border-color: #5A6238;
          background-color: #BDC293;
        }
        &.yellow {
          border-color: #887334;
          background-color: #DAB652;
        }
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: -19px;
          top: 0;
          width: 20px;
          height: 50px;
          background-color: #B05051;
          clip-path: polygon(80% 0%, 100% 0%, 100% 100%, 80% 100%, 0% 50%);
          -webkit-clip-path: polygon(80% 0%, 100% 0%, 100% 100%, 80% 100%, 0% 50%);
        }
        &.grayyellow::before {
          background-color: #BDC293;
        }
        &.yellow::before {
          background-color: #DAB652;
        }
        &::after {
          position: absolute;
          content: "";
          top: 100%;
          right: 0;
          border-top: 0 solid transparent;
          border-left-width: 15px;
          border-left-color: inherit;
          border-left-style: solid;
          border-bottom: 15px solid transparent;
          border-right: 0 solid transparent;
          width: 0;
          height: 0;
        }
      }
      .base-item {
        padding-left: 50px;
        color: #ddd;
        margin: 5px 0;
        font-size: 14px;
        .tit {
          font-size: 16px;
          color: #ABADB0;
          font-weight: bold;
        }
        .link {
          color: #df2050;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .job-name {
        padding-left: 50px;
        color: #eee;
        font-size: 16px;
      }
    }
    .extra-word {
      padding: 0 20px 20px;
      color: #eee;
      line-height: 1.5;
      text-indent: 2em;
      font-size: 14px;
    }
  }
  .resume-right {
    flex: 1;
    padding: 10px 40px 40px 50px;
    background: #fff;
    .right-title {
      font-size: 24px;
      color: #394A5A;
      line-height: 30px;
      border-bottom: 1px solid #394A5A;
      margin: 30px 0 15px 0;
    }
    .company-list {
      .company-name {
        font-size: 19px;
        color: #01579B;
        margin: 0 0 15px 5px;
        font-weight: bold;
      }
      .project-list {
        position: relative;
        margin-left: 15px;
        &::before {
          content: '';
          position: absolute;
          top: 8px;
          left: -2px;
          width: 2px;
          height: calc(100% - 8px);
          background-color: #394A5A;
        }
        .project-item {
          margin: 0px 0 20px 20px;
          .name {
            position: relative;
            line-height: 30px;
            font-size: 18px;
            bottom: 3px;
            font-weight: bold;
            color: #333;
          }
          .name::before {
            content: '';
            height: 14px;
            width: 14px;
            border-radius: 50%;
            background: #394A5A;
            float: left;
            position: absolute;
            left: -28px;
            top: 8px;
          }
          .intro, .technology, .desc-list .desc-item {
            font-size: 15px;
            color: #616161;
            line-height: 23px;
            margin-bottom: 5px;
          }
          .pic-list {
            img {
              margin-right: 2px;
              margin-bottom: 5px;
              max-width: 100%;
              max-height: 200px;
              object-fit: cover;
              vertical-align: middle;
              cursor: zoom-in;
            }
          }
        }
      }
    }
  }
}
.tip {
  text-align: center;
  font-size: 14px;
  color: #333;
  margin: 20px 0;
  .link {
    color: #df2050;
    text-decoration: none;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.review-img {
  z-index: var(--zIndex_6);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  text-align: center;
  cursor: zoom-out;
  img {
    max-width: 70%;
    max-height: 100vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
@media screen and (max-width: 819px) {
  .resume-container {
    flex-direction: column;
    padding: 0 20px;
    box-shadow: none;
    .resume-left {
      width: 100%;
    }
    .resume-right {
      padding-left: 40px;
    }
  }
}
</style>