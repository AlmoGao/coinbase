<!-- 买入基金 -->
<template>
    <div class="fund-buy">
        <Top :bgColor="'#16191f'" :color="'#fff'" :title="_t('37')" />

        <div class="title-box">
            <span>BTC</span>
            <span>{{ _t('38') }}</span>
        </div>

        <div class="box">
            <span>{{ _t('39') }}</span>
            <span>{{ _t('40') }}：904$</span>
        </div>

        <div class="box">
            <span>{{ _t('41') }}</span>
            <input class="ipt" type="num" :placeholder="_t('42')">
        </div>

        <div class="box">
            <span>{{ _t('43') }}：904$</span>
            <span>{{ _t('44') }}：904$</span>
        </div>

        <div class="list">
            <div class="item">1{{ _t('41') }}</div>
            <div class="item">10{{ _t('41') }}</div>
            <div class="item">100{{ _t('41') }}</div>
            <div class="item">1000{{ _t('41') }}</div>
            <div class="item">2000{{ _t('41') }}</div>
            <div class="item">3000{{ _t('41') }}</div>
            <div class="item">4000{{ _t('41') }}</div>
            <div class="item">5000{{ _t('41') }}</div>
        </div>


        <div class="submit">{{ _t('45') }}</div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { _t } from '@/utils/utils'


</script>

<style lang="less" scoped>
.fund-buy {
    padding: 12vw 4vw 20vw 4vw;
    color: #fff;

    .title-box {
        background-color: #20222c;
        border-radius: 1vw;
        height: 8vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4vw;
        font-size: 3.2vw;

        span {
            &:nth-child(1) {
                font-size: 4vw;
            }
        }
    }
    .box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 3.7vw;
        margin: 4vw 0;
        .ipt {
            flex: 1;
            padding-bottom: 2vw;
            border: none;
            color: #d9913a;
            outline: none;
            background-color: rgba(0,0,0,0);
            border-bottom: 1px solid #666;
            text-align: center;
            margin: 6vw 4vw;
        }
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        margin-top: 10vw;
        .item {
            width: 15vw;
            border-radius: 1vw;
            border: 2px solid #d9913a;
            color: #d9913a;
            font-size: 3.2vw;
            height: 6.4vw;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 4vw 4vw 0;
            &:nth-child(5n) {
                margin-right: 0
            }
        }
    }
    .submit {
        background-color: #d9913a;
        position: fixed;
        bottom: 6vw;
        left: 4vw;
        width: 92vw;
        height: 12vw;
        border-radius: 2vw;
        display: flex;
            align-items: center;
            color: #000;
            justify-content: center;
            font-size: 4vw;
    }
}
</style>