<!-- 首页 -->
<template>
    <div class="page-home">
        <!-- <div class="top">
            <img @click="goServer" class="server" src="@/assets/server.svg" alt="">
        </div> -->
        <!-- <img class="logo" v-if="homeData.logo" :src="imgUrl(homeData.logo)" alt=""> -->

        <!-- <van-notice-bar color="#333" background="#fff" left-icon="volume-o">{{ bulletin }}</van-notice-bar> -->

        <!-- <div class="hr"></div> -->

        <!-- <div class="title">精选基金</div> -->
        <!-- <div class="title">{{ _t('8') }}</div> -->

        <van-swipe class="swiper" :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image">
                <img class="swiper-item" :src="image.image" />
            </van-swipe-item>
        </van-swipe>
        
        <div class="box">
            <div class="tr th">
                <div class="flex3" style="text-align: left;">{{ _t('5') }}</div>
                <div class="flex2">{{ _t('6') }}</div>
                <div class="flex2">{{ _t('7') }}</div>
            </div>
        </div>
        <van-notice-bar
        style="margin: 2vw;"
            left-icon="volume-o"
            :text="bulletin"
            />
        <div class="box">
            <div class="scroll">
                <div class="tr" v-for="(item, key) in market" :key="key" @click="goContract(key)">
                    <div class="flex3 item-name">
                        <img v-if="item.image" :src="imgUrl(item.image)" alt="">
                        <!-- <span>{{ item.name }}</span> -->
                         <span>{{ getNameFromCode(key) }}</span>
                    </div>
                    <div class="flex2 item-price" :class="{ 'up-bg': item.increase > 0, 'down-bg': item.increase < 0 }">
                        <div >{{ item.price || ' --' }}THB</div>
                        <!-- <div>{{ market[item.huobi_code]?.currentPrice || ' --' }}</div> -->
                    </div>
                    <div class="flex2 percent-box">
                        <div class="percent" :class="item.increase < 0 ? 'down-bg' : 'up-bg'">{{ item.increase > 0 ? '+' : '' }}{{ item.percentChange || '-- ' }}%</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="title">{{ _t('9') }}</div> -->
        <div class="box" style="margin-top: 4vw;" v-if="rateList.length">
            <div class="tr" v-for="(item, i) in rateList" :key="i">
                <img class="flag" :src="flagMap[item.code]" alt="">
                <div style="flex:1;margin:0 4vw">{{ item.code }}</div>
                <div style="font-size:3.7vw">{{ item.exchange_rate }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { goServer, imgUrl, _t } from '@/utils/utils'
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import store from '@/store'
import api from '@/api'
import cnFlag from '@/assets/cn.png'
import enFlag from '@/assets/en.png'
import viFlag from '@/assets/vi.png'
import thFlag from '@/assets/th.png'
import msFlag from '@/assets/ms.png'
import router from '@/router'
import b1 from '@/assets/b1.jpg'
import b2 from '@/assets/b2.jpg'
import b3 from '@/assets/b3.jpg'
import http from "@/api/index"
import { useRoute } from "vue-router"


const route = useRoute()
const images = ref([])

http.carousel({type: 0}).then(res => {
    if (res && res.length) {
        images.value = res
    }
})

const flagMap = {
    'CNY': cnFlag,
    'THB': thFlag,
    'USD': enFlag,
    'VND': viFlag,
    'MYR': msFlag
}

const homeData = computed(() => store.state.homeData || {})
const contract = computed(() => store.getters.getContract || [])

const goContract = key => {
    const target = contract.value.find(item => item.huobi_code == key) || {}
    router.push({
        name: 'contract',
        query: {
            id: target.id,
            number: target.id,
            contract_name: target.huobi_code
        }
    })
}



const getNameFromCode = key => {
    const target = contract.value.find(item => item.huobi_code == key)
    if (target) return target.name
    return key
}
const bulletin = computed(() => {
    let val = ''
    homeData.value.bulletin.forEach(item => {
        val += item.content + '   '
    })
    return val
})

let interval = 0
const market = ref({})
onMounted(() => {
    api.indexContract({
        product_id: route.query.product_id
    }).then(res => {
        store.commit('setContract', res || []);
        (res || []).forEach(item => {
            market.value[item.huobi_code] = {}
        })
        setTimeout(() => {
            (contract.value || []).forEach(item => {
                getMarket(item.huobi_code)
            })
        }, 2000)
    })
   
    interval = setInterval(() => {
        (contract.value || []).forEach(item => {
            getMarket(item.huobi_code)
        })
        // getContract()
    }, 5000)
})
onBeforeUnmount(() => {
    if (interval) clearInterval(interval)
})

const getMarket = coin => {
    const apiUrl = `https://api.huobi.pro/market/detail/merged?symbol=${coin}`
    fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.status === "ok") {
      const ticker = data.tick;
      const currentPrice = ticker.close;
      const openPrice = ticker.open;
      const percentChange = ((currentPrice - openPrice) / openPrice) * 100;
      let up = 0
      if (market.value[coin] && market.value[coin].currentPrice) {
        up = currentPrice > market.value[coin].currentPrice ? 1 : -1
      }
      market.value[coin] = {
        increase: up,
        price: currentPrice,
        percentChange: percentChange.toFixed(2)
      }
    }
  })
}

