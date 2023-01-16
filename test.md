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
默认值为数组或者对象是 还得加箭头 () => [], () => {}

#### pinia
```
// 批量更新
configStores.$patch({
    isCollapse: true,
    isPc: false
})
```
```
// 属性添加校验器。。
const props = defineProps({
  pageSize: {
    type: Number,
    default: 10
  },
  maxPageCount: {
    type: Number,
    default: 5,
    validator: (val: number) => {
      return val >= 5 && val <=21 && val%2 === 1
    }
  }
})
```
todo: 
1. 分页器。 pc app  重写一个。。。



ts 定义接口或者type:
可以使用命名空间
```
declare namespace TypeInterName {
  type IColorType = 'red' | 'blue'
  type IWType = string
  interface IBaseState {
    color: IColorType;
    [key: string]: any; // 这种写法可以兼容 额外字段
  }
  interface IformSate {
    ....
  }
}

使用命名空间（不能重复）了就不需要导出或引入， 页面直接使用 TypeInterName.IBaseState
```
as 可以强制转换 类型。

type可以表达式合并：
type Item = '' | '3' | '5'
type ItemC = '' | '1' | '2'
type ItemAll = Item & ItemC

interface可以这么合并
interface IAt {
  a: string;
}
interface IBt {
  b: string;
}
const obj: IAt & IBt = { a: '', b: '' }
const arr: (IAt & IBt)[] = [{ a: '', b: '' }]

#### vue3 挂载全局这么用:
```
// main.ts 中：
const app = createApp(App);
app.config.globalProperties.xxx = xxxx
```
使用：
```
// 引入vue的 getCurrentInstance 方法
import { getCurrentInstance } from "vue";
// 获取当前组件实例
const { appContext } = getCurrentInstance();
// 打印看一下结构
console.log(appContext)
// appContext.config.globalProperties
```

#### 前台页面简单登录逻辑(登录是为了评论功能)
1. 如果 cookie， session 都没有信息就显示未登录
2. cookie 如果cookie里有登录信息就 利用此信息 调接口获取完整信息 存session， 显示已登录
3. 如果 cookie 没有信息，session 有完整信息 显示为已登录， 没有完整信息那就清除信息，显示为未登录

#### 其他好看的网站
// https://ybiis.com/
// https://heitaosan.com/cross
// https://blog.yxbug.cn/guestbook.html

#### 网页置灰
```
body {
  filter: grayscale(100%);
}
```

