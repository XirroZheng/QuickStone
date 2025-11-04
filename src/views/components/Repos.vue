<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import request from '../../utils/axios';
const store = useStore();
const userId = computed(() => store.getters['userInfo/getUserId'])
const bucketNum = ref(9);
const bucketList = ref([]);

const bucket = ref({
  name: '',
  id: '',
  repo_type: '',
  repo_url: '',
  branch: '',
  clone_url: '',
  status: '',
});

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
</script>


<template>
  <div class="container mx-auto">
    <Breadcrumbs parentTitle="仓库" />

    <div class="grid grid-cols-12 gap-5">
      <div v-for="(b, index) in bucketNum" :key="index" class="
          col-span-12
          xl:col-span-3
          lg:col-span-6
          md:col-span-6
          sm:col-span-6
        ">
        <BaseCard>
          <div class="flex align-center">
            <i class="i-Money-2 text-6xl text-purple-200"></i>
            <div class="m-auto">
              <p class="text-gray-400">Expenses</p>
              <p class="text-xl text-primary">$1200</p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
