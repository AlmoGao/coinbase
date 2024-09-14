<!-- 合约 -->
<template>
    <div class="page-contract">
        <div class="top">
            <van-icon @click="router.back" class="back" name="arrow-left" />
            <div class="navs">
                <div @click="tab=1" class="nav" :class="{'active-nav':tab==1}">{{ _t('22') }}</div>
                <div @click="tab=2" class="nav" :class="{'active-nav':tab==2}">{{ _t('23') }}</div>
            </div>
            <span></span>
        </div>
        
        <!-- 交易 -->
        <div v-show="tab==1">
            <div class="select">
                <!-- 币种 -->
                <van-dropdown-menu class="coin-select">
                    <van-dropdown-item @change="changeCoin" v-model="coin" :options="contract" />
                </van-dropdown-menu>
                <div class="t-box">
                    <div class="t-select" @click="changeT(item)" :class="{'active-t': item.value == t}" v-for="(item, i) in tOptions" :key="i">{{ item.text }}</div>
                </div>
            </div>

            <div id="chart" style="height: 64vw;"></div>

            <Bet :buy_money="buy_money" :trade_contract_id="trade_contract_id" :coin="coin" />
        </div>

        <!-- 交易 -->
        <template v-if="tab==2">
            <Warehouse />
        </template>

        
    </div>
</template>

<script setup>
import { init } from 'klinecharts'
import { onMounted, ref, computed } from 'vue'
import klineOption from './klineOption.js'
import Bet from './Bet.vue'
import router from '@/router'
import Warehouse from './Warehouse.vue'
import store from '@/store'
import { _t } from '@/utils/utils'
import { useRoute } from 'vue-router'
import pako from "pako"

const route = useRoute()

const tab = ref(1) // 1-交易 2-持仓
const contract = computed(() => {
    return (store.state.contract || []).map(item => {
        item.text = item.name
        item.value = item.huobi_code
        return item
    })
})

const chart = ref({})




// 币种
const buy_money = ref(0) // 当前价格
const coin = ref('btcusdt')
console.error(contract.value)
if (contract.value[0]) {
    coin.value = contract.value[0].huobi_code
}
if (route.query.contract_name) coin.value = route.query.contract_name

const changeCoin = () => {
    setTimeout(() => {
        initWS(coin.value, t.value)
    }, 0)
}
const trade_contract_id = computed(() => {
    const target = contract.value.find(item => item.value == coin.value)
    return route.query.id || (target ? target.id : '')
})

// 粒度
const t = ref('5min')
const tOptions = ref([
    // { text: 'Second', value: '1s' },
    // { text: '1min', value: '1min' },
    { text: '5min', value: '5min' },
    { text: '15min', value: '15min' },
    { text: '30min', value: '30min' },
    { text: 'Day', value: '1day' },
])
const PTMap = {
    "5min": "PT5M",
    "15min": "PT15M",
    "30min": "PT30M",
    "1day": "P1D",
}
const changeT = item => {
    t.value = item.value
    setTimeout(() => {
        initWS(coin.value, t.value)
    }, 0)
}

const handleData = str => {
    const data = JSON.parse(str)
    if (data.ping) return socketK.value.send(JSON.stringify({ "pong": data.ping }))
    if (data.status === "ok") return
    if (!data.tick) return
    const d = {
        timestamp: data.tick.id * 1000,
        open: data.tick.open,
        close: data.tick.close,
        high: data.tick.high,
        low: data.tick.low,
        volume: data.tick.vol,
        turnover: data.tick.count
    }
    buy_money.value = d.close
    chart.value.updateData(d)
}

