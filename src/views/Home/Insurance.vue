<!-- 首页 -->
<template>
    <div class="page-ins">
        <van-swipe class="swiper" :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image">
                <img class="swiper-item" :src="image" />
            </van-swipe-item>
        </van-swipe>
        <van-notice-bar
        style="margin: 2vw;"
            left-icon="volume-o"
            :text="bulletin"
            />

            <div class="list" >
                <div class="item" v-for="(item, i) in products" :key="i" @click="openItem(item)">
                    <div>{{ item.name }}</div>

                    <van-button type="primary" >{{_t('165')}}</van-button>

                    <div>{{_t('124')}}：{{ item.balance }}</div>
                </div>
            </div>
    </div>


    <van-dialog v-model:show="show" title="" show-cancel-button @confirm="confirm">
        <div class="dialog_box">
            <div>{{_t('166')}}：{{userInfo.money}}</div>
            <div class="dialog_ipt">
                <input v-model="money" type="number" :placeholder="_t('167')">
            </div>
        </div>
    </van-dialog>
</template>

<script setup>
import b1 from '@/assets/b1.jpg'
import b2 from '@/assets/b2.jpg'
import b3 from '@/assets/b3.jpg'
import { computed, ref } from 'vue'
import store from '@/store'
import http from "@/api/index"
import { _t } from '@/utils/utils'
import { showToast } from "vant";

const show = ref(false)
const currItem = ref({})
const money = ref('')
const openItem = (item) => {
    if (item.url) return location.href = item.url
    money.value = ''
    currItem.value = item
    show.value = true
}
const confirm = () => {
    console.error(currItem.value.balance, money.value)
    if (!money.value || money.value < 0) return
    if (userInfo.value.money < money.value) return showToast(_t('168'))
    http.buy_product({
        id: currItem.value.id,
        money: money.value
    }).then(res => {
        if (res.code) {
            showToast(res.msg || _t('169'))
            store.dispatch('updateUser')
                http.product().then(res2 => {
                    if (!res2) return
                    store.commit('setProducts', res2 || [])
                })
        }
    })
}


const userInfo = computed(() => store.state.userInfo || {})

const images = ref([
b1,b2,b3
])

http.carousel({type: 0}).then(res => {
    if (res && res.length) {
        images.value = res
    }
})

const homeData = computed(() => store.state.homeData || {})
const products = computed(() => store.state.products || [])

const bulletin = computed(() => {
    let val = ''
    homeData.value.bulletin.forEach(item => {
        val += item.content + '   '
    })
    return val
})
</script>

<style lang="less" scoped>
.page-ins {
    padding-bottom: 15vw;
    padding-top: 5vw;
    .swiper {
        width: 94vw;
        height: 40vw;
        margin: 2vw auto 4vw auto;
        border-radius: 2vw;
        .swiper-item {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .list {
        padding: 4vw;
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2vw 4vw;
            background-color: rgba(0,0,0,0.5);
            margin-bottom: 4vw;
            border-radius: 2vw;
            color: #fff;
        }
    }
}
.dialog_box  {
    padding: 4vw;
    .dialog_ipt {
        margin-top: 4vw;
        height: 10vw;
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        input {
            flex: 1;
            height: 100%;
            background-color: rgba(0,0,0,0);
            border: none;
            outline: none;
            text-align: center;
        }
    }
}
</style>