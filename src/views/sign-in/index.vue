<template>
  <div class="sign-in-container">
    <div class="sign-in-form">
      <ElForm
        ref="form"
        :model="formValues"
        :rules="formRules"
      >
        <h1 class="sign-in-title">
          ElementPlus Admin
        </h1>
        <ElFormItem prop="username">
          <ElInput
            v-model.trim="formValues.username"
            placeholder="请输入用户名"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            @keyup.enter="handleSignIn"
            v-model.trim="formValues.password"
            type="new-password"
            placeholder="请输入密码"
          />
        </ElFormItem>
      </ElForm>
      <ElButton
        @click.stop="handleSignIn"
        class="sign-in-btn"
        type="primary"
        :loading="isLoading"
      >
        {{ i18n.t(`action.signIn`) }}
      </ElButton>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  unref,
  computed,
  reactive,
  defineComponent,
} from 'vue'
import { useEnhancer } from '@/enhancers'
import { useUserStore } from '@/store/user'

export default defineComponent({
  name: `SignIn`,

  setup () {
    const {
      i18n,
      route,
      router,
    } = useEnhancer()
    const userStore = useUserStore()
    const form = ref(null)
    const isLoading = ref(false)
    const formValues = reactive({
      username: ``,
      password: ``,
    })
    const formRules = reactive({
      username: { required: true, message: `请填写用户名`, trigger: [`blur`, `change`] },
      password: { required: true, message: `请填写密码`, trigger: [`blur`, `change`] },
    })

    const redirect = computed(() => route.query && route.query.redirect)

    const handleSignIn = () => {
      const formValidator = unref(form)

      // @ts-expect-error TODO
      formValidator.validate((valid: boolean) => {
        if (!valid) return false
        isLoading.value = true
        // Call sign-in service here
        userStore.setToken(`${formValues.username}_${formValues.password}`)
        router.push(redirect.value || `/`)
        isLoading.value = false
      })
    }

    return {
      i18n,
      form, // return required
      isLoading,
      formValues,
      formRules,
      handleSignIn,
    }
  },
})
</script>

<style lang="scss" scoped>
.sign-in-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .sign-in-form {
    position: relative;
    padding: 15px;
    width: 100%;
    max-width: 460px;
  }

  .sign-in-title {
    position: relative;
    margin-bottom: 30px;
    text-align: center;
    font-size: 32px;
  }

  .sign-in-btn {
    position: relative;
    width: 100%;
    margin-top: 10px;
    letter-spacing: 10px;
    font-size: 20px;
  }
}
</style>
