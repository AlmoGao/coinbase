import http from './request'

class HttpService {
  loginout(data) { // 退出
    return http('/user/logout', {
      method: 'post',
      data,
    })
  }
  register(data) { // 注册
    return http('/user/register', {
      method: 'post',
      data,
    })
  }
  login(data) { // 登录
    return http('/user/login', {
      method: 'post',
      data,
    })
  }
  indexIndex(params) { // 首页数据
    return http('/index/index', {
      method: 'get',
      params,
    })
  }
  product(params) { // 保险列表
    return http('/index/product', {
      method: 'get',
      params,
    })
  }
  userIndex(params) { // 个人中心
    return http('/user/index', {
      method: 'get',
      params,
    })
  }
  get_time_type(params) { // 时间选项
    return http('/order/get_time_type', {
      method: 'get',
      params,
    })
  }
  buy_contract(data) { // 购买合约
    return http('/order/buy_contract', {
      method: 'post',
      data,
    })
  }
  add_bank(data) { // 添加银行卡
    return http('/user/add_bank', {
      method: 'post',
      data,
    })
  }
  get_bank(params) { // 获取银行卡列表
    return http('/money/get_bank', {
      method: 'get',
      params,
    })
  }
  resetpwd(data) { // 修改密码
    return http('/user/resetpwd', {
      method: 'post',
      data,
    })
  }
  get_contract_order(data) { // 合约记录
    return http('/order/get_contract_order', {
      method: 'post',
      data,
    })
  }
  get_rate(params) { // 获取汇率
    return http('/money/get_rate', {
      method: 'get',
      params,
    })
  }
  recharge(data) { // 充值
    return http('/money/recharge', {
      method: 'post',
      data,
    })
  }
  withdraw(data) { // 提现
    return http('/money/withdraw', {
      method: 'post',
      data,
    })
  }
  get_money_log(params) { // 账变记录
    return http('/user/get_money_log', {
      method: 'get',
      params,
    })
  }
  set_paypassword(data) { // 设置取款密码
    return http('/user/set_paypassword', {
      method: 'post',
      data,
    })
  }
  get_user_lang(params) { // 系统语言
    return http('/index/get_user_lang', {
      method: 'get',
      params,
    })
  }
  get_kj_money(params) { // 快捷金额
    return http('/index/get_kj_money', {
      method: 'get',
      params,
    })
  }
  trade_contract(data) { // 首页数据
    return http('/index/trade_contract', {
      method: 'post',
      data,
    })
  }
  carousel(data) { // 轮播图
    return http('/index/carousel', {
      method: 'post',
      data,
    })
  }
  fund_transfer(data) { // 资金划转
    return http('/user/fund_transfer', {
      method: 'post',
      data,
    })
  }
}

const https = new HttpService()
export default https