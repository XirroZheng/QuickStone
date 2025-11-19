<script setup>
import {
    dashboardOne,
    dashboardBuckets,
    splineAreaWidgetTwo,
    splineAreaWidgetThree,
} from '@/data/dashboard.v1.js'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { ref } from 'vue'
import request from '../../utils/axios'

const bucketCount = ref(0)
const friendCount = ref(0)
const usedSpace = ref(0)
const monthCost = ref(0)
const bucketUsage = ref({})
const bucketSeries = ref([])
const bucketLabels = ref([])
const colors = ref([])


function getColorsByBucketUsage (bucketUsage) {
    const buckets = Object.entries(bucketUsage).map(([name, used]) => ({ name, used }))


    const sortedIndexes = buckets
        .map((b, i) => ({ i, used: b.used }))
        .sort((a, b) => a.used - b.used)
        .map(item => item.i)

    const colors = []
    for (let i = 0; i < buckets.length; i++) {
        const idx = sortedIndexes.indexOf(i)
        colors.push(baseColors[idx] || '#ccc')
    }
    return colors
}



const getUserAudit = () => {
    request({
        url: '/user/audit',
        method: 'POST',
        data: {
            user_name: localStorage.getItem('username'),
        }
    }).then((res) => {
        if (res.data.status_code === 0) {
            bucketUsage.value = res.data.bucket_usage
            bucketCount.value = Object.keys(bucketUsage.value).length
            usedSpace.value = res.data.storage_used
            bucketSeries.value = Object.values(bucketUsage.value)
            bucketLabels.value = Object.keys(bucketUsage.value)
            colors.value = getColorsByBucketUsage(bucketUsage.value)
        }
    }).catch((err) => {
        console.log(err)
    })
}
getUserAudit();


</script>

