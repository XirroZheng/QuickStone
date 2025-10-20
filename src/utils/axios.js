import axios from 'axios'

const service = axios.create({
    baseURL: '/api',
    timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            }
        }
        return config
    },
    (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            console.error(
                '请求错误：',
                error.response.status,
                error.response.data
            )
        } else {
            console.error('网络错误或请求超时')
        }
        return Promise.reject(error)
    }
)

// 统一请求函数
function request(config) {
    return service(config)
}

// 示例使用
// request({ url: '/users', method: 'POST', data: { name: 'Alice' } })
//     .then((res) => {
//         console.log('新增用户：', res)
//     })
//     .catch((err) => console.error(err))

export default request
