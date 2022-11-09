<template>
  <div>
    <button @click="handleClickDownload">download</button>
  </div>
</template>
<script lang="ts" setup>
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'
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