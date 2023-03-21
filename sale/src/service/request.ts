import axios,{AxiosInstance, AxiosResponse} from 'axios'

enum responseCode{
  'success' = 200,
  'failure' = 401,
}
const request:AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 80000, // 请求超时时间(毫秒)
  withCredentials: true,// 异步请求携带cookie
  // headers: {
  //   'Content-Type': 'application/json',
  //   'token': 'x-auth-token',
  //   'X-Requested-With': 'XMLHttpRequest',
  // }
})
request.interceptors.request.use(
  (config) => {
    return config
  },error => {
    // 对请求错误做些什么
    Promise.reject(error)
  }
)

// response 拦截器
request.interceptors.response.use(
  (response:AxiosResponse) => {
    const res = response.data;
    if (res.code === responseCode.success) {
      return res
    }else {
      return Promise.reject(res);
    }
  },error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default request