<!-- 基金 -->
<template>
    <div class="page-fund">
        <div class="title">{{ _t('33') }}</div>

        <div class="item" @click="goInfo">
            <div class="unlimit">{{ _t('34') }}</div>
            <div class="top">
                <img class="icon" src="@/assets/wave.svg" alt="">
                <div class="content">
                    <div>BTC</div>
                    <div class="tip">10000</div>
                </div>
                <div class="more">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="bottom">
                <div class="bottom-item">
                    <div>{{ _t('35') }}</div>
                    <div class="num">30.00%</div>
                </div>
                <div class="bottom-item">
                    <div>{{ _t('36') }}</div>
                    <div class="num">30.00%</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
// import { ref } from 'vue'
import { _t } from '@/utils/utils'

const goInfo = () => {
    router.push({
        name: 'fundinfo'
    })
}
</script>

<style lang="less" scoped>
.page-fund {
    padding-bottom: 12vw;
    .title {
        text-align: center;
        font-size: 3.7vw;
        font-weight: bold;
        color: #fff;
        line-height: 10vw;
    }
    .item {
        position: relative;
        margin: 0 3vw 3vw 3vw;
        padding: 2vw;
        background-color: #20222b;
        border-radius: 1vw;
        overflow: hidden;
        .top {
            display: flex;
            align-items: center;
            .icon {
                height: 10vw;
                margin: 0 4vw 0 6vw;
            }
            .content {
                font-size: 3.7vw;
                flex: 1;
                color: #fff;
                .tip {
                    margin-top: 2vw;
                    font-size: 3.2vw;
                    color: #858ea1;
                }
            }
            .more {
                background-color: #ffac3d;
                width: 5vw;
                height: 5vw;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .bottom {
            padding: 4vw 15vw 0 15vw;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            border-top: 2px solid #171a23;
            .num {
                font-size: 4.4vw;
                margin-top: 1vw;
                color: #52ec93;
                font-weight: bold;
            }
        }
        .unlimit {
            background-color: #52ec93;
            color: #171a23;
            padding: 4vw 4vw 0 4vw;
            position: absolute;
            top: -2vw;
            left: -5vw;
            font-weight: bold;
            font-size: 3.2vw;
            z-index: 9;
            text-align: center;
            transform: rotate(-45deg);
        }
    }
}
</style>