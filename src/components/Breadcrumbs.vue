<script setup>
const props = defineProps({
    parentTitle: String,
    subParentTitle: String,
    needSearch: Boolean,
})
</script>

<template>
    <div class="breadcrumb flex items-center border-b border-gray-300 pb-4 mb-6">
        <!-- 左侧面包屑 -->
        <ul class="flex items-center space-x-2">
            <li class="text-xl font-semibold dark:text-white">
                <a class="hover:text-gray-800" href="">{{ props.parentTitle }}</a>
            </li>
            <li v-if="props.subParentTitle" class="text-xl font-semibold dark:text-white">
                / {{ props.subParentTitle }}
            </li>
        </ul>

        <!-- 右侧搜索框 -->
        <div v-if="props.needSearch" class="ml-auto">
            <input type="text" placeholder="搜索..."
                class="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
    </div>
</template>
