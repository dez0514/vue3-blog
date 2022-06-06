### 构建日志：
#### 构建项目
1. 要求：node >= 12.0.0， 此项目 14.4.0
```
// npm 6.x
npm init @vitejs/app project_name --template
// 据说 npm 7+ ,需要额外的横线
npm init @vitejs/app project_name – --template
// yarn
yarn create @vitejs/app project_name --template
```
2. 打开项目，npm install, 此时打开项目 vite.config.ts 里面可能会有ts红线， 一些type声明找不到
```
npm i @types/node --save-dev
```
3. 把能想起来需要的常用的依赖先装上。
```
npm i sass --save-dev
npm i sass-loader --save-dev
npm i vue-router pinia axios qs 等。。。
// mitt 事件总线 npm i mitt
```
4. vite.config 配置： 别名...等
#### 文件和目录调整
1. views, components, api, utils, assets, router, store, styles
2. 新建页面，配置 router， store 等，改造 App.vue
3. svg 组件参考： https://blog.csdn.net/blackhub/article/details/124500597

#### 移动端字体适应 postcss-px-to-viewport
1. 布局主要使用flex
2. vite.config.ts中配置，正常 px 不转化，当使用 Px 时会转化 vw。
3. pc端正常使用 px.
4. 移动端 做个模糊的媒体查询，并且使用 Px 适应屏幕

#### 注意：defineProps
用完之后，props 最好 const { 属性名... } = toRefs(props) 解构一下并转化成响应式。js里使用加 .value
