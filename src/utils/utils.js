import router from '@/router'
import store from '@/store'
import i18n from '@/lang'

export function _t (agr) {
  return i18n.global.t(agr)
}

// 图片地址
export function imgUrl(url) {
  let baseUrl = process.env.NODE_ENV === 'development' ? 'https://dyy.webtestfeatured.xyz' : '';
  if (url.includes('https://')  ||  url.includes('http://')) return url
  return baseUrl + url
}

// 客服
export function goServer() {
  if (store.state.server) {
    window.open(store.state.server)
  }
}

// 跳转
export function jump(name, data) {
  router.push({
    ...data,
    name: name
  })
}

// 时间转换
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else {
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(
      new Date(time).getTime() +
        (parseInt(new Date(time).getTimezoneOffset() / 60) + 8) * 3600 * 1000
    );
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

// 复制
export const copyText = (text) => {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
  } else {
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = "fixed";
    textarea.style.clip = "rect(0 0 0 0)";
    textarea.style.top = "10px";
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand("copy", true);
    // 移除输入框
    document.body.removeChild(textarea);
  }
};
