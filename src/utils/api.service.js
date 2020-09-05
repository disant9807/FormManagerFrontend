import axios from '@/utils/axios-global'

function dataFunc (obj, method) {
  // Создаем пустой объект
  const data = new FormData()
  // Добавляем в созданный объект поля
  // Если obj не null добавляем в data ключ-значени obj
  if (obj) Object.keys(obj).forEach(key => data.append(key, obj[key]))

  if (method) data.append('_method', method)

  return data
}

const ApiService = {
  get (url, params) {
    return axios.get(url, { params: params })
  },
  post (url, data = {}, params) {
    const formData = dataFunc(data)
    return axios.post(url, formData, params)
  }
}

export default ApiService
