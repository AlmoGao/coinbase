import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import api from '@/api'

export default createStore({
  state: {
    token: '',
    appConfig: {},
    userInfo: {},
    server: '',
    homeData: {},
    contract: [],
    products: [],
  },
  mutations: {
    setToken(state, val) {
      state.token = val
    },
    setAppConfig(state, val) {
      state.appConfig = val
    },
    setUserInfo(state, val) {
      state.userInfo = val
    },
    setServer(state, val) {
      state.server = val
    },
    setHomeData(state, val) {
      state.homeData = val
    },
    setProducts(state, val) {
      state.products = val
    },
    setContract(state, val) {
      state.contract = val
      console.error('---->', state.contract)
    },
  },
  actions: {
    updateUser({ commit }) {
      api.userIndex().then(res => {
        // console.error('个人数据', res)
        commit('setUserInfo', res)
      })
    },
  },
  getters: {
    getContract: state => state.contract
  },
  plugins: [createPersistedState()]
})
