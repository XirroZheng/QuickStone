<script setup>
import Logo from '../../components/Base/Logo.vue';
</script>
<template>
  <div class="auth-layout-wrap flex justify-center min-h-screen flex-col bg-cover items-center" >
        <div class="container-session-v1 max-w-2xl">
            <BaseCard noPadding class="overflow-hidden">
                <div class="grid grid-cols-6">
                    <div class="col-span-12 bg-cover lg:col-span-6" >
                        <div class="block justify-center items-center flex-col h-full px-4 py-2 lg:flex">
                            <Logo/>
                        </div>
                    </div>
                    <div class="col-span-12 lg:col-span-6">
                        <div class="p-5">
                            <h1 class="mb-3 text-lg">Sign Up </h1>
                            <form action="">
                                <div class="mb-3">
                                    <label class="text-base text-gray-600" for="">Your Name</label>
                                    <input class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="text" placeholder="">
                                </div>
                                <div class="mb-3">
                                    <label class="text-base text-gray-600" for="">Email Address</label>
                                    <input class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="email" placeholder="">
                                </div>
                                <div class="mb-3">
                                    <label class="text-base text-gray-600" for="">Password</label>
                                    <input class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="password" placeholder="">
                                </div>
                                <div class="mb-3">
                                    <label class="text-base text-gray-600" for="">Insure Your Password</label>
                                    <input class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="password" placeholder="">
                                </div>
                                <div class="mb-3">
                                <BaseBtn rounded block class="bg-purple-500 text-white">Sign Up</BaseBtn>
                                </div>
                                <div class="mb-3">
                                <BaseBtn block rounded class=" mb-3 border border-green-500 bg-gray-100 text-green-500 hover:bg-g-500 hover:text-white">
                                    <i class=" align-middle mr-2"></i>Sign Up with WeChat
                                </BaseBtn>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </BaseCard>
            
            
        </div>
    </div>
</template>
