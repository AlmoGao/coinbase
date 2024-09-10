<!-- 添加银行卡 -->
<template>
    <div class="add-card">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="_t('60')" />

        <div class="form">
            <div class="title">{{ _t('61') }}</div>
            <div class="item">
                <input v-model.trim="username" type="text" :placeholder="_t('62')">
            </div>
            <div class="title">{{ _t('63') }}</div>
            <div class="item" @click="show = true">
                <div class="bank">{{ bank_name || _t('64') }}</div>
                <van-icon class="icon" name="arrow-down" />
            </div>
            <!-- <div class="item">
                <input v-model.trim="bank_name" type="text" placeholder="请输入您的银行名称">
            </div> -->
            <div class="title">{{ _t('65') }}</div>
            <div class="item">
                <van-icon class="icon" name="card" />
                <input v-model.trim="bank_card" type="text" :placeholder="_t('66')">
            </div>
        </div>

        <div class="submit">
            <div class="btn" @click="submit" :style="{opacity:loading?'0.5':'1'}">{{ _t('67') }}</div>
        </div>

        <van-action-sheet class="addcard-select-box" v-model:show="show" :title="_t('68')">
            <div class="content">
                <input class="search" type="text" :placeholder="_t('69')">
                <div class="banks">
                    <div @click="choose(item)" class="bank" v-for="(item, i) in bankList" :key="i">{{ item.bank_name }}</div>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref } from 'vue'
import api from '@/api'
import { showToast } from 'vant';
import router from '@/router';
import store from '@/store';
import { _t } from '@/utils/utils'

const show = ref(false)
const username= ref('')
const bank_name = ref('')
const bank_card = ref('')

const choose = item => {
    bank_name.value = item.bank_name
    show.value = false
}

const bankList = ref([])
api.get_bank().then(res => {
    bankList.value = res || []
})


const loading = ref(false)
const submit = () => {
    if (loading.value) return
    if (!username.value) return showToast(_t('70'))
    if (!bank_name.value) return showToast(_t('71'))
    if (!bank_card.value) return showToast(_t('72'))
    if (loading.value) return
    api.add_bank({
        username: username.value,
        bank_name: bank_name.value,
        bank_card: bank_card.value,
    }).then(res => {
        console.error(res)
        if (res.code) {
            showToast(_t('73'))
            store.dispatch('updateUser')
            setTimeout(() => {
                router.back()
            }, 1000)
        } else {
            showToast(res.msg)
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.add-card {
    padding-top: 12vw;
    background-color: #111723;
    min-height: 100vh;
    color: #fff;
    .form {
        padding: 4vw;
        .title {
            margin-bottom: 2vw;
        }
        .item {
            margin-bottom: 2vw;
            height: 11vw;
            border-radius: 1vw;
            background-color: #20222c;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 4vw;
            input {
                flex: 1;
                outline: none;
                border: none;
                background-color: rgba(0,0,0,0);
                text-align: center;
                color: #fff;
            }
            .icon {
                color: #fff;
                font-size: 4vw;
            }
            .bank {
                flex: 1;
                text-align: center;
            }
        }
    }

    .submit {
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
            color: #fff;
            background-color: #4677d7;
            border-radius: 1vw;
            font-size: 3.7vw;
        }
    }
}

</style>

<style lang="less">
.addcard-select-box{
    background-color: #0f1118!important;
    color: #858ea1;
    .content {
        height: 50vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin: 0 6vw;
        .search {
            border: none;
            outline: none;
            background-color: rgba(0,0,0,0);
            padding: 2vw 0;
            border-bottom: 1px solid #555;
            display: block;
        }
        .banks {
            overflow-y: auto;
            flex: 1;
            padding: 2vw 0 4vw 0;
            .bank {
                font-size: 3.7vw;
                line-height: 10vw;
                border-bottom: 1px solid #222;
            }
        }
    }
}</style>