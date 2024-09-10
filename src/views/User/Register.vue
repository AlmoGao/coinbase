<!-- 注册 -->
<template>
    <div class="page-login page-register">
        <!-- <div class="lang-box" @click="goLang">
            <van-icon style="margin-right: 1vw;" name="location-o" class="icon" />
            Language
        </div> -->

        <!-- <img class="logo" src="@/assets/logo.jpg" alt=""> -->
        <img style="height:15vh;display: block;margin: 0 auto 10vh auto;opacity: 0;" src="@/assets/set.png" />

        <van-field class="item" clearable v-model="form.username" label="" left-icon="friends-o" :placeholder="_t('139')" />
        <van-field class="item" clearable :type="'password'" v-model="form.password" label="" left-icon="lock"
            :placeholder="_t('140')" />
        <van-field class="item" clearable :type="'password'" v-model="form.password2" label="" left-icon="lock"
            :placeholder="_t('147')" />
        <van-field class="item" clearable v-model="form.invite_code" label="" left-icon="friends-o" :placeholder="_t('151')" />
        
        <van-button class="item btn" type="primary" block @click="register"
            :style="{ 'opacity': loading ? '0.5' : '1' }">{{ _t('149') }}</van-button>
        <div class="link" @click="jump('login')">----{{ _t('148') }}----</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { jump } from '@/utils/utils'
import api from '@/api'
import { showToast } from 'vant'
import store from '@/store';
import router from '@/router';
import { _t } from '@/utils/utils'

const form = ref({
    username: '',
    password: '',
    password2: '',
    invite_code: ''
})

const loading = ref(false)

const register = () => {
    if (loading.value) return
    if (!form.value.username) return showToast(_t('144'))
    if (!form.value.password) return showToast(_t('145'))
    if (form.value.password != form.value.password2) return showToast(_t('150'))
    // if (!form.value.invite_code) return showToast(_t('151'))
    loading.value = true
    api.register(form.value).then(res => {
        console.error(res)
        if (!res) return
        store.commit('setUserInfo', res.userinfo)
        store.commit('setToken', res.userinfo.token)
        showToast(_t('152'))
        setTimeout(() => {
            router.push({
                name: 'home'
            })
        }, 1000)
    }).finally(() => {
        loading.value = false
        setTimeout(() => {
            loading.value = false
        }, 1000)
    })
}


const goLang = () => {
    router.push({
        name: 'lang'
    })
}
</script>

<style lang="less" scoped>
.lang-box {
    position: fixed;
    z-index: 9;
    top: calc(2 * var(--vw));
    right: calc(4 * var(--vw));
    display: flex;
    align-items: center;
}
.page-login {
    height: 100vh;
    background-image: url('../../assets/bg.jpg');
    background-size: 100% 100%;
    overflow-y: auto;
    padding-top: 10vh;
    max-width: 800px;
    margin: 0 auto;

    .logo {
        width: calc(50 * var(--vw));
        margin: 0 auto calc(15 * var(--vw)) auto;
        display: block;
    }

    .item {
        opacity: 0.9;
        width: 90%;
        border-radius: 2px;
        margin: calc(3 * var(--vw)) auto;
        box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        color: #000;

        /deep/ .van-field__control {
            text-align: center;
            &::placeholder {
                color-scheme: #333;
            }
        }
    }
    .btn {
        background-color: #000;
        color: #fff;
    }

    .link {
        text-align: center;
        color: #000;
        font-weight: bold;
        width: 90%;
        margin: calc(4 * var(--vw)) auto 0 auto;
    }

    .fogot {
        width: 90%;
        margin: calc(4 * var(--vw)) auto;
        text-align: right;
        color: #4677d7;
    }
}</style>