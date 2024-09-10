<!-- 提款 -->
<template>
    <div class="page-withdraw">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="_t('127')" />

        <!-- <div class="item">
            <span>币种</span>
            <span class="num">฿</span>
        </div> -->
        <div class="item">
            <span>{{ _t('128') }}</span>
            <span>{{ card && card.bank_name }}</span>
        </div>
        <div class="item">
            <span>{{ _t('129') }}</span>
            <span>{{ card && card.bank_card }}</span>
        </div>

        <div class="coins">
            <div class="coin" @click="code = item.code" :class="{ 'active-coin': code == item.code }" v-for="(item, i) in list"
                :key="i">
                <span>{{ item.code }}</span>
                <span class="percent">{{ item.exchange_rate }}</span>
            </div>
        </div>

        <div class="tip">
            <span>
                <span>{{ _t('130') }}：{{ (card && card.username) }}</span>
                <span style="margin-left:8vw">{{ _t('131') }}：{{ userInfo.money || '--' }} ฿</span>
            </span>
            <span class="btn" @click="money = Number(userInfo.money)">{{ _t('132') }}</span>
        </div>

        <!-- <div class="ipt">
            <input v-model="usdt_num" type="number" :placeholder="_t('133')">
            <span>USDT</span>
        </div> -->
        <div class="ipt">
            <input v-model="money" type="number" :placeholder="_t('134')">
            <span>{{ curr.code || '--' }}</span>
        </div>
        <div class="ipt">
            <input v-model="paypassword" type="password" :placeholder="_t('135')">
        </div>
        
        <div class="ipt">
            <input v-model="remark" type="text" :placeholder="_t('158')">
        </div>
        <div class="submit">
            <div class="btn" @click="submit" :style="{opacity:loading?'0.5':'1'}">{{ _t('136') }}</div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import api from '@/api'
import router from '@/router';
import { ref, computed } from 'vue'
import store from '@/store'
import { showToast } from 'vant'
import { _t } from '@/utils/utils'

const userInfo = computed(() => store.state.userInfo || {})
const card = computed(() => userInfo.value.bank)
const curr = computed(() => {
    return list.value.find(item => item.code == code.value) || {}
})

if (!card.value) {
    router.replace({
        name: 'addCard'
    })
}

const code = ref('')
const list = ref([])
api.get_rate().then(res => {
    list.value = res
    if (res[0]) code.value = res[0].code
})


const usdt_num = ref('')
// const money = computed(() => {
//     let val = ''
//     if (usdt_num.value) {
//         val = (usdt_num.value * curr.value.exchange_rate).toFixed(2)
//     }
//     return val
// })
const money = ref('')
const paypassword = ref('')
const remark = ref('')

const loading = ref(false)
const submit = () => {
    if (loading.value) return
    const params = {
        // usdt_num: usdt_num.value,
        money: money.value,
        code: code.value,
        username: card.value.username,
        bank_name: card.value.bank_name,
        bank_card: card.value.bank_card,
        remark: remark.value,
        paypassword: paypassword.value,
    }
    console.error(params)
    if (!params.money) return
    if (!params.paypassword) return showToast(_t('138'))
    loading.value = true
    api.withdraw(params).then(res => {
        showToast(res.msg)
        if (res.code) {
            usdt_num.value = ''
            paypassword.value = ''
            remark.value = ''
            store.dispatch('updateUser')
            setTimeout(() => {
                router.back()
            }, 1000)
        }
    }).finally(() => {
        loading.value = false
    })
}


</script>

<style lang="less" scoped>
.page-withdraw {
    padding-top: 18vw;
    min-height: 100vh;
    background-color: #111723;
    color: #fff;
    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4vw;
        height: 10vw;

        .num {
            color: #fff;
        }
    }

    .tip {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 4vw;
        height: 10vw;
        margin: 2vw 0;

        .btn {
            color: #4677d7;
            margin-left: 4vw;
        }
    }

    .ipt {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10vw;
        border-radius: 1vw;
        background-color: #101010;
        margin: 4vw 4vw 0 4vw;
        padding: 0 4vw;

        input {
            text-align: center;
            flex: 1;
            border: none;
            outline: none;
            background-color: rgba(0, 0, 0, 0);
            color: #fff;
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

    .coins {
        white-space: nowrap;
        margin: 4vw 4vw 2vw 4vw;
        width: 100%;
        overflow-x: auto;
        padding: 0 4vw 4vw 4vw;

        .coin {
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #ddd;
            font-size: 4.5vw;
            border-radius: 1vw;
            padding: 1vw 4vw;
            margin-right: 4vw;
            border: 1px solid #888;

            .percent {
                color: #aaa;
                font-size: 3.5vw;
                margin-top: 1vw;
            }
        }

        .active-coin {
            background-color: #4677d7;
            border: 1px solid #aaa;

            .percent {
                color: #ccc;
            }
        }
    }
}</style>