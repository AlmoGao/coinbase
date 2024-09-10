<!-- 顶部 -->
<template>
    <div class="top" :style="{ color: props.color, backgroundColor: props.bgColor }">
        <van-icon @click="back" class="back" name="arrow-left" />
        <span>{{ props.title || '' }}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    bgColor: {
        type: String,
        default: '#fff'
    },
    color: {
        type: String,
        default: '#000'
    },
    backFunc: {
        type: Function
    }
})

const back = () => {
    if (props.backFunc) return props.backFunc()
    router.back()
}
</script>

<style lang="less" scoped>
.top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4.2vw;
    z-index: 9;
    .back {
        position: absolute;
        left: 2vw;
        font-size: 5vw;
    }
}
</style>