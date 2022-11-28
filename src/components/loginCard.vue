<template>
  <div class="login-card" v-show="isShow">
    <div class="close-btn" @click="handleClose">
      <svg-icon icon-class="close" />
    </div>
    <div class="card-title">LOGIN</div>
    <div class="login-main">
      <div class="login-input-wrap">
        <InputLabel required class="modal-login__input" v-model="formData.email" prefixIcon="email" placeholder="邮箱" type="email"
          :disabled="disabled" />
      </div>
      <div class="login-input-wrap">
        <InputLabel class="modal-login__input" v-model="formData.nickname" prefixIcon="me" placeholder="昵称" :disabled="disabled" />
      </div>
      <div class="login-input-wrap">
        <InputLabel class="modal-login__input" v-model="formData.url" prefixIcon="link" placeholder="网址" type="url"
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
        <div v-if="!global_isLogin">
          <Tooltip content="第三方登录不一定能获取到邮箱，如未能获取到邮箱，请尽量绑定邮箱，以便能及时接收消息">
            <div class="log-text">第三方登录</div>
          </Tooltip>
        </div>
        <div class="logout-text" v-if="global_isLogin" @click="handleLogout">退出</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// todo: 写几个组件：hover提示，confirm框, 消息框，错误提示框。
import InputLabel from './inputLabel.vue'
import Tooltip from './tooltip.vue'
import prompt from './prompt'
import { toRefs, computed, ref, reactive } from 'vue'
import { configStore } from '../store'
import { useLoginInfo } from '../utils/useLoginInfo'
const configStores = configStore()
interface Props {
  visiable: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visiable: false,
})
const { visiable } = toRefs(props)
const emits = defineEmits(['update:visiable']);
const { global_isLogin, global_loginInfo, setLoginInfo  } = useLoginInfo()
// console.log('loginInfo===', global_loginInfo)
const formData = reactive({
  email: global_loginInfo.email,
  nickname: global_loginInfo.nickname,
  url: global_loginInfo.url
})
const disabled = ref<boolean>(global_isLogin.value)
const isEdit = ref<boolean>(false)
const saveLoading = ref<boolean>(false)
const logLoading = ref<boolean>(false)
const isShow = computed({
  get() {
    return visiable.value;
  },
  set(val: boolean) {
    emits('update:visiable', val);
    if(!val) {
      configStores.updateConfig({ isShowMask: false })
    }
  },
});
const handleClose = () => {
  isShow.value = false
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
// 保存
const handleUpdateInfo = () => {
  if(saveLoading.value) return
  saveLoading.value = true
  setTimeout(() => {
    isEdit.value = false
    disabled.value = true
    handleLogin()
    saveLoading.value = false
  }, 3000)
}
const handleLogin = () => {
  if(logLoading.value) return
  logLoading.value = true
  const info = {
    email: formData.email,
    nickname: formData.nickname,
    url: formData.url
  }
  setLoginInfo(info)
  setTimeout(() => {
    logLoading.value = false
  }, 3000)
}
const handleLogout = () => {
  prompt('确定要登出吗？', () => {
    setTimeout(() => {
      console.log('5s后退出')
      setLoginInfo(null)
      formData.email = ''
      formData.nickname = ''
      formData.url = ''
    }, 5000)
  })
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
    &.cancel {
      width: 105px;
      color: var(--text_color);
      background: var(--gray_opacity_1);
      box-shadow: 0 6px 12px var(--gray_opacity_2);
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
  .log-text {
    font-size: 12px;
    text-align: center;
    transition: opacity .5s;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
  .logout-text {
    @extend .log-text;
  }
}
</style>