<template>
    <div class="container mx-auto">
        <Breadcrumbs parentTitle="Dashboard" />
        <div class="grid grid-cols-12 gap-5">
            <div class="
                    col-span-12
                    xl:col-span-3
                    lg:col-span-6
                    md:col-span-6
                    sm:col-span-6
                ">
                <BaseCard>
                    <div class="flex align-center">
                        <i class="i-Checkout-Basket text-6xl text-purple-200"></i>
                        <div class="m-auto">
                            <p class="text-gray-400">桶数量</p>
                            <p class="text-xl text-primary">{{ bucketCount }}</p>
                        </div>
                    </div>
                </BaseCard>
            </div>
            <div class="
                    col-span-12
                    xl:col-span-3
                    lg:col-span-6
                    md:col-span-6
                    sm:col-span-6
                ">
                <BaseCard>
                    <div class="flex align-center">
                        <i class="i-Financial text-6xl text-purple-200"></i>
                        <div class="m-auto">
                            <p class="text-gray-400">已使用空间</p>
                            <p class="text-xl text-primary">{{ usedSpace }}</p>
                        </div>
                    </div>
                </BaseCard>
            </div>
            <div class="
                    col-span-12
                    xl:col-span-3
                    lg:col-span-6
                    md:col-span-6
                    sm:col-span-6
                ">
                <BaseCard>
                    <div class="flex align-center">
                        <i class="i-Add-User text-6xl text-purple-200"></i>
                        <div class="m-auto">
                            <p class="text-gray-400">好友</p>
                            <p class="text-xl text-primary">{{ friendCount }}</p>
                        </div>
                    </div>
                </BaseCard>
            </div>
            <div class="
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
                            <p class="text-gray-400">本月花费</p>
                            <p class="text-xl text-primary">{{ monthCost }}</p>
                        </div>
                    </div>
                </BaseCard>
            </div>
            <div class="col-span-12 xl:col-span-8 md:col-span-6">
                <BaseCard>
                    <h4 class="card-title mb-4">花费记录</h4>
                    <apexchart type="bar" height="255" :options="dashboardOne.chartOptions"
                        :series="dashboardOne.series"></apexchart>
                </BaseCard>
            </div>
            <div class="col-span-12 xl:col-span-4 md:col-span-6">
                <BaseCard>
                    <h4 class="card-title mb-4">空间使用情况</h4>
                    <apexchart type="pie" height="290" :options="dashboardBuckets.chartOptions" :series="bucketSeries"
                        :labels="bucketLabels" :colors="colors"></apexchart>
                </BaseCard>
            </div>
            <div class="
                    col-span-12
                    xl:col-span-3
                    lg:col-span-3
                    md:col-span-6
                    sm:col-span-6
                ">
                <BaseCard noPadding class="overflow-hidden">
                    <div class="p-5">
                        <div class="text-gray-500">上传高峰</div>
                        <p class="text-primary text-2xl m-0">$40250</p>
                    </div>
                    <div id="basicArea-chart">
                        <apexchart type="area" height="270" :options="splineAreaWidgetTwo.chartOptions"
                            :series="splineAreaWidgetTwo.series" />
                    </div>
                </BaseCard>
            </div>

            <div class="
                    col-span-12
                    xl:col-span-3
                    lg:col-span-3
                    md:col-span-6
                    sm:col-span-6
                ">
                <BaseCard noPadding class="overflow-hidden">
                    <div class="p-5">
                        <div class="text-gray-500">下载高峰</div>
                        <p class="text-warning text-2xl m-0">$10250</p>
                    </div>
                    <div id="basicArea-chart">
                        <apexchart type="area" height="270" :options="splineAreaWidgetThree.chartOptions"
                            :series="splineAreaWidgetThree.series" />
                    </div>
                </BaseCard>
            </div>

            <div class="col-span-12 xl:col-span-6 lg:col-span-6">
                <BaseCard>
                    <div class="card-title mb-4">热点数据</div>

                    <div class="flex flex-col items-center mb-4 md:flex-row">
                        <img class="avatar-md mr-2 rounded w-20 h-20" src="/images/products/headphone-4.jpg" alt="" />
                        <div class="flex-grow text-center md:text-left">
                            <h5>
                                <router-link to="" class="text-gray-800 hover:text-primary">
                                    Wireless Headphone E23
                                </router-link>
                            </h5>
                            <p class="text-gray-400 text-xs mb-3 md:mb-0">
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <div class="
                                    flex
                                    justify-center
                                    mb-4
                                    md:justify-start md:mb-0
                                ">
                                <p class="text-primary text-sm mr-2">$450</p>
                                <p class="
                                        text-gray-400
                                        line-through
                                        text-sm
                                        mr-2
                                    ">
                                    $500
                                </p>
                            </div>
                        </div>
                        <BaseBtn sm class="
                                border border-primary
                                text-primary
                                rounded-full
                                hover:bg-primary hover:text-white
                            ">查看</BaseBtn>
                    </div>
                    <div class="flex flex-col items-center mb-4 md:flex-row">
                        <img class="avatar-md mr-2 rounded w-20 h-20" src="/images/products/headphone-4.jpg" alt="" />
                        <div class="flex-grow text-center md:text-left">
                            <h5>
                                <router-link to="" class="text-gray-800 hover:text-primary">
                                    查看
                                </router-link>
                            </h5>
                            <p class="text-gray-400 text-xs mb-3 md:mb-0">
                                查看
                            </p>
                            <div class="
                                    flex
                                    justify-center
                                    mb-4
                                    md:justify-start md:mb-0
                                ">
                                <p class="text-primary text-sm mr-2">$450</p>
                                <p class="
                                        text-gray-400
                                        line-through
                                        text-sm
                                        mr-2
                                    ">
                                    $500
                                </p>
                            </div>
                        </div>
                        <BaseBtn sm class="
                                border border-primary
                                text-primary
                                rounded-full
                                hover:bg-primary hover:text-white
                            ">View Details</BaseBtn>
                    </div>
                    <div class="flex flex-col items-center mb-4 md:flex-row">
                        <img class="avatar-md mr-2 rounded w-20 h-20" src="/images/products/headphone-4.jpg" alt="" />
                        <div class="flex-grow text-center md:text-left">
                            <h5>
                                <router-link to="" class="text-gray-800 hover:text-primary">
                                    Wireless Headphone E23
                                </router-link>
                            </h5>
                            <p class="text-gray-400 text-xs mb-3 md:mb-0">
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                            <div class="
                                    flex
                                    justify-center
                                    mb-4
                                    md:justify-start md:mb-0
                                ">
                                <p class="text-primary text-sm mr-2">$450</p>
                                <p class="
                                        text-gray-400
                                        line-through
                                        text-sm
                                        mr-2
                                    ">
                                    $500
                                </p>
                            </div>
                        </div>
                        <BaseBtn sm class="
                                border border-primary
                                text-primary
                                rounded-full
                                hover:bg-primary hover:text-white
                            ">View Details</BaseBtn>
                    </div>
                </BaseCard>
            </div>
            <div class="
                    col-span-12
                    xl:col-span-3
                    lg:col-span-3
                    md:col-span-6
                    sm:col-span-6
                ">
            </div>
            <div class="
                    col-span-12
                    xl:col-span-3
                    lg:col-span-3
                    md:col-span-6
                    sm:col-span-6
                ">

            </div>
            <div class="col-span-12">
            </div>
        </div>
    </div>
</template>
