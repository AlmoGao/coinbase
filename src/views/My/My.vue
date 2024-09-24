<!-- 我的 -->
<template>
    <div class="page-my">
        <!-- <div class="server">
            <img @click="goServer" src="@/assets/server.svg" alt="">
        </div> -->

        <div class="user-box">
            <img style="height:15vh;opacity:0" src="@/assets/set.png" />
            <div class="username" style="font-size: 5.4vw;margin-bottom: 2vw;">{{ userInfo.nickname || userInfo.username || '--' }}</div>
            <!-- <div>{{_t('82')}}：{{ userInfo.level }}</div>  -->
            <!-- <div>{{_t('159')}}: {{ userInfo.bank ? userInfo.bank.username : '--' }}</div>
            <div class="item">
                <span>{{_t('84')}}:</span>
                <span class="num">{{ userInfo.wl }}</span>
            </div>
            <div class="item">
                <span>{{_t('85')}}:</span>
                <span class="num">{{ userInfo.score }}</span>
            </div> -->
            <div class="username" style="font-size: 5.4vw;margin-bottom: 2vw;">
                <span>{{_t('83')}}:</span>
                <span>{{ userInfo.money || '--' }}</span>
            </div>
        </div>
        <div class="money-box">
            <!-- <div class="item" style="flex:1;color:red">
                <span>{{_t('83')}}</span>
                <span class="num">{{ userInfo.money || '--' }}</span>
            </div> -->
            <div class="btn" style="flex:1;background-color: #293b80;color: #fff;height:8vw;display: flex;align-items: center;justify-content: center;height:10vw;border-radius: 2vw;margin:0 2vw;" @click="jump('recharge')">{{_t('86')}}</div>
            <div class="btn" style="flex:1;background-color: #293b80;color: #fff;height:8vw;display: flex;align-items: center;justify-content: center;height:10vw;border-radius: 2vw;margin:0 2vw;" @click="jump('withdraw')">{{_t('87')}}</div>
        </div>

        <!-- <div class="user">
            <div class="avatar"></div>
            <div class="userinfo">
                <div class="username">{{ userInfo.nickname || userInfo.username || '--' }}<span>ID:{{ userInfo.id }}</span></div>
                <div>{{_t('82')}}：{{ userInfo.level }}</div>
                <div>{{_t('159')}}: {{ userInfo.bank ? userInfo.bank.username : '--' }}</div>
            </div>
        </div> -->

        <!-- <div class="wallet"> -->
            <!-- <div class="item">
                <span>{{_t('83')}}</span>
                <span class="num">{{ userInfo.money || '--' }}</span>
            </div> -->
            <!-- <div class="item">
                <span>{{_t('84')}}</span>
                <span class="num">{{ userInfo.wl }}</span>
            </div>
            <div class="item">
                <span>{{_t('85')}}</span>
                <span class="num">{{ userInfo.score }}</span>
            </div> -->

            <!-- <div class="btns">
                <div class="btn primary-btn" @click="jump('recharge')">{{_t('86')}}</div>
                <div class="btn" @click="jump('withdraw')">{{_t('87')}}</div>
            </div> -->
        <!-- </div> -->


        <div class="navs">
            <!-- <div class="nav" @click="jump('recharge')">
                <div class="name">{{_t('86')}}</div>
            </div> -->
            <!-- <div class="nav" @click="jump('fundDetail')">
                <van-icon name="todo-list" class="icon" />
                <div class="name">基金明细</div>
                <van-icon name="arrow" />
            </div> -->
            <!-- <div class="nav" @click="goCode">
                <van-icon name="manager" class="icon" />
                <div class="name">{{_t('89')}}</div>
                <van-icon name="arrow" />
            </div> -->
            <!-- <div class="nav" @click="jump('lang')">
                <van-icon name="location-o" class="icon" />
                <div class="name">{{_t('90')}}</div>
                <van-icon name="arrow" />
            </div> -->
            <div class="nav" @click="jump('setting')">
                <!-- <van-icon name="bars" class="icon" /> -->
                <div class="name">{{_t('91')}}</div>
                <!-- <van-icon name="arrow" /> -->
            </div>
            <div class="nav" @click="openSelect">
                <div class="name">{{_t('164')}}</div>
            </div>
            <div class="nav" @click="loginout">
                <div class="name">{{_t('118')}}</div>
            </div>
        </div>
    </div>

    <van-dialog v-model:show="show" title="" show-cancel-button @confirm="confirm">
        <div class="dialog_box">
            <div>{{_t('164')}}</div>
            <div class="dialog_ipt">
                <select v-model="currItemId">
                    <option :value="item.id" v-for="(item, i) in products" :key="i">{{ item.name }} ({{_t('166')}}:{{ item.balance }})</option>
                </select>
            </div>
            <div class="dialog_ipt">
                <input v-model="money" type="number" :placeholder="_t('167')">
            </div>
        </div>
    </van-dialog>
