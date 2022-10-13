import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import postcsspxtoviewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      // 别名配置
      '@': resolve('src/'),
      '@components': resolve('src/components'),
    },
  },
  server: {
    // host: '192.168.0.102',
    port: 3001,
    // open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3002', // 所要代理的目标地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api')
      }
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variable.scss";`// 引用公共样式，使用vite搭建项目只安装sass即可，不需要安装node-sass,sass-loader
      },
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'Px', // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          exclude: [],
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
    })
  ]
})
