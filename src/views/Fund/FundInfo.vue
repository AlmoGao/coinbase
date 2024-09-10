<!-- 基金详情 -->
<template>
    <div class="page-fundinfo">
        <Top :bgColor="'#16191f'" :color="'#fff'" :title="_t('47')" />

        <div class="top-item">
            <div class="name">BTC</div>
            <div>10000</div>
        </div>
        <div class="top-item">
            <div>
                <span>{{ _t('46') }}</span> <span class="name">903.234$</span>
            </div>
            <div>{{ _t('48') }}</div>
        </div>
        <div class="top-item">
            <div>
                <div>{{ _t('49') }}</div>
                <div class="num">30.00%</div>
            </div>
            <div>
                <div>{{ _t('50') }}</div>
                <div class="num">30.00%</div>
            </div>
        </div>

        <div class="tabs">
            <div class="name">{{ _t('51') }}</div>
            <div class="btns">
                <div class="btn">{{ _t('52') }}</div>
                <div class="btn">{{ _t('53') }}</div>
            </div>
        </div>
        <div class="box c-box">
            <div class="date">2023-08-08</div>
            <div ref="chart" class="chart-box"></div>
        </div>

        <div class="tabs">
            <div class="name">{{ _t('54') }}</div>
        </div>
        <div class="box table">
            <div class="tr" v-for="i in 50" :key="i">
                <div class="td">{{ _t('55') }}</div>
                <div class="td">{{ _t('56') }}</div>
                <div class="td">{{ _t('57') }}</div>
                <div class="td">{{ _t('58') }}</div>
            </div>
        </div>

        <div class="submit" @click="goBuy">{{ _t('59') }}</div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, onMounted } from 'vue'
import * as echarts from "echarts"
import router from '@/router';
import { _t } from '@/utils/utils'

const chart = ref({})
const c = ref(null)
const setData = (xArr, yArr) => {
    c.value.setOption({
        grid: {
            top: '20%',    // 设置上边距
            bottom: '20%'  // 设置下边距
        },
        xAxis: {
            type: 'category',
            data: xArr,
            axisLabel: {
                color: '#787879' // x 轴文字颜色
            },
            axisLine: {
                lineStyle: {
                    color: '#787879' // x 轴刻度线颜色
                }
            }
        },
        yAxis: {
            type: 'value',
            min: Math.min(...yArr), // 设置 y 轴最小值
            axisLabel: {
                color: '#787879' // y 轴文字颜色
            },
            axisLine: {
                lineStyle: {
                    color: '#787879' // y 轴刻度线颜色
                }
            },
            splitLine: {
                show: false // 设置网格线不显示
            }
        },
        series: [
            {
                data: yArr,
                type: 'line',
                name: _t('46'),
                itemStyle: {
                    color: '#d9913a' // 设置折线颜色
                }
            }
        ],
        tooltip: {
            show: true, // 显示提示框
            backgroundColor: '#ffffff', // 设置背景颜色
            textStyle: {
                color: '#000000' // 设置文字颜色
            },
            formatter: function (params) {
                return `${params.name} <br/> ${params.seriesName}: ${params.value}`;
            }
        },
    });
}
onMounted(() => {
    c.value = echarts.init(chart.value)
    setData(
        [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        [900, 901, 904, 903, 908, 903, 900, 903, 904, 902, 906]
    )

    setTimeout(() => {
        setData(
        [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        [807, 901, 904, 883, 908, 903, 850, 903, 904, 902, 906]
    )
    }, 2000)
})


const goBuy = () => {
    router.push({
        name: 'fundbuy'
    })
}
</script>

<style lang="less" scoped>
.page-fundinfo {
    min-height: 100vh;
    padding: 10vw 4vw 16vw 4vw;
    font-size: 3.2vw;
    color: #787879;

    .top-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2vw 0;

        .name {
            font-size: 4vw;
            font-weight: bold;
            color: #fff;
        }

        .num {
            font-size: 3.7vw;
            color: #52ec93;
        }
    }

    .tabs {
        padding: 2vw 0 1vw 0;
        border-top: 1px solid #333;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
            font-size: 4vw;
            color: #fff;
        }

        .btns {
            display: flex;
            align-items: center;

            .btn {
                margin-left: 2vw;
                color: #d9913a;
                border: 3px solid #d9913a;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 8vw;
                padding: 0 2vw;
            }

            .dis-btn {
                color: #787879;
                border: 3px solid #787879;
            }
        }
    }

    .box {
        border-radius: 2vw;
        background-color: #20222c;
        margin-bottom: 6vw;
        position: relative;
    }

    .chart-box {
        height: 50vw;
    }

    .table {
        padding: 1vw 2vw;
        margin-top: 2vw;
        min-height: 40vw;

        .tr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 6vw;

            .td {
                flex: 1;
                text-align: center;
            }
        }
    }
    .c-box {
        margin-top: 2vw;
        .date {
            color: #fff;
            font-size: 3.7vw;
            position: absolute;
            top: 0.4vw;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .submit {
        position: fixed;
        height: 12vw;
        width: 100vw;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffac3d;
        color: #171a23;
        font-size: 3.7vw;
    }
}
</style>