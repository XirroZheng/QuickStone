<script setup>
const props = defineProps({
    parentTitle: String,
    subParentTitle: String
})
</script>

<template>
    <div class="breadcrumb flex items-end border-b border-gray-300 pb-4 mb-6">
        <ul>
            <li class="text-xl mr-1 font-semibold mr-2 dark:text-white"><a class="hover:text-gray-800" href=""> {{ props.parentTitle }}</a></li>
        </ul>
    </div>
</template>

