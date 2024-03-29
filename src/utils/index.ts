import Cookies from 'js-cookie'
import Mint from 'mint-filter'
import mintWords from '../assets/mintWords'

export const getCookie = (keyname: string) => {
  return Cookies.get(keyname)
}

export const setCookie = (keyname: string, value: string) => {
  Cookies.set(keyname, value)
}
export const removeCookie = (keyname: string) => {
  Cookies.remove(keyname)
}

export const getSessionStorage = (keyname: string) => {
  const value = sessionStorage.getItem(keyname)
  try {
    if (value && typeof JSON.parse(value) === 'object') {
      return JSON.parse(value)
    } else {
      return value
    }
  } catch (e) {
    return value
  }
}

export const setSessionStorage = (keyname: string, value: any) => {
  if (!value) {
    sessionStorage.removeItem(keyname)
  }
  if (typeof value === 'string') {
    sessionStorage.setItem(keyname, value)
  } else if (value instanceof Object) {
    sessionStorage.setItem(keyname, JSON.stringify(value))
  }
}

export const checkStr = (str: string | undefined | null, type: string) => {
  if (typeof str !== 'string') {
    return false
  }
  switch (type) {
    case 'phone': //手机号码
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
    case 'tel': //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
    case 'card': //身份证
      return /^\d{15}|\d{18}$/.test(str)
    case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str)
    case 'postal': //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str)
    case 'QQ': //QQ号
      return /^[1-9][0-9]{4,9}$/.test(str)
    case 'email': //邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
    case 'money': //金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str)
    case 'URL': //网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    case 'IP': //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str)
    case 'date': //日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
    case 'number': //数字
      return /^[0-9]$/.test(str)
    case 'english': //英文
      return /^[a-zA-Z]+$/.test(str)
    case 'chinese': //中文
      return /^[\u4E00-\u9FA5]+$/.test(str)
    case 'lower': //小写
      return /^[a-z]+$/.test(str)
    case 'upper': //大写
      return /^[A-Z]+$/.test(str)
    case 'HTML': //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str)
    default:
      return false
  }
}

// export const formatEmoji = (value: string) => {
//   return value.replace(/\[(.+?)\]/g, (val, content) => {
//     const arr = content.split('emoji=')
//     const name = arr[1] ? arr[1].trim() : ''
//     const current = emojiList.find((item) => item.name === name)
//     const text = `<img src="${current?.url}" class="comment-emoji"/>`
//     return name ? text : val
//   })
// }

// 检查敏感词
const mint = new Mint(mintWords)
const emojiRe = /\[(.+?)\]/g
export const checkMint = (text: string) => {
  // 过滤表情导致的敏感词
  return mint.filterSync(text.replace(emojiRe, ''))
}

// 敏感词过滤
export const filterMint = (text: string) => {
  return text
  // return mint.filterSync(text).text as string
}