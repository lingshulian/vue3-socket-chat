import axios from 'axios'
import { useMainStore } from "@/store/main"

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
  timeout: 10000, // request timeout
});

function token() {
  return useMainStore().token
}

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    if (token()) {
      config.headers['Authorization'] = 'Bearer ' + token()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res?.code !== 200) {
      return res
    } else {
      return res
    }

  },
  error => {
    return Promise.reject(error)
  }
)

export default service
