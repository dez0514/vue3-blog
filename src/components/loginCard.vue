<template>
  <div class="login-card" v-show="isShow">
    <div class="close-btn" @click="handleClose">
      <svg-icon icon-class="close" />
    </div>
    <div class="card-title">LOGIN</div>
    <div class="login-main">
      <div class="login-input-wrap">
        <InputLabel required class="modal-login__input" v-model="formData.email" prefixIcon="email" placeholder="邮箱"
          type="email" :disabled="(disabled || isEdit)" />
      </div>
      <div class="login-input-wrap">
        <InputLabel class="modal-login__input" v-model="formData.nickname" prefixIcon="me" placeholder="昵称"
          :disabled="disabled" />
      </div>
      <div class="login-input-wrap">
        <InputLabel class="modal-login__input" v-model="formData.weburl" prefixIcon="link" placeholder="网址" type="url"
          :disabled="disabled" />
      </div>
      <div class="btn" v-if="!global_isLogin" @click="handleLogin">登录</div>
      <em class="tip" v-if="!global_isLogin">已注册可直接邮箱登录, 未注册请输入邮箱昵称进行登录</em>
      <div class="btn-wraps" v-if="global_isLogin">
        <div v-show="!isEdit" class="btn" @click="handleClickToEdit">编辑</div>
        <div v-show="isEdit" class="btn save" @click="handleUpdateInfo">
          <svg-icon v-show="saveLoading" class="animate-loading" icon-class="loading" />
          保存
        </div>
        <div v-show="isEdit" class="btn cancel" @click="handleCancelEdit">取消</div>
      </div>
      <div class="third-login">
        <div v-if="(!global_isLogin && hasThirdLogin)">
          <div v-show="!isShowThirdLog">
            <Tooltip content="第三方登录不一定能获取到邮箱，如未能获取到邮箱，请尽量绑定邮箱，以便能及时接收消息" :contentStyle="toolTipStyle">
              <div class="log-text" @click="handleThirdText">第三方登录</div>
            </Tooltip>
          </div>
          <div v-show="isShowThirdLog" class="third-icon-wrap">
            <Tooltip content="github">
              <svg-icon class="third-icon" icon-class="third-github" @click="handleClickThirdIcon('github')"></svg-icon>
            </Tooltip>
            <Tooltip content="QQ">
              <svg-icon class="third-icon" icon-class="third-qq" @click="handleClickThirdIcon('qq')"></svg-icon>
            </Tooltip>
          </div>
        </div>
        <div v-if="global_isLogin" class="logout-text" @click="handleLogout">退出</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// todo: 写几个组件：hover提示，confirm框, 消息框，错误提示框。
