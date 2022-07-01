<template>
  <div class="login">
    <el-row class="login-container ma lg:w-1200px w-full" type="flex" align="middle" justify="center">
        <el-col :lg="{span: 8}" :span="24">
            <el-card shadow="hover" class="p-20px">
                <div class="text-3xl fw700 mb-20px animate-bounce-alt animate-count-infinite animate-duration-1s"  style="color: var(--ep-color-primary-light-3);" align="center">快来 Chat</div>
                <el-form @keyup.enter="submitLogin(formRef)" ref="formRef" :rules="rules" size="large" :model="form">
                    <el-form-item prop="username">
                        <el-input
                            type="text"
                            clearable
                            v-model="form.username"
                            autofocus
                            placeholder="请输入登录邮箱"
                        >
                            <template #prefix>
                                <el-icon i="ep-user"></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    
                    <el-form-item prop="code" v-if="useType === 'reg'">
                        <el-input
                            v-model="form.code"
                            placeholder="请输入验证码"
                        >
                            <template #prefix>
                                <el-icon i="ep-grid"></el-icon>
                            </template>
                            <template #append>
                                <el-button type="primary" @click="sendCode(formRef)">
                                    {{codeText}}
                                </el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input
                            v-model="form.password"
                            type="password"
                            placeholder="请输入登录密码"
                            show-password
                        >
                            <template #prefix>
                                <el-icon i="ep-lock"></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="againPwd" v-if="useType === 'reg'">
                        <el-input
                            v-model="form.againPwd"
                            type="password"
                            placeholder="请再次输入密码"
                            show-password
                        >
                            <template #prefix>
                                <el-icon i="ep-unlock"></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            class="ma"
                            type="primary"
                            link
                            @click="useTypeChange(formRef)"
                            >{{buttonText('text')}}</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="w-full" :loading="form.loading" round type="primary" size="large" @click="submitLogin(formRef)">
                            {{buttonText('button')}}
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
    import {
    login,
    sendEmailCode,
    reguser
    } from "@/api/user"

    import {reactive, ref, computed } from 'vue'
    import type { ElForm } from 'element-plus'
    import { ElNotification } from 'element-plus'
    import { validatorPassword } from '@/utils/validate'
    import router from '@/router'
    import {useMainStore} from '@/store/main'

    const store = useMainStore()

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 类型
    const useType = ref('login')

    // 验证码数据
    const codeDatas = reactive({
        timer: null,
        num: 60
    })

    // 按钮文字
    const buttonText = computed(() => {
        return (type: String) => {
            return (type === 'text' && useType.value === 'reg')?'立即登录':(type === 'text' && useType.value === 'login')?'立即注册':useType.value === 'login'?'登录':'注册'
        }
    })

    // 初始化表单项
    const form = reactive({
        username: '',
        password: '',
        code: '',
        againPwd: '',
        loading: false
    })

    // 登录时间戳
    const timestamp = ref('')

    // 验证再次输入密码
    const validatePass2 = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请再次输入密码'))
        } else if (value !== form.password) {
            callback(new Error("两次密码不一致"))
        } else {
            callback()
        }
    }

    // 验证码倒计时
    const codeText = computed(()=>{
        return codeDatas.num!==60?`剩余${codeDatas.num}秒`:'获取验证码'
    })

    // 获取验证码
    function sendCode(formEl: InstanceType<typeof ElForm> | undefined) {
        if (!formEl || codeDatas.num!==60) return
        formEl.validateField('username', (bool) => {
            if(bool){
                sendEmailCode({email: form.username}).then((res: any) => {
                    if(res?.code === 200){
                        codeDatas.num--
                        codeDatas.timer = setInterval(() => {
                            if (codeDatas.num < 1) {
                            if (codeDatas.timer != null) {
                                clearInterval(codeDatas.timer)
                                codeDatas.timer = null;
                            }
                            codeDatas.num = 60
                            } else {
                                codeDatas.num--
                            }
                        }, 1000)
                        ElNotification.success('发送验证码成功')
                        form.code = res?.data?.code
                        timestamp.value = res?.data?.timestamp
                    }else
                        ElNotification.success('发送验证码失败')
                }).catch((err:any) => {
                    ElNotification.error( err?.response?.data?.message || err.message)
                })
            }
        })
    }

    // 切换登录注册
    const useTypeChange = (formEl: InstanceType<typeof ElForm> | undefined)=>{
        if(useType.value === 'reg')
            useType.value = 'login'
        else
            useType.value = 'reg'
        if (!formEl) return
            formEl.resetFields()
    }

    // 表单验证规则
    const rules = reactive({
        username: [
            {
                required: true,
                message: '请输入登录邮箱',
                trigger: ['blur', 'change'],
            }
        ],

        password: [
            {
                required: true,
                message: '请输入登录密码',
                trigger: ['blur', 'change'],
            },
            {
                validator: validatorPassword,
                trigger: ['blur', 'change'],
            },
        ],

        againPwd: [
            {
                validator: validatePass2,
                trigger: ['blur', 'change'],
            }
        ],

        code: [
            {
                required: true,
                message: '请输入验证码',
                trigger: ['blur', 'change']
            }
        ]
    })

    // 登录
    const submitLogin = (formEl: InstanceType<typeof ElForm> | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
                form.loading = true
                const { username, password, code} = form
                if(useType.value === 'login')
                    login({email: username, password}).then((res: any) => {
                        if (res?.code == 200) {
                            if (!formEl) return
                                formEl.resetFields()
                            store.setToken(res?.data)
                            router.push({ path: '/chat' })
                        } else
                        ElNotification({
                            message: '登录失败',
                            type: 'error',
                        })
                    }).catch((err: any) => {
                        ElNotification({
                            message: err?.response?.data?.message || err.message,
                            type: 'error'
                        })
                    }).finally(()=>{
                        form.loading = false
                    })
                else
                    reguser({email: username, code, timestamp: timestamp.value, password}).then((res: any) => {
                        if(res?.code === 200){
                            ElNotification.success('注册账号成功，赶快去登录吧~！')
                            if (!formEl) return
                                formEl.resetFields()
                        }else
                            ElNotification.success('注册账号失败，请重试~！')
                    }).catch((err: any) => {
                        ElNotification({
                            message: err?.response?.data?.message || err.message,
                            type: 'error'
                        })
                    }).finally(()=>{
                        form.loading = false
                    })
            } else {
                return false
            }
        })
    }
</script>

<style scoped lang="scss">
    .login{
        .login-container{
            min-height: calc(80vh - 60px);
        }
    }
</style>
