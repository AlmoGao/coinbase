<!-- 页面容器 -->
<template>
    <div class="page-layout">
        <router-view/>
        <Bottom v-show="showBottom" />
    </div>
</template>

<script setup>
import Bottom from '@/components/Bottom.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bottomRoute = [ 'home', 'my', 'fund' ]
const showBottom = computed(() => {
    return bottomRoute.includes(route.name)
})
</script>