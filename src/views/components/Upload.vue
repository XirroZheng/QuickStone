<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { ref } from 'vue'
import request from '@/utils/axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const bucket_name = route.params.bucket_name || 'default'


const files = ref([])           // 选择或拖入的文件列表
const uploading = ref(false)    // 上传状态
const progressMap = ref({})     // 每个文件的上传进度
const fileInput = ref(null)     // 文件 input 引用


// 文件选择
function handleFileChange (event) {
  const input = event.target
  if (input.files) {
    const newFiles = Array.from(input.files)
    newFiles.forEach(f => {
      if (!files.value.find(existing => existing.name === f.name)) {
        files.value.push(f)
        progressMap.value[f.name] = 0
      }
    })
  }
}

// 拖拽文件
function handleDrop (event) {
  event.preventDefault()
  if (event.dataTransfer && event.dataTransfer.files) {
    const newFiles = Array.from(event.dataTransfer.files)
    newFiles.forEach(f => {
      if (!files.value.find(existing => existing.name === f.name)) {
        files.value.push(f)
        progressMap.value[f.name] = 0
      }
    })
  }
}

function handleDragOver (event) {
  event.preventDefault()
}

function removeFile (file) {
  files.value = files.value.filter(f => f.name !== file.name)
  delete progressMap.value[file.name]
}

function uploadFile (file) {
  const formData = new FormData()

  const fullName = file.name
  const extension = fullName.includes('.') ? fullName.slice(fullName.lastIndexOf('.') + 1) : '';
  const nameWithoutExt = fullName.includes('.') ? fullName.slice(0, fullName.lastIndexOf('.')) : fullName;

  formData.append('file', file)
  formData.append('key', nameWithoutExt)
  formData.append('target_user_name', localStorage.getItem('username'))
  formData.append('object_type', extension)
  formData.append('bucket_name', bucket_name)
  return request({
    url: '/storage/upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },

    onUploadProgress: function (event) {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100)
        progressMap.value[file.name] = percent
      }
    }
  })
}

async function uploadFiles () {
  if (!files.value.length) return
  uploading.value = true

  try {
    const uploadPromises = files.value.map(file => uploadFile(file))
    const results = await Promise.all(uploadPromises)

    uploading.value = false
    //alert('上传完成: ' + results.map(r => r.filename || r.data.filename).join(', '))
    files.value = []
    progressMap.value = {}
  } catch (err) {
    uploading.value = false
    alert('上传失败: ' + err.message)
  }
}

</script>

<template>
  <Breadcrumbs parentTitle="上传" />
  <BaseCard>
    <div class="p-4">
      <p class="text-purple-400 text-lg p-4 text-center">当前桶：{{ bucket_name }}</p>
    </div>
    <BaseCard>
      <div
        class="upload-box border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
        @drop="handleDrop" @dragover="handleDragOver" @click="fileInput.click()">
        <input type="file" ref="fileInput" class="hidden" multiple @change="handleFileChange" />
        <p class="text-gray-500">拖动文件到此处或点击选择文件</p>

        <div v-if="files.length" class="mt-4 text-left">
          <ul>
            <li v-for="file in files" :key="file.name"
              class="flex items-center justify-between mb-2 p-2 border rounded hover:bg-gray-50">
              <div class="flex items-center space-x-2">
                <span class="material-icons text-gray-500"></span>
                <span>{{ file.name }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <span>{{ progressMap[file.name] || 0 }}%</span>
                <button class="text-red-500 hover:text-red-700" @click.stop="removeFile(file)">
                  删除
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="files.length" class="mt-4 text-center">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" :disabled="uploading"
          @click="uploadFiles">
          {{ uploading ? '上传中...' : '开始上传' }}
        </button>
      </div>
    </BaseCard>
  </BaseCard>
</template>

<style scoped>
.upload-box {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
