<!-- 个人设置 -->
<template>
    <div class="page-setting">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="_t('114')" />

        <div class="nav" @click="jump('cards')">
            <van-icon class="icon" name="card" />
            <div class="name">{{ _t('115') }}</div>
            <van-icon name="arrow" />
        </div>
        <div class="nav" @click="jump('password', 1)">
            <van-icon class="icon" name="lock" />
            <div class="name">{{ _t('116') }}</div>
            <van-icon name="arrow" />
        </div>
        <div class="nav" @click="checkPass">
            <van-icon class="icon" name="lock" />
            <div class="name">{{ _t('117') }}</div>
            <van-icon name="arrow" />
        </div>

        <div class="loginout">
            <div class="btn" @click="loginout">{{ _t('118') }}</div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue'
import router from '@/router'
import api from '@/api'
import store from '@/store'
import { showToast } from 'vant'
import { _t } from '@/utils/utils'


const jump = (name, id) => {
    router.push({
        name,
        query: {
            id: id
        }
    })
}

const loginout = () => {
    api.loginout()
    setTimeout(() => {
        store.commit('setToken', '')
        store.commit('setUserInfo', {})
        router.push({
            name: 'login'
        })
        showToast(_t('119'))
    }, 500)
}

const checkPass = () => {
    if (store.state.userInfo.paypassword) { 
        jump('password', 2) 
    } else {
        jump('passset') 
    }
}
</script>

<style lang="less" scoped>
.page-setting {
    padding-top: 13vw;
    min-height: 100vh;
    background-color: #111723;
    color: #fff;
    .nav {
        display: flex;
        align-items: center;
        padding: 4vw;
        margin: 2vw 0;
        background-color: #20222c;
        align-items: center;
        justify-content: space-between;
        .name {
            font-size: 3.7vw;
            color: #fff;
            flex: 1;
            margin: 0 3vw;
        }
        .icon {
            color: #4677d7;
            font-size: 4vw;
        }
    }

    .loginout {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 15vw;
        background-color: #0f1118;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        .btn {
            width: 92vw;
            height: 10vw;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4677d7;
            border: 1px solid #4677d7;
            border-radius: 1vw;
            font-size: 3.7vw;
        }
    }
}
</style>