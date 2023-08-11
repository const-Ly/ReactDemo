import axios from 'axios'
// import { getToken } from '@/utils/auth'
// import { logoutDeleteData } from '@/utils/utils'
// import { showToast } from 'vant'

// 普通数据请求配置
const ajax = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60 * 1000
  // withCredentials: true
})
// 添加请求拦截器
ajax.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (!config.data) config.data = {}
    if (!config.data.token) {
      // config.data['token'] = getToken()
    }
    // config.headers['app-version'] = import.meta.env.VITE_APP_VERSION
    config.headers['Content-Type'] = 'application/json'
    config.params = { }
    return config
  },
  (error) => {
    console.warn(error)
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
ajax.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return response.data
    } else {
      // showToast({
      //   duration: 2500,
      //   message: '网络异常，请稍后再试'
      // })
      alert('网络异常，请稍后再试')
      // loading.hide()
      return response
    }
  },
  (error) => {
    return {}
  }
)
// 重写axios的get方法，保证其和post类型的传参一致性
const originGetMethods = ajax.get
ajax.get = async (url, body = {}) => {
  try {
    const response = await originGetMethods(url, {
      params: {
        ...body
        // token: body.token || getToken(),
      }
    })
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

// 埋点数据请求配置
const reportAjax = axios.create()
reportAjax.interceptors.request.use(
  (config) => {
    if (!config.data) config.data = {}
    if (!config.data.token) {
      // config.data['token'] = getToken()
    }
    config.headers['app-version'] = import.meta.env.VITE_APP_VERSION
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
reportAjax.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 上传图片接口配置 put类型
const uploadImageAjax = axios.create()
uploadImageAjax.interceptors.request.use(
  (config) => {
    if (!config.data) config.data = {}
    if (!config.data.token) {
      // config.data['token'] = getToken()
    }
    config.headers['app-version'] = import.meta.env.VITE_APP_VERSION
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const reportRequest = reportAjax
export const uploadImageRequest = uploadImageAjax
export default ajax
