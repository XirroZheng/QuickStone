<script setup>
import Logo from '../../components/Base/Logo.vue';

const handleSignIn = () => {
    alert('handleSignIn');
}
const handleCreateAccount = ()=>{
    alert('handleCreateAccount');
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
                          <h1 class="mb-3 text-lg">Sign In </h1>
                          <form action="">
                              <div class="mb-3">
                                  <label class="text-xs text-gray-600" for="">Email Address</label>
                                  <input class="w-full px-4 py-1 bg-gray-100 focus:outline-none border border-gray-400 rounded-full" value="ui-lib@gmail.com" type="email" placeholder="">
                              </div>
                              <div class="mb-3">
                                  <label class="text-xs text-gray-600" for="">Password</label>
                                  <input class="w-full px-4 py-1 bg-gray-100 focus:outline-none border border-gray-400 rounded-full" value="askjhdgahsgd" type="password" placeholder="">
                              </div>
                              <div class="mb-4">
      
                                  <BaseBtn block class="bg-purple-500 mb-2 text-white  rounded-full" :handleClick="handleSignIn">Sign In</BaseBtn>
                                  <BaseBtn block class="bg-purple-500 mb-2 text-white  rounded-full" :handleClick="handleCreateAccount">Create an account</BaseBtn>
                              </div>
                              <div class="text-center">
                                <a class="hover:text-purple-500 underline text-gray-600" href="#">Forgot Password?</a>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
            </BaseCard>
            
        </div>
    </div>
</template>
