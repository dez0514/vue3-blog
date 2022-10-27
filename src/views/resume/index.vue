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

const data = {
  "first_name":"Jane",
  "hasKitty": true,
  "kitty": "Minie",
  "hasDog": false,
  "dog": null
}
const wordExport = (docData: any) => {
  PizZipUtils.getBinaryContent('resume.docx', (error: any, content: any) => {
    if (error) {
      throw error
    }
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
    var zip = new PizZip(content)
    console.log(zip)
    let doc = new docxtemplater().loadZip(zip)
    // .attachModule(imageModule).compile()
    // 有图片的话,需加载图片处理模块
    doc.resolveData(docData).then(() => {
      console.log('ready')
      doc.render()
      var out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      saveAs(out, '测试文件' + '.docx')
    })
  })
}
const handleClickDownload = () => {
  wordExport(data)
}
</script>