import { ref, reactive } from 'vue'
import { getSessionStorage, setSessionStorage } from './index'
const userSession = getSessionStorage('userinfo')
const userinfo = {
  email: (userSession && userSession.email) || '',
  nickname: (userSession && userSession.nickname) || '',
  weburl: (userSession && userSession.weburl) || ''
}
interface Iloginfo {
  email: string;
  nickname: string;
  weburl: string;
}
const global_loginInfo = reactive<Iloginfo>({
  email: userinfo.email,
  nickname: userinfo.nickname,
  weburl: userinfo.weburl
})
const islogin = !!(userinfo && userinfo.email && userinfo.nickname)
const global_isLogin = ref<boolean>(islogin)
export const useLoginInfo = () => {
  const setLoginInfo = (info: any) => {
    const infoData = {
      email: (info && info.email) || '',
      nickname: (info && info.nickname) || '',
      weburl: (info && info.weburl) || ''
    }
    if(infoData && infoData.email) {
      global_isLogin.value = true
      global_loginInfo.email = infoData.email
      global_loginInfo.nickname = infoData.nickname
      global_loginInfo.weburl = infoData.weburl
      setSessionStorage('userinfo', infoData)
    } else {
      global_isLogin.value = false
      global_loginInfo.email = ''
      global_loginInfo.nickname = ''
      global_loginInfo.weburl = ''
      setSessionStorage('userinfo', null)
    }
  }
  return {
    setLoginInfo,
    global_loginInfo,
    global_isLogin
  }
}