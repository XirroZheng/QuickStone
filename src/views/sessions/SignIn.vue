<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/axios'
import { useStore } from 'vuex'

const router = useRouter()
const username = ref('')
const password = ref('')
const store = useStore()

const handleSignIn = async () => {
    if (!username.value || !password.value) {
        console.warn('请输入正确的用户名和密码')
        return
    }

    request({
        url: '/user/login',
        method: 'POST',
        data: {
            user_name: username.value,
            password: password.value
        },
    }).then((res) => {
        if (res.data.status_code === 0) {
            // store.commit('userInfo/setUserName', username.value)
            // store.commit('userInfo/setUserRole', 'user')
            // store.commit('userInfo/isLoggedIn', true)
            // store.commit('userInfo/setUserId', res.data.user_id)
            localStorage.setItem('username',username.value)
            localStorage.setItem('token', res.data.token)
            router.replace('/')
        } else {
            console.error('登录失败:', res.data.status_msg)
        }
    }).catch((err) => {
        console.error('登录失败:', err)
    })

}


const handleCreateAccount = () => {
    router.push('/signUp')
}
</script>

<template>
    <div class="auth-layout-wrap flex justify-center min-h-screen flex-col bg-cover items-center">
        <div class="container-session-v1 max-w-2xl">
            <BaseCard noPadding class="overflow-hidden">
                <div class="grid grid-cols-6">
                    <div class="col-span-12 lg:col-span-6">
                        <div class="p-5">
                            <Logo />
                            <h1 class="mb-3 text-lg">Sign In</h1>
                            <form action="">
                                <div class="mb-3">
                                    <label class="text-xs text-gray-600" for="">Your Name</label>
                                    <input
                                        class="w-full px-4 py-1 bg-gray-100 focus:outline-none border border-gray-400 rounded-full"
                                        type="email" placeholder="" v-model="username" />
                                </div>
                                <div class="mb-3">
                                    <label class="text-xs text-gray-600" for="">Password</label>
                                    <input
                                        class="w-full px-4 py-1 bg-gray-100 focus:outline-none border border-gray-400 rounded-full"
                                        type="password" placeholder="" v-model="password" />
                                </div>
                                <div class="mb-4">
                                    <BaseBtn block class="bg-purple-500 mb-2 text-white rounded-full"
                                        :handleClick="handleSignIn">Sign In</BaseBtn>
                                    <BaseBtn block class="bg-purple-500 mb-2 text-white rounded-full"
                                        :handleClick="handleCreateAccount">Create an account</BaseBtn>
                                </div>
                                <div class="text-center">
                                    <a class="hover:text-purple-500 underline text-gray-600" href="#">Forgot
                                        Password?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </BaseCard>
        </div>
    </div>
</template>
