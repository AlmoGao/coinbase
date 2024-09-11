<!-- 登录 -->
<template>
    <div class="page-login">

        <!-- <div class="lang-box" @click="goLang">
            <van-icon style="margin-right: 1vw;" name="location-o" class="icon" />
            Language
        </div> -->

        <img style="height:15vh;display: block;margin: 0 auto 10vh auto;opacity: 0" src="@/assets/set.png" />

        <van-field class="item" clearable v-model="form.account" label="" left-icon="friends-o" :placeholder="_t('139')" />
        <van-field class="item" clearable :type="'password'" v-model="form.password" label="" left-icon="lock" :placeholder="_t('140')" />
        <!-- <div class="fogot">{{ _t('141') }}?</div> -->
        
        <van-button class="item btn"  type="primary" block @click="login"
            :style="{ 'opacity': loading ? '0.5' : '1' }">{{ _t('143') }}</van-button>
        <div class="link" @click="jump('register')">----{{ _t('142') }}----</div>
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
    account: '',
    password: ''
})

const loading = ref(false)

const login = () => {
    if (loading.value) return
    if (!form.value.account) return showToast(_t('144'))
    if (!form.value.password) return showToast(_t('145'))
    loading.value = true
    api.login(form.value).then(res => {
        if (!res) return
        store.commit('setUserInfo', res.userinfo)
        store.commit('setToken', res.userinfo.token)
        showToast(_t('146'))
        setTimeout(() => {
            router.push({
                name: 'insurance'
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
    max-width: 800px;
    margin: 0 auto;
    height: 100vh;
    background-image: url('../../assets/bg.jpg');
    background-size: 100% 100%;
    overflow-y: auto;
    padding-top: 10vh;

    .logo {
        width: calc(50 * var(--vw));
        margin: 0 auto calc(15 * var(--vw)) auto;
        display: block;
    }

    .item {
        opacity: 0.9;
        width: 80%;
        border-radius: calc(5 * var(--vw));
        margin: calc(6 * var(--vw)) auto;
        background-color: #afafaf;
        color: #fff;
        /deep/ .van-field__control {
            text-align: center;
            color: #fff;
            &::placeholder {
                color: #fff;
            }
        }
    }
    .btn {
        background-color: #000;
        border: none;
    }
    .link {
        text-align: center;
        color: #000;
        font-weight: bold;
        margin-top: calc(4 * var(--vw));
    }
    .fogot {
        width: 90%;
        margin: calc(4 * var(--vw)) auto;
        text-align: right;
        color: #4677d7;
    }
}
</style>