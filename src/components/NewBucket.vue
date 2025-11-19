<template>
  <!-- 弹窗遮罩 -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <!-- 弹窗内容 -->
    <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
      <!-- 关闭按钮 -->
      <button @click="emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4 text-purple-500">创建新桶</h2>

      <!-- 选择模式 -->
      <div class="mb-4">
        <label class="block mb-1 text-gray-600">模式</label>
        <select v-model="mode"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400">
          <option value="self">创建自己的桶</option>
          <option value="public">链接已有的桶</option>
        </select>
      </div>

      <div class="mb-4" v-if="mode === 'public'">
        <label class="block mb-1 text-gray-600">链接码</label>
        <input v-model="bucketName" type="text" placeholder="请输入连接码"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400" />
      </div>

      <!-- 桶名字（仅当 mode === 'self' 时显示） -->
      <div class="mb-4" v-if="mode === 'self'">
        <label class="block mb-1 text-gray-600">桶名字</label>
        <input v-model="bucketName" type="text" placeholder="请输入桶名字"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400" />
      </div>

      <!-- 存储类型（仅当 mode === 'self' 时显示） -->
      <div class="mb-4" v-if="mode === 'self'">
        <label class="block mb-1 text-gray-600">存储类型</label>
        <select v-model="storageType"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400">
          <option value="standard">标准存储</option>
          <option value="infrequent">低频存储</option>
          <option value="archive">归档存储</option>
        </select>
      </div>

      <!-- 访问类型（仅当 mode === 'self' 时显示） -->
      <div class="mb-6" v-if="mode === 'self'">
        <label class="block mb-1 text-gray-600">访问类型</label>
        <select v-model="aclType"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400">
          <option value="private">私有</option>
          <option value="public_read">公共读</option>
          <option value="public">公共读写</option>
        </select>
      </div>

      <!-- 按钮 -->
      <div class="flex justify-end gap-3">
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

const mode = ref('public')
const bucketName = ref('')
const storageType = ref('standard')
const aclType = ref('private')

// 提交逻辑
const handleSubmit = () => {
  if (mode.value === 'self' && !bucketName.value) {
    alert('桶名字不能为空')
    return
  }

  const data = mode.value === 'self' ? {
    bucket_name: bucketName.value,
    area: "default",
    storage_type: storageType.value,
    acl_type: aclType.value,
  } : {
    // 选择公有桶时无需设置桶名和权限，可以传 mode=public
    mode: 'public'
  }

  request({
    url: '/storage/bucket/create',
    method: 'POST',
    data
  }).then(res => {
    alert(mode.value === 'self'
      ? `创建桶 "${bucketName.value}" 成功！`
      : '选择公有桶成功！')

    // 重置表单
    bucketName.value = ''
    storageType.value = 'standard'
    aclType.value = 'private'
    mode.value = 'self'

    emit('close')
  })
}
</script>
