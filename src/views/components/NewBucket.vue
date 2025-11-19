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

      <!-- 桶名字 -->
      <div class="mb-4">
        <label class="block mb-1 text-gray-600">桶名字</label>
        <input v-model="bucketName" type="text" placeholder="请输入桶名字"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400" />
      </div>

      <!-- 存储权限 -->
      <div class="mb-4">
        <label class="block mb-1 text-gray-600">存储类型</label>
        <select v-model="storageType"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400">
          <option value="standard">标准存储</option>
          <option value="infrequent">低频存储</option>
          <option value="archive">归档存储</option>
        </select>
      </div>

      <!-- 访问类型 -->
      <div class="mb-6">
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
          创建
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['close']);

const bucketName = ref('')
const storageType = ref('standard')
const aclType = ref('private')

const handleSubmit = () => {
  if (!bucketName.value) {
    alert('桶名字不能为空')
    return
  }

  request({
    url: '/storage/bucket/create',
    method: 'POST',
    data: {
      bucket_name: bucketName.value,
      area: "default",
      storage_type: storageType.value,
      acl_type: aclType.value,
    }
  }).then(res => {
    console.log('创建桶信息:', newBucket)
    alert(`创建桶 "${bucketName.value}" 成功！`)

    bucketName.value = ''
    storageType.value = 'standard'
    aclType.value = 'private'
    emit('close')
  }
  )
}

</script>
