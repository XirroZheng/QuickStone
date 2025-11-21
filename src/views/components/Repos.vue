<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import request from '../../utils/axios';
import NewBucket from '../../components/NewBucket.vue';
import Setting from '../../components/Setting.vue'

const router = useRouter();
const username = localStorage.getItem('username')
const bucketList = ref([]);
const isInBucket = ref(false)

const showNewBucketModal = ref(false)
const showSettingModal = ref(false)

const bucket = ref({
  "owner": "",
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

const settingBucket = ref();

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
      path: `/repositories/upload/default`,
    })
  }
  router.push({
    path: `/repositories/upload/${b.bucket_name}`,
  })
}

const handleInBucketClick = (b) => {

  currentBucket.value = {};

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
      isInBucket.value = true
    }
  }).catch((err) => {
    console.log(err)
  })

}

const handleDeleteClick = (obj) => {
  request({
    url: '/storage/delete',
    method: 'POST',
    data: {
      target_user_name: username,
      bucket_name: currentBucket.value.bucket.bucket_name,
      key: obj.key
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

const handleSettingClick = (b) => {
  settingBucket.value = b;
  showSettingModal.value = true;
}
</script>


<template>
  <Breadcrumbs parentTitle="存储库" needSearch="true" />
  <div v-if="isInBucket">
    <button class="bg-purple-300 text-white px-4 py-1 rounded-md whitespace-nowrap" @click="isInBucket = false">
      返回
    </button>
    <span>当前桶：{{ currentBucket.bucket.bucket_name }}</span>
  </div>
  <div class="container mx-auto">
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
    <div class="grid grid-cols-12 gap-5" v-if="isInBucket">
      <div v-for="(obj, index) in currentBucket.objects" :key="index" class="
          col-span-12
          xl:col-span-12
          lg:col-span-12
          md:col-span-12
          sm:col-span-12
        ">
        <BaseCard>
          <div class="flex flex-row items-center gap-6 px-4 py-3 min-h-[50px]">

            <p class="text-purple-400 text-lg flex-shrink-0 truncate">
              {{ obj.key }}
            </p>
            <p class="text-gray-400 flex-shrink-0 truncate">
              大小：{{ obj.size }}
            </p>
            <p class="text-gray-400 flex-shrink-0 truncate">
              创建时间：{{ obj.create_time }}
            </p>

            <div class="flex-grow"></div>

            <button class="bg-purple-300 text-white px-4 py-1 rounded-md text-sm" @click="handleDownloadClick(obj)">
              下载
            </button>
            <button class="bg-purple-300 text-white px-4 py-1 rounded-md text-sm" @click="handleDeleteClick(obj)">
              删除
            </button>

          </div>
        </BaseCard>


      </div>

    </div>
  </div>
  <div v-if="!isInBucket" class="mt-5 flex justify-center">
    <button class="bg-purple-300 text-white px-4 py-1 rounded-md whitespace-nowrap" @click="showNewBucketModal = true">
      创建一个新桶
    </button>
    <button v-if="isInBucket" class="bg-purple-300 text-white px-4 py-1 rounded-md "
      @click="handleUploadClick(b)">上传</button>
  </div>

  <NewBucket v-if="showNewBucketModal" @close="showNewBucketModal = false" />
  <Setting v-if="showSettingModal" @close="showSettingModal = false" :bucket="settingBucket" />
</template>