const rateList = ref([])
api.get_rate().then(res => {
    rateList.value = res
})

// const contracts = ref([])
// const getContract = () => {
//     api.trade_contract({type:0}).then(res => {
//         console.error(res)
//         contracts.value = res
//     })
// }
// getContract()
</script>

<style lang="less" scoped>
.page-home {
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
    .top {
        height: 12vw;
        width: 100%;
        // position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 3.7vw;
        font-weight: bold;
        // background-color: #16191f;

        .server {
            position: absolute;
            right: 2vw;
            color: #fff;
            height: 6vw;
        }
    }

    .logo {
        display: block;
        width: 94vw;
        margin: 12vw auto 0 auto;
        border-radius: 3vw;
        overflow: hidden;
        // height: 46vw;
    }

    .hr {
        background-color: #858ea1;
        width: 96%;
        height: 1px;
        margin: 0 auto;
    }

    .title {
        color: #fff;
        font-size: 4vw;
        padding: 3vw 0 3vw 2vw;
    }

    .box {
        background-color: rgba(0,0,0,.5);
        padding: 2vw;
        border-radius: 2vw;
        width: 90vw;
        margin: 0 auto;
        color: #fff;

        .scroll {
            max-height: 73vw;
            overflow-y: auto;
        }

        .tr {
            display: flex;
            align-items: center;
            padding: 0 2vw 0 4vw;
            height: 12vw;
            width: 100%;
            .flag {
                width: 6vw;
                height: 6vw;
                border-radius: 50%;
                overflow: hidden;
            }

            .flex3 {
                flex: 3;
            }

            .flex2 {
                flex: 2;
                margin-left: 2vw;
            }

            .item-name {
                display: flex;
                align-items: center;
                color: #fff;
                font-size: 3.8vw;
                font-weight: 400;

                img {
                    height: 5vw;
                    margin-right: 2.4vw;
                }
            }

            .item-price {
                width: 32vw;
                height: 7vw;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 1vw;
                div:nth-child(1) {
                    color: #fff;
                    font-size: 3.8vw;
                    margin-bottom: 0.5vw;
                }
                
            }
            .up-txt {
                background-color: red;
            }
            .down-txt {
                background-color: #4ca84b;
            }

            .percent-box {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 2vw;

                .percent {
                    color: #fff;
                    width: 18vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 6vw;
                    border-radius: 1.6vw;
                }
            }

        }

        .th {
            text-align: center;
            height: 6vw;
        }
    }
}
</style>