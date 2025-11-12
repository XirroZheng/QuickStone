<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import request from '../../utils/axios';


const store = useStore();
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

const currentBucket = ref(bucket)

const getBuckets = async () => {
  request({
    url: '/storage/bucket/overview',
    method: 'POST',
    data: {
      user_name:username
    },
  }).then((res) => {
    if (res.data.status_code === 0) {
      bucketList.value = res.data.buckets
      console.log(bucketList.value)
    }
  }).catch((err) => {
  })
}
getBuckets()

const handleInBucketClick = (bucket) => {
  isInBucket.value = true
  console.log(isInBucket.value)
}

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
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5" v-if="isInBucket">
      <div v-for="(s, index) in currentBucket.store" :key="index" class="
          col-span-12
          xl:col-span-12
          lg:col-span-12
          md:col-span-12
          sm:col-span-12
        ">
        <BaseCard>

        </BaseCard>
      </div>

    </div>
  </div>
</template>
