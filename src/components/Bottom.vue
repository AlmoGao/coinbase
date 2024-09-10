<!-- 底部导航 -->
<template>
    <div class="bottom">
        <div class="bottom-tab" :class="{ 'curr-tab': route.name == item.route }" v-for="(item, i) in navs" @click="jump(item)" :key="i">
            <van-icon v-if="item.icon" style="font-size:calc(6 * var(--vw));" :name="item.icon" />
            <img v-if="item.myIcon" :src="item.myIcon" />
            <span>{{ item.title }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { _t, goServer } from '@/utils/utils'
import serverPng from "@/assets/server.svg"

const route = useRoute()
const router = useRouter()
const store = useStore()
const token = computed(() => store.state.token)

const navs = computed(() => {
    return [
        { title: _t('1'), route: 'home', icon: 'wap-home' },
        { title: _t('162'), route: '', icon: '', myIcon: serverPng, type: 'server' },
        { title: _t('3'), route: 'contract', icon: 'gold-coin' },
        { title: _t('4'), route: 'my', icon: 'manager' }
    ]
})

const jump = item => {
    if (item.type == 'server') {
        return goServer()
    }
    let route = item.route
    router.push({
            name: route,
            query: {
                title: item.title
            }
        })
}
</script>

<style lang="less" scoped>
.bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 12vw;
    padding: 2.2vw 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    color: #666;
    .bottom-tab {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        img {
            height: 5.5vw;
        }
    }
    .curr-tab {
        color: #4677d7;
    }
}
</style>