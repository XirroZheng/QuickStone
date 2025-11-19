<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import request from '../../utils/axios';
import NewBucket from './NewBucket.vue';

const router = useRouter();
const username = localStorage.getItem('username')
const bucketList = ref([]);
const isInBucket = ref(false)

const bucket = ref({
  "bucket_name": "",
  "area": "",
  "storage_type": "",
  "acl_type": "",
  "create_time": "",
  "status": ""
});

const object = ref({
  obejcts: []
}
)
const currentBucket = ref({
  bucket: "",
  objects: [],
})

const getBuckets = async () => {
  request({
    url: '/storage/bucket/overview',
    method: 'POST',
    data: {
      user_name: username
    },
  }).then((res) => {
    if (res.data.status_code === 0) {
      bucketList.value = res.data.buckets
    }
  }).catch((err) => {
    console.log(err)
  })
}
getBuckets()

const handleUploadClick = (b) => {
  if (!b) {
    router.push({
      path: `/components/upload/default`,
    })
  }
  router.push({
    path: `/components/upload/${b.bucket_name}`,
  })
}

const handleSettingClick = (b) => {
  window.open(`/storage/bucket/setting?user_name=${username}&bucket_name=${b.bucket_name}`)
}
const handleInBucketClick = (b) => {

  request({
    url: '/storage/bucket/objects',
    method: 'POST',
    data: {
      user_name: username,
      bucket_name: b.bucket_name
    },
  }).then((res) => {
    if (res.data.status_code === 0) {
      currentBucket.value.bucket = b;
      currentBucket.value.objects = res.data.objects;
      console.log(currentBucket.value)
      isInBucket.value = true
    }
  }).catch((err) => {
    console.log(err)
  })

}

const handleDeleteClick = (obj) => {
  request({
    url: '/storage/object/delete',
    method: 'POST',
    data: {
      user_name: username,
      bucket_name: currentBucket.value.bucket_name,
      object_name: obj.key
    },
  }).then((res) => {
    if (res.data.status_code === 0) {
      currentBucket.value.objects = currentBucket.value.objects.filter((o) => o.key !== obj.key)
    }
  }).catch((err) => {
    console.log(err)
  })
}
const handleDownloadClick = (obj) => {
  request({
    url: '/storage/download',
    method: 'POST',
    responseType: 'blob',
    data: {
      target_user_name: username,
      bucket_name: currentBucket.value.bucket.bucket_name,
      key: obj.key
    }
  }).then((res) => {
    const type = "." + obj.object_type
    const blob = new Blob([res.data], { type });

    const fileName = obj.key + type;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }).catch((err) => {
    console.error("下载失败：", err);
  });
};

</script>


<template>
  <div class="container mx-auto">
    <Breadcrumbs parentTitle="仓库" />
    <div class="grid grid-cols-12 gap-5" v-if="!isInBucket">
      <div v-for="(b, index) in bucketList" :key="index" class="
          col-span-12
          xl:col-span-3
          lg:col-span-6
          md:col-span-6
          sm:col-span-6
        ">
        <BaseCard>
          <div class="flex align-center">
            <div class="m-auto">
              <p class="text-purple-400 text-lg p-4">{{ b.bucket_name }}</p>
              <p class="text-gray-400">地区：{{ b.area }}</p>
              <p class="text-gray-400">存储类型：{{ b.storage_type }}</p>
              <p class="text-gray-400">访问类型：{{ b.acl_type }}</p>
              <p class="text-gray-400">创建时间：{{ b.create_time }}</p>
              <div class="p-4">
                <button class="bg-purple-300 text-white px-4 py-1 rounded-md "
                  @click="handleInBucketClick(b)">查看</button>
              </div>
              <div class="p-4">
                <button class="bg-purple-300 text-white px-4 py-1 rounded-md " @click="handleUploadClick(b)">上传</button>
              </div>
              <div class="p-4">
                <button class="bg-purple-300 text-white px-4 py-1 rounded-md "
                  @click="handleSettingClick(b)">设置</button>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
    <div class="mt-5 flex justify-center">
      <!-- <button class="bg-purple-300 text-white px-4 py-1 rounded-md whitespace-nowrap" @click="">
        创建一个新桶
      </button> -->
    </div>
    <div class="grid grid-cols-12 gap-5" v-if="isInBucket">
      <div v-for="(obj, index) in currentBucket.objects" :key="index" class="
          col-span-12
          xl:col-span-12
          lg:col-span-12
          md:col-span-12
          sm:col-span-12
        ">
        <BaseCard>
          <div class="flex flex-row items-center gap-6 px-4 py-3">

            <!-- 文件名 -->
            <p class="text-purple-400 text-lg flex-shrink-0">
              {{ obj.key }}
            </p>

            <!-- 大小 -->
            <p class="text-gray-400 flex-shrink-0">
              大小：{{ obj.size }}
            </p>

            <!-- 时间 -->
            <p class="text-gray-400 flex-shrink-0">
              创建时间：{{ obj.create_time }}
            </p>

            <!-- 占位自动撑开：把按钮推到右侧 -->
            <div class="flex-grow"></div>

            <!-- 下载按钮 -->
            <button class="bg-purple-300 text-white px-4 py-1 rounded-md" @click="handleDownloadClick(obj)">
              下载
            </button>

            <!-- 删除按钮 -->
            <button class="bg-purple-300 text-white px-4 py-1 rounded-md" @click="handleDeleteClick(obj)">
              删除
            </button>

          </div>
        </BaseCard>

      </div>

    </div>
  </div>


  <!-- <NewBucket /> -->
</template>
