<!-- 持仓 -->
<template>
    <div class="page-warehouse">
        <div class="ware-tabs">
            <div class="tab" :class="{'active-tab':active==0}" @click="getList(0)">{{ _t('24') }}</div>
            <div class="tab" :class="{'active-tab':active==1}" @click="getList(1)">{{ _t('25') }}</div>
        </div>
        <div class="list">
            <div class="tr">
                <div class="td">{{ _t('26') }}</div>
                <div class="td flex2">{{ _t('27') }}</div>
                <div class="td">{{ _t('28') }}</div>
                <div class="td flex2" v-if="active==1">{{ _t('29') }}</div>
                <div class="td" v-if="active==1">{{ _t('30') }}</div>
                <div class="td" v-if="active==0"></div>
            </div>
            <div class="tr" v-for="(item, i) in list" :key="i">
                <div class="td">{{ item.trade_contract_id }}</div>
                <div class="td flex2">
                    {{ item.buy_time_text }}
                    <div>{{ item.buy_money }}</div>
                </div>
                <div class="td">
                    {{ item.margin }}
                    <div style="margin-left:2px;" :style="{color:item.ud == 0 ? '#ec5352' : '#4ca84b'}">{{ item.ud == 0 ? _t('160') : _t('161') }}</div>
                </div>
                <div class="td flex2" v-if="active==1">
                    {{ item.sell_time_text }}
                    <div>{{ item.sell_money }}</div>
                </div>
                <div class="td" v-if="active==1" :class="item.wl > 0 ? 'up' : 'down'">{{ item.wl > 0 ? '+' : '' }} {{ item.wl }}</div>
                <div class="td" v-if="active==0">{{ item.timedown ? item.timedown + 's' : '--' }}</div>
            </div>
            <div class="nodata" v-if="(!list.length && !loading)">{{ _t('31') }}</div>
            <div class="nodata" v-if="(!list.length && loading)">{{ _t('32') }}...</div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api'
import { ref, onMounted, onUnmounted } from 'vue'
import { _t } from '@/utils/utils'

const active = ref(0)

const loading = ref(false)
const list = ref([])
const getList = (status) => { // 类型:0=持仓,1=到期平仓
    if (loading.value) return
    loading.value = true
    active.value = status
    list.value = []
    api.get_contract_order({
        status
    }).then(res => {
        list.value = res || []
        calcTimedown()
    }).finally(() => {
        loading.value = false
    })
}
getList(0)

const calcTimedown = () => {
    const now = Date.now() / 1000
        list.value.forEach(item => {
            let t = item.buy_time + item.second - now
            t = parseInt(t)
            if (t === 0) {
                setTimeout(() => {
                    getList(0)
                }, 1000)
            }
            if (t <= 0) t = null
            item.timedown = t
        })
}

let interval = null
onMounted(() => {
    interval = setInterval(() => {
        calcTimedown()
    }, 1050)
})
onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<style lang="less" scoped>
.page-warehouse {
    height: calc(100vh - 8vw);
    background-color: #0f1118;
    color: #858ea1;
    display: flex;
    flex-direction: column;
    .ware-tabs {
        height: 15vw;
        background-color: #20222c;
        padding: 4vw 20vw 0 20vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tab {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .active-tab {
            border-bottom: 1px solid #4677d7;
            color: #4677d7;
            font-size: 3.7vw;
            
        }
    }
    .list {
        flex: 1;
        overflow-y: auto;
        .nodata {
            line-height: 50vw;
            text-align: center;
        }
        .tr {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 10vw;
            padding: 1vw 2vw;
            border-bottom: 1px solid #333;
            .td {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
            .flex2 {
                flex: 2;
                display: flex;
                font-size: 3.2vw;
                flex-direction: column;
                div {
                    margin-top: 1vw;
                    font-size: 3.7vw;
                    color: #ccc;
                }
            }
        }
    }
}
</style>