const socketK = ref(null)
const hburl = "wss://api.huobi.pro/ws"
const initWS = (key = 'btcusdt', t = '5min') => {
    if (socketK.value) socketK.value.close()
    chart.value.applyNewData([])
    const params = {
        sub: `market.${key.toLowerCase()}.kline.${t}`
    }
    // 请求历史数据
    // const item = contract.value.find(item => item.huobi_code.toUpperCase() == key.toUpperCase()) || {}
    const url = `https://api.huobi.pro/market/history/kline?symbol=${key.toLowerCase()}&period=${t}&size=100`
    // const url = `https://api.investing.com/api/financialdata/${id}/historical/chart/?interval=${PTMap[t]}&pointscount=160`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                const klineData = data.data.map(item => {
                    return {
                        timestamp: item.id * 1000,
                        open: item.open,
                        close: item.close,
                        high: item.high,
                        low: item.low,
                        volume: item.vol,
                        turnover: item.count
                    }
                }).reverse();
                buy_money.value = klineData[klineData.length - 1].close
                let num = 2
                try {
                    num = buy_money.value.toString().split('.')[1].length || 0
                } catch {
                    num = 2
                }
                chart.value.setPriceVolumePrecision(num, 2)
                chart.value.applyNewData(klineData)
            } else {
                console.error('获取历史K线数据失败:', data);
            }
        })
        .catch(error => {
            console.error('请求失败:', error);
        });
    socketK.value = new WebSocket(hburl)
    socketK.value.onopen = () => {
        console.log("connection establish");
        socketK.value.send(JSON.stringify(params))
    }
    socketK.value.onmessage = (event) => {
        let blob = event.data;
        let reader = new FileReader();
        reader.onload = function (e) {
            let ploydata = new Uint8Array(e.target.result);
            let msg = pako.inflate(ploydata, { to: "string" });
            handleData(msg)
        };
        reader.readAsArrayBuffer(blob, "utf-8");
    }
}

onMounted(() => {
    chart.value = init(`chart`)

    // chart.value.applyNewData([
    //     { close: 4976.16, high: 4977.99, low: 4970.12, open: 4972.89, timestamp: 1587660000000, volume: 204 },
    //     { close: 4977.33, high: 4979.94, low: 4971.34, open: 4973.20, timestamp: 1587660060000, volume: 194 },
    //     { close: 4977.93, high: 4977.93, low: 4974.20, open: 4976.53, timestamp: 1587660120000, volume: 197 },
    //     { close: 4966.77, high: 4968.53, low: 4962.20, open: 4963.88, timestamp: 1587660180000, volume: 28 },
    //     { close: 4961.56, high: 4972.61, low: 4961.28, open: 4961.28, timestamp: 1587660240000, volume: 184 },
    //     { close: 4964.19, high: 4964.74, low: 4961.42, open: 4961.64, timestamp: 1587660300000, volume: 191 },
    //     { close: 4968.93, high: 4972.70, low: 4964.55, open: 4966.96, timestamp: 1587660360000, volume: 105 },
    //     { close: 4979.31, high: 4979.61, low: 4973.99, open: 4977.06, timestamp: 1587660420000, volume: 35 },
    //     { close: 4977.02, high: 4981.66, low: 4975.14, open: 4981.66, timestamp: 1587660480000, volume: 135 },
    //     { close: 4985.09, high: 4988.62, low: 4980.30, open: 4986.72, timestamp: 1587660540000, volume: 76 }
    // ])

    chart.value.setStyles(klineOption)

    initWS(coin.value, t.value)
})
</script>

<style lang="less" scoped>
.page-contract {
    background-color: #20222c;
    padding-top: 8vw;
    color: #fff;
    min-height: 100vh;
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4vw;
        color: #fff;
        font-size: 3.2vw;
        height: 8vw;
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        background-color: #20222c;
        z-index: 9;
        .back {
            font-size: 4vw;
        }
        .navs {
            display: flex;
            align-items: center;
            border-radius: 1vw;
            height: 6vw;
            border: 1px solid #4677d7;
            color: #4677d7;
            .nav {
                width: 20vw;
                display: flex;
                height: 100%;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
            }
            .active-nav {
                background-color: #4677d7;
                color: #fff;
            }
        }
    }

    .select {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4vw 4vw 2vw 1vw;
        .coin-select {
            /deep/ .van-dropdown-menu__bar {
                height: 10vw;
                background-color: rgba(0,0,0,0);
                .van-dropdown-menu__title {
                    color: #fff;
                }
            }
        }
        .t-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .t-select {
                margin-right: 3vw;
            }
            .active-t {
                color: #4677d7;
                border-bottom: 1px solid #4677d7;
            }
        }
    }
}
</style>