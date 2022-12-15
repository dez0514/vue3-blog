const getEmojisUrl = (type: string, name: string) => {
  return new URL(`/src/assets/images/emojis/${type}/${name}`, import.meta.url).href
}
export interface EmojiItem {
  name: string;
  cn: string;
  url: string;
}
// 例子：{ name: 'angry', cn: '愤怒', url: angry}
const getList = (start: number, end: number, flag: string = 'qqe', type: string = '.png', fold: string = 'qq') => {
  if(start >= end) return []
  let temp = []
  for(let i = start; i <= end; i++) {
    const url = getEmojisUrl(fold, `${flag}${i}${type}`)
    temp.push({ name: `${flag}${i}`, cn: `${flag}${i}`, url })
  }
  return temp
}
// 根据图片命名取
const qq204 = getList(100, 204, 'qqe', '.png')
const qq292 = getList(241, 292, 'qqe', '.png')
const qq314 = getList(300, 314, 'qqe', '.gif')
const qq10274 = getList(10260, 10274, 'qqe', '.gif')
const qq10289 = getList(10280, 10289, 'qqe', '.gif')
const qq10307 = getList(10293, 10307, 'qqe', '.gif')
const qq20245 = getList(20237, 20245, 'qqe', '.gif')
const qq202003 = getList(202001, 202003, 'qqe', '.gif')
export const qqList: EmojiItem[] = [...qq204, ...qq292, ...qq314, ...qq10274, ...qq10289, ...qq10307, ...qq20245, ...qq202003]
export const douyinList: EmojiItem[] = getList(0, 359, 'dy_', '.png', 'douyin')
const bibiGifs = getList(33, 76, 'bilibili', '.gif', 'bilibili')
const bibiPngs = getList(77, 82, 'bilibili', '.png', 'bilibili')
export const biliList: EmojiItem[] = [...bibiGifs, ...bibiPngs]
// 解析表情
export const formatEmoji = (value: string) => {
  return value.replace(/\[(.+?)\]/g, (val, content) => {
    const arr = content.split('emoji=')
    const name = arr[1] ? arr[1].trim() : ''
    const list = qqList.concat(douyinList).concat(biliList) // 所有表里面找
    const current = list.find((item) => item.name === name)
    const text = `<img src="${current?.url}" class="comment-emoji"/>`
    return name ? text : val
  })
}