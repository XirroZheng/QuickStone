.<template>
  <Breadcrumbs parentTitle="朋友" needSearch="true" />
  <div class="container mx-auto">

    <div class="grid grid-cols-12 gap-5">
      <div v-for="(obj, index) in 8" :key="index" class="
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
  <div class="mt-5 flex justify-center">
    <button class="bg-purple-300 text-white px-4 py-1 rounded-md whitespace-nowrap"
      @click="showNewAddFriendModal = true">
      添加合作者
    </button>
  </div>

  <AddFriend v-if="showNewAddFriendModal" @close="showNewAddFriendModal = false" />
</template>

<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { ref } from 'vue'
import AddFriend from '../../components/AddFriend.vue'
import request from '../../utils/axios'
const showNewAddFriendModal = ref(false)
const username = localStorage.getItem('username')

const getFriends = () => {
  request({
    url: '/storage/user/getfriends',
    method: 'POST',
    data: {
      user_name: username
    }
  }).then(res => {
    console.log(res)
  })
}
getFriends();


</script>

<style></style>