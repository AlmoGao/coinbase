<!-- 充值 -->
<template>
    <div class="page-recharge">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="_t('109')" />
        <img @click="goServer" class="server" src="@/assets/server.svg" alt="">

        <div style="text-align: center;padding-top:30vw;font-size: 3.7vw;">{{ _t('157') }}</div>

<!-- 

        <div class="coins">
            <div class="coin" @click="code=item.code" :class="{'active-coin':code==item.code}" v-for="(item, i) in list" :key="i">
                <span>{{ item.code }}</span>
                <span class="percent">{{ item.exchange_rate }}</span>
            </div>
        </div>
        <div class="ipt">
            <input v-model="usdt_num" type="number" :placeholder="_t('110')">
            <span>USDT</span>
        </div>
        
        <div class="ipt">
            <input v-model="money" type="text" disabled :placeholder="_t('111')">
            <span>{{ curr.code || '--' }}</span>
        </div>

        <div class="submit">
            <div class="btn" :style="{opacity:loading?'0.5':'1'}" @click="submit">{{ _t('112') }}</div>
        </div> -->
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { goServer } from '@/utils/utils'
import api from '@/api'
import { ref, computed } from 'vue'
import { showToast } from 'vant';
import router from '@/router';
import store from '@/store'
import { _t } from '@/utils/utils'

const curr = computed(() => {
    return list.value.find(item => item.code == code.value) || {}
})
const usdt_num = ref('')
const money = computed(() => {
    let val = ''
    if (usdt_num.value) {
        val = (usdt_num.value * curr.value.exchange_rate).toFixed(2)
    }
    return val
})
const code = ref('')
const list = ref([])
api.get_rate().then(res => {
    list.value = res
    if (res[0]) code.value = res[0].code
})

const loading = ref(false)
const submit = () => {
    if (loading.value) return
    if (!usdt_num.value) return showToast(_t('113'))
    loading.value = true
    api.recharge({
        usdt_num: usdt_num.value,
        money: money.value,
        code: code.value
    }).then(res => {
        console.error(res)
        showToast(res.msg)
        if (res.code) {
            usdt_num.value = ''
            store.dispatch('updateUser')
            // router.back()
        }
    }).finally(() => {
        loading.value = false
    })
}

</script>

<style lang="less" scoped>
.page-recharge {
    padding-top: 11vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100vh;
    background-color: #111723;
    color: #fff;
    .server {
        position: fixed;
        z-index: 99;
        top: 2vw;
        right: 4vw;
        width: 5vw;
        width: 5vw;
    }
    .nodata {
        line-height: 100vw;
        text-align: center;
    }
    .tr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4vw;
        height: 8vw;
    }
    .th {
        background-color: #20222c;
        margin-bottom: 1vw;
        .val {
            color: #fff;
            font-size: 4vw;
        }
    }
    .list {
        flex: 1;
        overflow-y: auto;
    }

    .coins {
        white-space: nowrap;
        margin: 12vw 4vw 2vw 4vw;
        width: 100%;
        overflow-x: auto;
        padding: 0 4vw 4vw 4vw;
        .coin  {
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
            background-color: rgba(0,0,0,0);
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
}
</style>