<!-- 修改密码 -->
<template>
    <div class="page-password">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="id == 1 ? _t('100') : _t('101')" />

        <div class="form">
            <div class="item">
                <van-icon class="icon" name="lock" />
                <input v-model.trim="oldpassword" type="password" :placeholder="_t('102')">
            </div>
            <div class="item">
                <van-icon class="icon" name="lock" />
                <input v-model.trim="newpassword" type="password" :placeholder="_t('103')">
            </div>

            <div class="item btn" @click="submit" :style="{opacity:loading?'0.5':'1'}">{{ _t('104') }}</div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import api from '@/api'
import { showToast } from 'vant';
import { ref, computed } from 'vue'
import store from '@/store';
import router from '@/router';
import { useRoute } from 'vue-router'
import { _t } from '@/utils/utils'

const route = useRoute()
const id = route.query.id
const userInfo = computed(() => store.state.userInfo || {})

const oldpassword = ref('')
const newpassword = ref('')

const loading = ref(false)
const submit = () => {
    if (loading.value) return
    if (!oldpassword.value) return showToast(_t('105'))
    if (!newpassword.value) return showToast(_t('106'))
    if (oldpassword.value == newpassword.value) return showToast(_t('107'))
    loading.value = true
    api.resetpwd({
        username: userInfo.value.username,
        oldpassword: oldpassword.value,
        newpassword: newpassword.value,
        type: id, // 类型:1=登录密码,2=资金密码
    }).then(res => {
        if (res.code) {
            showToast(_t('108'))
            router.back()
        } else {
            showToast(res.msg)
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.page-password {
    min-height: 100vh;
    background-color: #111723;
    color: #fff;
    padding-top: 25vw;
    .form {
        margin: 0 4vw 0 4vw;
        .item {
            height: 11vw;
            border-radius: 1vw;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 6vw;
            margin: 4vw 0;
            background-color: #20222c;
            input {
                flex: 1;
                outline: none;
                border: none;
                margin-left: 4vw;
                font-size: 3.7vw;
                background-color: rgba(0,0,0,0);
                text-align: center;
            }
            .icon {
                font-size: 4.2vw;
            }
        }

        .btn {
            color: #000;
            background-color: #4677d7;
            margin-top: 8vw;
            font-size: 3.7vw;
        }
    }
}
</style>