<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { Switch } from '@headlessui/vue'
import { useStore } from 'vuex'
import request from '@/utils/axios'
import { computed } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import { useRouter } from 'vue-router'
let store = useStore()
const router = useRouter()
const username = computed(() => store.getters['userInfo/getUserName'])

const sideBarToggle = () => {
    let sidenav = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen

    if (sidenav == false) {
        store.commit('largeSidebar/toggleSidebarProperties')
    } else {
        store.commit('largeSidebar/toggleSidebarProperties')
    }
}

const handleSignOut = async () => {
    try {
        const res = await request({
            url: "/user/logout",
            method: "POST",
            username: username.value
        });

        if (res.data.status_code == 0) {
            alert("退出成功！");
            store.commit('userInfo/isLoggedIn', false)
            store.commit('userInfo/setUserId', null)
            store.commit('userInfo/setUserName', null)
            store.commit('userInfo/setUserRole', null)
            localStorage.removeItem('token')
            router.replace('/signIn');
        }
    } catch (error) {
        console.error(error);
        alert("退出失败，请稍后重试");
    }
};

const handleAccountSettingsClick = () => {
    router.push('/profile/account');
}
</script>

<template>
    <div class="header-wrapper flex bg-white justify-between px-4">
        <div class="flex items-center">
            <div class="logo flex justify-center">
                <Logo />
            </div>
            <div class="mx-0 sm:mx-3">
                <button @click="sideBarToggle" class="
                        menu-toggle
                        cursor-pointer
                        text-gray-500
                        align-middle
                        focus:outline-none
                    " type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

        </div>
        <div class="flex items-center">
            <a class="
                    hidden
                    mr-0
                    btn btn-sm
                    hover:bg-gray-100
                    sm:block
                    rounded
                    p-1
                    md:mr-2
                " href="https://github.com/uilibrary/AatroX-vue" target="_blank">
                <svg width="24" height="24" fill="currentColor" class="text-purple-600 text-opacity-50 transform">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z">
                    </path>
                </svg>
            </a>
            <!-- notification-dropdown  -->
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton class="
                            btn btn-sm
                            hover:bg-gray-100
                            rounded
                            badge-top-container
                            inline-flex
                            justify-center
                            w-full
                            px-4
                            py-2
                            text-sm
                            font-medium
                        ">
                        <span class="badge-count text-white bg-purple-500">3</span>
                        <i class="i-Bell text-xl header-icon text-gray-800"></i>
                    </MenuButton>
                </div>

                <MenuItems class="
                        absolute
                        right-0
                        w-44
                        mt-2
                        overflow-hidden
                        origin-top-right
                        bg-white
                        rounded-md
                        custom-box-shadow
                        focus:outline-none
                    ">
                    <div class="">
                        <MenuItem v-for="(item, index) in 4" :key="index" v-slot="{ active }">
                        <button :class="[
                            active
                                ? 'bg-purple-500 text-white'
                                : 'text-gray-900',
                            'group flex  items-center w-full px-4 py-2 text-sm',
                        ]">
                            <div class="flex flex-1 justify-between">
                                <div>
                                    <h6>New Message</h6>
                                    <p :class="[
                                        active
                                            ? 'text-gray-300'
                                            : 'text-gray-500',
                                    ]">
                                        How are you ?
                                    </p>
                                </div>
                                <div>
                                    <p :class="[
                                        active
                                            ? 'text-gray-200'
                                            : 'text-gray-400',
                                    ]">
                                        10s
                                    </p>
                                </div>
                            </div>
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>

            <!-- profile-dropdown  -->
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton class="
                            inline-flex
                            justify-center
                            w-full
                            px-4
                            py-2
                            text-sm
                            font-medium
                        ">
                        <img class="avatar rounded-full" src="/images/faces/1.jpg" alt="" />
                    </MenuButton>
                </div>

                <MenuItems class="
                        absolute
                        right-0
                        w-44
                        mt-2
                        overflow-hidden
                        origin-top-right
                        bg-white
                        rounded-md
                        custom-box-shadow
                        focus:outline-none
                    ">
                    <div class="">
                        <MenuItem v-slot="{ active }">
                        <button :class="[
                            active
                                ? 'bg-purple-500 text-white'
                                : 'text-gray-900',
                            'group flex  items-center w-full px-4 py-2 text-sm',
                        ]" @click="handleAccountSettingsClick">
                            账户设置
                        </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                        <button :class="[
                            active
                                ? 'bg-purple-500 text-white'
                                : 'text-gray-900',
                            'group flex  items-center w-full px-4 py-2 text-sm',
                        ]">
                            账单记录
                        </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                        <button @click="handleSignOut" :class="[
                            active
                                ? 'bg-purple-500 text-white'
                                : 'text-gray-900',
                            'group flex  items-center w-full px-4 py-2 text-sm',
                        ]">
                            退出登录
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    z-index: 100;
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}

.mega-menu {
    width: 1200px;
}

ul.links {
    column-count: 2;

    li {
        margin-bottom: 8px;
    }
}
</style>
