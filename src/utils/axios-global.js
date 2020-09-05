import axios from 'axios'
import store from '@/store/store'

const URL = process.env.VUE_APP_API_URL
const global = axios.create({
  baseURL: `${URL}`
})

// Интерцепторы
global.interceptors.request.use(config =>
  // Do something before request is sent
  // console.log(config);
  config,
error =>
  // Do something with request error
  Promise.reject(error))

global.interceptors.response.use((response) => {
  // Do something with response data
  // console.log(response.status, response);
  if (response.status === 404) {
    store.dispatch('toggleErrorCard', true)
  }
  if (response.status === 502) {
    store.dispatch('writeMessage', {
      message: 'Ошибка! Пожалуйста, свяжитесь с отделом техподдержки',
      type: 1
    })
    throw new Error('Ошибка! Пожалуйста, свяжитесь с отделом техподдержки. Сообщение: ' + response.data)
  }
  // if (response.status < 400) throw new Error('FUCK')
  if (typeof response.data === 'string' && !!response.data) {
    store.dispatch('writeMessage', {
      message: 'Ошибка! Пожалуйста, свяжитесь с отделом техподдержки',
      type: 1
    })
    throw new Error('Ошибка! Пожалуйста, свяжитесь с отделом техподдержки. Сообщение: ' + response.data)
  }

  if (response.data.hasOwnProperty('error') && response.data.hasOwnProperty('result_content') && response.data.result_content) {
    store.dispatch('writeMessage', {
      message: response.data.result_content,
      type: response.data.error
    })
  }
  return response
}, error =>
  // Do something with response error
  Promise.reject(error))

export default global
