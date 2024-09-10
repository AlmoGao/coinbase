<!-- 下单 -->
<template>
  <div class="bet-box">
    <div class="title">{{ _t("12") }}</div>
    <div class="times">
      <div
        class="time-item"
        :class="{ 'active-time': second == item.second }"
        @click="second = item.second"
        v-for="(item, i) in times"
        :key="i"
      >
        <div>{{ _t("12") }}</div>
        <div class="t">
          <span>{{ item.second }}</span> S
        </div>
        <!-- <div class="s">{{ _t('13') }} {{ item.win_rate }}%</div> -->

        <div class="active">
          <van-icon class="right" name="success" />
        </div>
      </div>
    </div>

    <div class="title">{{ _t("14") }}</div>
    <div class="ipt-box">
      <div
        class="ipt-item"
        @click="margin = item"
        v-for="item in numList"
        :key="item"
      >
        {{ item }}
      </div>
      <div class="ipt-item" @click="margin = userInfo.money || 0">
        {{ _t("15") }}
      </div>
      <input
        v-model="margin"
        class="ipt"
        type="number"
        :placeholder="`${_t('16')}(฿)`"
      />
    </div>
    <div class="info-box">
      <span>{{ _t("17") }}: {{ margin || "--" }} ฿</span>

      <span>
        {{ _t("18") }} {{ userInfo.money }}
        <span class="link" @click="goRecharge">{{ _t("19") }}</span>
      </span>
    </div>

    <div class="btn-box" :style="{ opacity: second && margin ? '1' : '0.5' }">
      <div class="btn" @click="goBuy(0)">
        {{ _t("20") }}
        <!-- <span>0.652</span> -->
      </div>
      <div class="btn right" @click="goBuy(1)">
        {{ _t("21") }}
        <!-- <span>0.652</span> -->
      </div>
    </div>

    <!-- 倒计时 -->
    <div class="time-box-bg" v-if="showTimedown" @click="closeTimedown">
      <div class="time-box">
        <div class="time">{{ timedown.second }}<span>S</span></div>
        <div class="tr">
          <div class="td">{{ timedown.ud ? _t("21") : _t("20") }}</div>
          <div class="td">{{ timedown.margin }}(฿)</div>
          <div
            class="td"
            :style="{
              color:
                props.buy_money > timedown.buy_money ? '#4ca84b' : '#ec5352',
            }"
          >
            {{ timedown.buy_money }}
          </div>
          <div class="td">{{ props.buy_money }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import api from "@/api";
import { showToast, showDialog } from "vant";
import store from "@/store";
import router from "@/router";
import { _t } from "@/utils/utils";

const userInfo = computed(() => store.state.userInfo || {});

const props = defineProps({
  buy_money: {
    type: [String, Number],
    default: "",
  },
  trade_contract_id: {
    type: [String, Number],
    default: "",
  },
});

const margin = ref("");

const second = ref("");
const times = ref([]);
api.get_time_type().then((res) => {
  times.value = res || [];
});

// 提交
const loading = ref(false);
const order_id = ref("");
const goBuy = (ud) => {
  if (loading.value) return;
  if (!second.value) return showToast(_t("10"));
  if (!margin.value) return showToast(_t("11"));
  if (!props.trade_contract_id) return
  const params = {
    buy_money: props.buy_money,
    second: second.value,
    trade_contract_id: props.trade_contract_id,
    ud,
    margin: margin.value,
  };
  loading.value = true;
  api
    .buy_contract(params)
    .then((res) => {
      if (res.order_id) {
        order_id.value = res.order_id;
        startTimedown(params);
        second.value = "";
        margin.value = "";
        store.dispatch("updateUser");
      }
      if (res.msg) showToast(res.msg);
      if (res.code) {
        startTimedown(params);
        second.value = "";
        margin.value = "";
        store.dispatch("updateUser");
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const timedown = ref({
  second: 0,
  buy_money: 0,
  ud: 0,
  margin: 0,
});
const interval = ref(0);
const showTimedown = ref(false);
const closeTimedown = () => {
  showTimedown.value = false;
  clearInterval(interval.value);
};
const startTimedown = (params) => {
  showTimedown.value = true;
  timedown.value = {
    second: params.second,
    buy_money: params.buy_money,
    ud: params.ud,
    margin: params.margin,
  };
  interval.value = setInterval(() => {
    timedown.value.second--;
    if (timedown.value.second <= 0) {
      closeTimedown();
      // 开奖
      api
        .get_contract_order({
          id: order_id.value,
        })
        .then((res) => {
          console.error('--结果', res)
          if (res && res.length) {
            showDialog({
            confirmButtonText: 'OK',
            message: `${res[0].wl > 0 ? '+' : ''}${res[0].wl}`,
          });
          }
          
        });
    }
  }, 1100);
};

const goRecharge = () => {
  router.push({
    name: "recharge",
  });
};

// 快捷充值
const numList = ref([500, 1000, 2000]);
api.get_kj_money().then((res) => {
  numList.value = res || [500, 1000, 2000];
});
</script>

<style lang="less" scoped>
.bet-box {
  padding: 2vw;
  min-height: 100vw;
  background-color: #16191f;
  padding-bottom: 20vw;
  .title {
    color: #888;
    margin: 2vw 0;
  }
  .times {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .time-item {
      background-color: rgba(62, 62, 62, 0.5);
      border-radius: 1vw;
      width: calc(30vw - 1px);
      margin-right: 3vw;
      margin-bottom: 2vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1vw 0;
      color: #777;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .t {
        font-size: 3.7vw;
        font-weight: bold;
        margin: 2vw 0 1vw 0;
        span {
          font-size: 4.2vw;
          color: #f8bf16;
        }
      }
      .s {
        color: #cc485c;
      }
      .active {
        display: none;
      }
    }
    .active-time {
      border: 2px solid #f8bf16;
      position: relative;
      overflow: hidden;
      .active {
        display: block;
        background-color: #f8bf16;
        color: #16191f;
        position: absolute;
        right: -4vw;
        top: -4vw;
        z-index: 9;
        width: 8vw;
        height: 8vw;
        transform: rotate(-45deg);
        .right {
          position: absolute;
          transform: rotate(45deg);
          top: 2.5vw;
          font-size: 3.2vw;
        }
      }
    }
  }
  .ipt-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 4vw;
    .ipt-item {
      padding: 2vw;
      color: #fff;
      border-radius: 1vw;
      margin-right: 2vw;
      font-size: 3.2vw;
      background-color: rgba(62, 62, 62, 0.8);
      flex-shrink: 1;
    }
    .ipt {
      flex: 1;
      flex-shrink: 1;
      max-width: 32vw;
      line-height: 8vw;
      font-size: 4vw;
      background-color: rgba(0, 0, 0, 0);
      outline: none;
      border: none;
      color: #f8bf16;
      border-bottom: 1px solid #858ea1;
      text-align: center;
    }
  }
  .info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4vw 2vw;
    .link {
      color: #4677d7;
    }
  }
  .btn-box {
    height: 10vw;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    display: flex;
    color: #fff;
    .btn {
      flex: 1;
      background-color: #ec5352;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4vw;
      font-weight: bold;
      span {
        font-weight: 400;
        font-size: 3.2vw;
        margin-left: 1vw;
      }
    }
    .right {
      background-color: #4ca84b;
    }
  }
  .time-box-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 10px #555;
    z-index: 999;
  }
  .time-box {
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 80%;
    box-sizing: border-box;
    padding: 5vh 5vw;
    background-color: #16191f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .time {
      font-size: 40px;
      span {
        font-size: 20px;
        margin-left: 4px;
      }
      margin-bottom: 40px;
    }
    .tr {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
