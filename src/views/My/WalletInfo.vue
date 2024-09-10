<!-- 钱包详情 -->
<template>
    <div class="page-walletinfo">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="_t('120')" />
        <!-- <div class="page-tabs">
            <div class="page-tab active-tab">全部</div>
            <div class="page-tab">交易</div>
        </div> -->
        <div class="list">
            <div class="tr">
                <div class="td flex2">{{ _t('121') }}</div>
                <div class="td">{{ _t('122') }}</div> 
                <div class="td flex2">{{ _t('123') }}</div>
                <div class="td">{{ _t('124') }}</div>
            </div>
            <div class="tr" v-for="(item, i) in list" :key="i">
                <div class="td flex2">{{ parseTime(item.createtime) }}</div>
                <div class="td" :class="item.money > 0 ? 'up' : 'down'">{{ item.money > 0 ? '+' : '' }} {{ item.money }}</div>
                <div class="td flex2">{{ item.memo }}</div>
                <div class="td">{{ item.after }}</div>
            </div>
            <div class="nodata" v-if="(!list.length && !loading)">{{ _t('125') }}</div>
            <div class="nodata" v-if="(!list.length && loading)">{{ _t('126') }}...</div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref } from 'vue'
import api from '@/api'
import { parseTime } from '@/utils/utils'
import { _t } from '@/utils/utils'

const loading = ref(false)
const list = ref([])

loading.value = true
api.get_money_log().then(res => {
    console.error(res)
    list.value = res || []
}).finally(() => {
    loading.value = false
})
</script>

<style lang="less" scoped>
.page-walletinfo {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 10vw;
    background-color: #111723;
    color: #fff;
    .page-tabs {
        background-color: #20222c;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20vw;
        height: 10vw;
        .page-tab {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3.7vw;
        }
        .active-tab {
            color: #4677d7;
            border-bottom: 1px solid #4677d7;
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
                flex: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
            .flex2 {
                flex: 3;
            }
        }
    }
}
</style>