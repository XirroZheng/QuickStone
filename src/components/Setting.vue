<template>

  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

    <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">

      <button @click="emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4 text-purple-500">设置</h2>

      <div class="mb-4">
        <label class="block mb-1 text-gray-600">创建时间:{{ bucket.create_time }}</label>
      </div>
      <div class="mb-4">
        <label class="block mb-1 text-gray-600">拥有者:</label>
      </div>
      <div class="mb-4">
        <label class="block mb-1 text-gray-600">当前用户权限:{{ bucket.acl_type }}</label>
      </div>
      <div v-if="username == bucket.owner" class="mb-4">
        <label class="block mb-1 text-gray-600">存储类型:{{ bucket.storage_type }}</label>
        <select v-model="storageType"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400">
          <option value="standard"> 标准存储 </option>
          <option value="infrequent"> 低频存储 </option>
          <option value="archive"> 归档存储 </option>
        </select>
      </div>
      <div v-if="username == bucket.owner" class="mb-6">
        <label class="block mb-1 text-gray-600">访问类型</label>
        <select v-model="aclType"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400">
          <option value="private">私有</option>
          <option value="public_read">公共读</option>
          <option value="public">公共读写</option>
        </select>
      </div>


      <div class="flex justify-end gap-3">
        <button v-if="username == bucket.owner" @click="handleDelete"
          class="px-4 py-2 rounded border hover:bg-red-100 bg-red-500 text-white">
          删除桶
        </button>
        <button @click="emit('close')" class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">
          取消
        </button>
        <button @click="handleSubmit" class="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import request from '../utils/axios';
const emit = defineEmits(['close']);

const storageType = ref('standard')
const aclType = ref('private')

const bucket = ref({
  owner: "",
  bucket_name: "",
  area: "",
  storage_type: "",
  acl_type: "",
  create_tim: "",
  status: ""
});

const username = localStorage.getItem('username')
const handleSubmit = () => {

  request({
    url: '/storage/bucket/create',
    method: 'POST',

  }).then(res => {
    emit('close')
  }
  )
}

const handleDelete = () => {
  const ok = window.confirm(`确定要删除桶吗？`)
  if (!ok) return
  request({
    url: '/storage/bucket/delete',
    method: 'POST',
    data: {
      user_name: username,
      bucket_name: bucket.bucket_name
    },
  }).then(res => {
    if (res.data.status_code === 0) {
      alert(`删除桶 "${bucket.bucket_name}" 成功！`)
      emit('close')
    }
  }).catch(err => {
    console.error('删除出错', err)
  })
}

</script>