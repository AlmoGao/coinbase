<!-- 我的银行卡 -->
<template>
    <div class="page-cards">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="_t('74')" />

        <div class="card" v-if="card">
            <div class="logo"></div>
            <div class="content">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span>{{ card.bank_name }}</span>
                    <span style="font-weight: 400;">{{ _t('75') }}：{{ card.username }}</span>
                </div>
                <div>{{ card.bank_card }}</div>
            </div>
        </div>

        <div class="no-card" @click="goAdd" v-if="!card">
            <van-icon class="icon" name="add-square" />
            <span>{{ _t('76') }}</span>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import router from '@/router'
import { computed } from 'vue'
import store from '@/store'
import { _t } from '@/utils/utils'

const userInfo = computed(() => store.state.userInfo || {})
const card = computed(() => userInfo.value.bank)

const goAdd = () => {
    router.push({
        name: 'addCard'
    })
}
</script>

<style lang="less" scoped>
.page-cards {
    padding-top: 12vw;
    min-height: 100vh;
    background-color: #111723;
    color: #fff;
    .card {
        margin: 6vw 4vw;
        border-radius: 2vw;
        padding: 4vw;
        background-color: #4677d7;
        color: #fff;
        display: flex;
        align-items: center;
        .logo {
            width: 11vw;
            height: 11vw;
            background-color: #ccc;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 3vw;
        }
        .content {
            flex: 1;
            line-height: 5vw;
            font-weight: bold;
        }
    }

    .no-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vw;
        .icon {
            font-size: 10vw;
            color: #4a4f6b;
        }
    }
}
</style>