<template>

  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

    <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">

      <button @click="emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4 text-purple-500">添加合作者</h2>

      <div class="mb-4">
        <label class="block mb-1 text-gray-600">合作者名字:</label>
        <input v-model="friend_name"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400">
      </div>
      <div class="flex justify-end gap-3">
        <button @click="emit('close')" class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">
          取消
        </button>
        <button @click="handleSubmit" class="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600">
          添加
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import request from '../utils/axios';
const emit = defineEmits(['close']);

const friend_name = ref('')

const username = localStorage.getItem('username')
const handleSubmit = () => {

  request({
    url: '/storage/user/addfriend',
    method: 'POST',
    data: {
      username: username,
      friend_name: friend_name.value
    }

  }).then(res => {
    emit('close')
  }
  )
}
</script>