import InputLabel from './inputLabel.vue'
import Tooltip from './tooltip.vue'
import prompt from './prompt'
import notification from './notification/index'
import { toRefs, computed, ref, reactive, CSSProperties } from 'vue'
import { configStore } from '../store'
import { useLoginInfo } from '../utils/useLoginInfo'
import { checkStr, removeCookie } from '../utils'
import rootConfig from '../utils/config'
import { clientLogin, updateInfos  } from '../api/user'
const toolTipStyle: CSSProperties = {
  width: '308px',
  whiteSpace: 'normal',
  lineHeight: '18px'
}
const configStores = configStore()
interface Props {
  visiable: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visiable: false,
})
const { visiable } = toRefs(props)
const emits = defineEmits(['update:visiable']);
const { global_isLogin, global_loginInfo, setLoginInfo } = useLoginInfo()
// console.log('loginInfo===', global_loginInfo)
const formData = reactive({
  email: global_loginInfo.email,
  nickname: global_loginInfo.nickname,
  weburl: global_loginInfo.weburl
})
const hasThirdLogin = ref<boolean>(false) // 隐藏第三方登录
const disabled = ref<boolean>(global_isLogin.value)
const isEdit = ref<boolean>(false)
const isShowThirdLog = ref<boolean>(false)
const saveLoading = ref<boolean>(false)
const logLoading = ref<boolean>(false)
const isShow = computed({
  get() {
    if(visiable.value) {
      initData() // 显示的时候也要填一下信息
    }
    return visiable.value;
  },
  set(val: boolean) {
    emits('update:visiable', val);
    if (!val) {
      configStores.updateConfig({ isShowMask: false })
    }
  },
});
const initData = () => {
  isShowThirdLog.value = false
  formData.email = global_loginInfo.email
  formData.nickname = global_loginInfo.nickname
  formData.weburl = global_loginInfo.weburl
  disabled.value = global_isLogin.value
  isEdit.value = false
}
const handleClose = () => {
  isShow.value = false
  initData()
}
const handleThirdText = () => {
  isShowThirdLog.value = true
}
const handleClickToEdit = () => {
  isEdit.value = true
  disabled.value = false
}
const handleCancelEdit = () => {
  isEdit.value = false
  disabled.value = true
  saveLoading.value = false
}
const check = () => {
  let msg = ''
  if (!formData.email) {
    msg = '请输入邮箱'
  }
  if (!checkStr(formData.email, 'email')) {
    msg = '请输入正确的邮箱'
  }
  if (formData.weburl && !checkStr(formData.weburl, 'URL')) {
    msg = '请输入正确的网址'
  }
  if (msg) {
    notification.show({
      type: 'error',
      message: msg,
      duration: 3000
    })
    return true
  }
  return false
}
// 保存
const handleUpdateInfo = () => {
  if (saveLoading.value) return
  if (check()) {
    return
  }
  saveLoading.value = true
  const params = {
    email: formData.email,
    nickname: formData.nickname,
    weburl: formData.weburl
  }
  updateInfos(params).then((res: any) => {
    saveLoading.value = false
    if(res.code === 0) {
      isEdit.value = false
      disabled.value = true
      const info = {
        email: res.data.email,
        nickname: res.data.nickname,
        weburl: res.data.weburl
      }
      setLoginInfo(info)
    } else {
      notification.show({
        type: 'error',
        message: res.message,
        duration: 3000
      })
    }
  }).catch(() => {
    saveLoading.value = false
  })
}
const handleLogin = () => {
  if (logLoading.value) return
  // 校验有效邮箱
  if (check()) {
    return
  }
  logLoading.value = true
  const params = {
    email: formData.email,
    nickname: formData.nickname,
    weburl: formData.weburl
  }
  clientLogin(params).then((res: any) => {
    logLoading.value = false
    if(res.code === 0) {
      const info = {
        email: res.data.email,
        nickname: res.data.nickname,
        weburl: res.data.weburl
      }
      setLoginInfo(info)
      handleClose()
      disabled.value = true
    } else {
      notification.show({
        type: 'error',
        message: res.message,
        duration: 3000
      })
    }
  }).catch(() => {
    logLoading.value = false
    notification.show({
      type: 'error',
      message: '网络错误！',
      duration: 3000
    })
  })
}
const handleLogout = () => {
  prompt('确定要登出吗？', () => {
    disabled.value = false
    setLoginInfo(null)
    formData.email = ''
    formData.nickname = ''
    formData.weburl = ''
    removeCookie('email')
    handleClose()
  })
}
const handleClickThirdIcon = (name: string) => {
    const newWidth = 600
    const newHeight = 600
    const winWidth = screen.width
    const winHeight = screen.height
    const left = (winWidth - newWidth) / 2
    const top = (winHeight - newHeight) / 2
    const windowSize = `width=${newWidth},height=${newHeight},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no`
    console.log(left, top)
    if (name === 'github') {
      const oauth = rootConfig.github.oauth
      const url = `${oauth.url}?client_id=${oauth.client_id}&redirect_uri=${encodeURIComponent(oauth.redirect_uri)}`
      window.open(url, 'GithubLogin', windowSize)
    } else if (name === 'qq') {
      const oauth = rootConfig.qq.oauth
      const url = `${oauth.url}?response_type=code&client_id=${oauth.appId}&redirect_uri=${encodeURIComponent(oauth.redirect_uri)}&state=state`
      window.open(url, 'TencentLogin', windowSize)
    }
  }
</script>
<style  lang="scss" scoped>
.card-title {
  color: var(--primary);
  font-size: 24px;
  border-left: 3px solid var(--primary);
  text-shadow: 0 1px 1px #fff;
  padding-left: 22px;
  margin-bottom: 25px;
}

.login-main {
  padding: 0 25px;

  .btn-wraps {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    background: var(--bg_theme_btn);
    width: 150px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    box-shadow: 0 6px 12px var(--primary_opacity_5);
    margin: 0 auto;
    display: block;
    border-radius: 18px;
    color: var(--white);
    font-size: 16px;
    transition: box-shadow .3s;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &.cancel {
      width: 105px;
      color: var(--text_color);
      background: var(--gray_opacity_1);
      box-shadow: 0 6px 12px var(--gray_opacity_2);
      -webkit-tap-highlight-color: transparent;
    }

    &.save {
      width: 105px;
    }

    &:hover {
      box-shadow: 0 8px 15px var(--primary_opacity_7);
    }

    &.cancel:hover {
      box-shadow: 0 6px 12px var(--gray_opacity_3);
    }
  }

  .tip {
    display: block;
    text-align: center;
    font-size: 10px;
    margin-top: 6px;
  }
}

.login-input-wrap {
  margin: 10px 0 25px;
}

.login-card {
  z-index: var(--zIndex_6);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 310px;
  background: var(--gray_9);
  padding: 30px 0;
  border-radius: 20px;
  box-shadow: 0 1px 1px #fff inset, 0 15px 20px var(--gray_opacity_3);

  .close-btn {
    position: absolute;
    right: 12px;
    top: 14px;
    font-size: 22px;
    cursor: pointer;
  }
}

.third-login {
  margin-top: 14px;
  text-align: center;
  .third-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    .third-icon {
      margin: 0 4px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      &:hover {
        color: var(--primary);
      }
    }
  }
  .log-text {
    display: inline-block;
    font-size: 12px;
    text-align: center;
    transition: opacity .5s;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      text-decoration: underline;
    }
  }

  .logout-text {
    @extend .log-text;
  }
}
</style>
