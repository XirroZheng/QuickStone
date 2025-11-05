<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import request from '../../utils/axios';


const store = useStore();
const userId = computed(() => store.getters['userInfo/getUserId'])
const bucketNum = ref(4);
const bucketList = ref([]);
const isInBucket = ref(false)

const bucket = ref({
  id: '',
  status: '有效',
  info: {
    name: '桶名称',
    volumn: '666',
    create_time: '2023-01-01',
    type: 'public',
  },
  store: [
    {
      id: '',
      name: '对象名称',
      size: '1024',
      type: 'file',
      create_time: '2023-01-01',
    },
    {
      id: '',
      name: '对象名称',
      size: '1024',
      type: 'file',
      create_time: '2023-01-01',
    },
  ]
});

const currentBucket = ref(bucket)

// const getBuckets = async () => {
//   request({
//     url: '/storage/getbuckets',
//     method: 'POST',
//     data: {
//       userid: userId.value
//     },
//   }).then((res) => {
//     if (res.data.status_code === 0) {
//       console.log(res.data)
//       bucketNum.value = res.data.bucket_num
//       bucketList.value = res.data.buckets_list
//     } else {
//       console.error(res.data.status_msg)
//     }
//   }).catch((err) => {
//     console.error(err)
//   })

// }
// getBuckets()

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
              <p class="text-purple-400 text-lg p-4">{{ b.info.name }}</p>
              <p class="text-gray-400">容量：{{ b.info.volumn }}</p>
              <p class="text-gray-400">状态：{{ b.status }}</p>
              <p class="text-gray-400">类型：{{ b.info.type }}</p>
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
