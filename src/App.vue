<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import api from '@/api'
import store from './store';
import i18n from '@/lang'


api.get_user_lang().then(res => {
  const l = res.lang || 'th'
  i18n.global.locale = l
  localStorage.setItem('lang', l)
})

api.indexIndex().then(res => {
  if (!res) return
  store.commit('setHomeData', res)
  store.commit('setServer', res.online_service)
  // store.commit('setContract', res.contract)
})

api.product().then(res => {
  if (!res) return
  // const arr = []
  // res.map(item => {
  //   if (item.balance > 0) {
  //     arr.push(item)
  //   }
  // })
  store.commit('setProducts', res || [])
})


onMounted(() => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  let vw = window.innerWidth * 0.01
  document.documentElement.style.setProperty('--vw', `${vw}px`)
  window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    let vw = window.innerWidth * 0.01
    document.documentElement.style.setProperty('--vw', `${vw}px`)
  })
 // 禁止双击
  document.addEventListener('dblclick', function (event) {
  event.preventDefault();
}, { passive: false });
})



</script>

<style lang="less">
:root {
  --vw: 1vw;
  --vh: 1vh;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  touch-action: manipulation;
  // max-width: 600px;
  // margin: 0 auto;
}
/* 可选的样式：使滚动条完全不可见 */
body::-webkit-scrollbar {
  width: 0;
  display: none;
}

/* 针对 Webkit 浏览器（如 Chrome 和 Safari） */
input[type="text"], input[type="password"], textarea {
    background-color: transparent; /* 将背景色设置为透明 */
}

/* 针对 Firefox 浏览器 */
input:-moz-placeholder, textarea:-moz-placeholder {
    background-color: transparent; /* 将占位符文本的背景色设置为透明 */
}

/* 针对 Internet Explorer 浏览器 */
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    background-color: transparent; /* 将占位符文本的背景色设置为透明 */
}

/* 针对所有浏览器 */
input::placeholder, textarea::placeholder {
    background-color: transparent; /* 将占位符文本的背景色设置为透明 */
}


#app {
  font-size: calc(3.2* var(--vw));
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background-image: url('./assets/bg2.png');
  background-size: cover;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB, Microsoft Yahei, sans-serif;
}

div {
  box-sizing: border-box;
}

.up {
  color: #4ca84b;
}

.down {
  color: #ec5352;
}

.up-bg {
  background-color: #4ca84b;
}

.down-bg {
  background-color: #ec5352;
}</style>