</template>

<script setup>
import router from '@/router';
import { showToast } from 'vant';
import store from '@/store'
import { computed, ref } from 'vue'
import { goServer } from '@/utils/utils'
import { _t } from '@/utils/utils'
import api from '@/api'


api.product().then(res2 => {
    if (!res2) return
    store.commit('setProducts', res2 || [])
})

store.dispatch('updateUser')
const userInfo = computed(() => store.state.userInfo || {})
const products = computed(() => {
    return (store.state.products || []).filter(item => item.balance > 0)
})


const jump = name => {
    router.push({
        name
    })
}

const loginout = () => {
    api.loginout()
    setTimeout(() => {
        store.commit('setToken', '')
        store.commit('setUserInfo', {})
        router.push({
            name: 'login'
        })
        showToast(_t('119'))
    }, 500)
}

const goCode = () => {
    showToast(_t('92'))
}


const show = ref(false)
const openSelect = () => {
    if (!products.value.length) return
    money.value = ''
    currItemId.value = products.value[0].id
    show.value = true
}
const currItemId = ref('')
const currItem = computed(() => products.value.find(item => item.id == currItemId.value))
const money = ref('')
const confirm = () => {
    if (!money.value || money.value < 0) return
    if (currItem.value.balance < money.value) return showToast(_t('168'))
    api.fund_transfer({
        id: currItem.value.id,
        money: money.value
    }).then(res => {
        if (res.code) {
            showToast(_t('169'))
            store.dispatch('updateUser')
            api.product().then(res2 => {
                    if (!res2) return
                    store.commit('setProducts', res2 || [])
                })
        }
    })
}
</script>

<style lang="less" scoped>
.page-my {
    height: 100vh;
    background-image: url('../../assets/bg.png');
    background-size: 100% 100%;
    padding: 12vw 0;
    overflow-y: auto;
    color: #858ea1;

    .user-box {
        color: #956969;
        font-size: 4.2vw;
        text-align: center;
        font-weight: bold;
        line-height: 6vw;
        
    }
    .money-box {
        display: flex;
        align-items: center;
        height: 15vw;
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
        margin: 6vw 0 4vw 0;
        padding: 0 4vw;
        text-align: center;
        font-weight: bold;
        font-size: 3.7vw;
    }

    .server {
        position: absolute;
        right: 4vw;
        top: 2vw;
        width: 7vw;
        height: 7vw;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .user {
        margin: 0 4vw;
        display: flex;
        align-items: flex-start;

        .avatar {
            width: 10vw;
            height: 10vw;
            border-radius: 50%;
            background-color: #eee;
            margin-right: 4vw;
        }

        .userinfo {
            .username {
                color: #fff;
                font-size: 4vw;
                line-height: 5vw;

                span {
                    font-size: 3.2vw;
                    margin-left: 8vw;
                }
            }
        }
    }

    .wallet {
        background-color: rgba(32, 34, 44, .6);
        margin: 4vw;
        padding: 4vw;
        border-radius: 2vw;
        font-size: 3.7vw;
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 6vw;
            .num {
                color: #fff;
                font-weight: bold;
            }
        }
        .btns {
            display: flex;
            align-items: center;
            margin-top: 8vw;
            .btn {
                flex: 2;
                line-height: 1;
                height: 9vw;
                color: #4677d7;
                border: 1px solid #4677d7;
                border-radius: 1vw;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .primary-btn {
                background-color: #4677d7;
                color: #fff;
                flex: 3;
                margin-right: 2vw;
            }
        }
    }

    .navs {
        margin-top: 2vw;
        font-size: 3.7vw;
        .nav {
            background-color: #fff;
            border-bottom: 1px solid #0f1118;
            padding: 0vw 4vw;
            height: 9vw;
            display: flex;
            align-items: center;
            width: 90vw;
            margin: 0 auto 2vw auto;
            border-radius: 4.5vw;
            .name {
                flex: 1;
                color: #000;
                margin-left: 2vw;
                text-align: center;
            }
            .icon {
                font-size: 4.4vw;
                color: #4677d7;
            }
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
        input, select {
            flex: 1;
            height: 100%;
            background-color: rgba(0,0,0,0);
            border: none;
            outline: none;
            text-align: center;
            option {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>