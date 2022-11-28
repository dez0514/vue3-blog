import { ref, reactive } from 'vue'
import { getSessionStorage, setSessionStorage } from './index'
const userSession = getSessionStorage('userinfo')
const userinfo = {
  email: (userSession && userSession.email) || '',
  nickname: (userSession && userSession.nickname) || '',
  url: (userSession && userSession.url) || ''
}
interface Iloginfo {
  email: string;
  nickname: string;
  url: string;
}
const global_loginInfo = reactive<Iloginfo>({
  email: userinfo.email,
  nickname: userinfo.nickname,
  url: userinfo.url
})
const islogin = !!(userinfo && userinfo.email)
const global_isLogin = ref<boolean>(islogin)
export const useLoginInfo = () => {
  const setLoginInfo = (info: any) => {
    const infoData = {
      email: (info && info.email) || '',
      nickname: (info && info.nickname) || '',
      url: (info && info.url) || ''
    }
    if(infoData && infoData.email) {
      global_isLogin.value = true
      global_loginInfo.email = infoData.email
      global_loginInfo.nickname = infoData.nickname
      global_loginInfo.url = infoData.url
      setSessionStorage('userinfo', infoData)
      // setSessionStorage('isLogin', false)
    } else {
      global_isLogin.value = false
      global_loginInfo.email = ''
      global_loginInfo.nickname = ''
      global_loginInfo.url = ''
      setSessionStorage('userinfo', infoData)
    }
  }
  return {
    setLoginInfo,
    global_loginInfo,
    global_isLogin
  }
}