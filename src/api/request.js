import axios from "axios";
import { showToast } from "vant";
import router from "@/router";
import store from "../store/index";

const whiteList = ["/member/message", "/bet/lottery/period", '/bet/lottery/result'];
class Interceptors {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: "/api",
      timeout: 20000,
    });
  }
  // 初始化拦截器
  init() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = store.state.token;
        if (token) {
          config.headers["Token"] = token;
        }
        const lang = localStorage.getItem('lang')
        if (lang) {
          config.headers["lang"] = lang;
        }
        config.headers['Content-Type'] = 'multipart/form-data'
        return config;
      },
      (error) => {
        showToast(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const res = response.data;
        // debugger
        if (res.code == 0) {
          setTimeout(() => {
            if (!whiteList.includes(response.config.url)) {
              showToast(res.msg);
            }
          }, 200);
          return Promise.reject(res);
        } else {
          return res ? (res.data || res) : res;
        }
      },
      (error) => {
        if (error.response.status == 401) { // 登录失效
          store.commit('setToken', '')
          store.commit('setUserInfo', {})
          router.push({
            name: 'login'
          })
        }
        showToast(error.message);
        return Promise.reject(error);
      }
    );
  }
  // 返回一下
  getInterceptors() {
    return this.instance;
  }
}
const instance = new Interceptors();
instance.init();
export default instance.getInterceptors();
