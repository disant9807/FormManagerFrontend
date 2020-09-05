import ApiService from '@/utils/api.service'

const Api = {
  save (data) {
    return ApiService.post('api', data)
  },
  delete (id) {
    return ApiService.post(`api/${id}/delete`)
  },
  getForm (id) {
    return ApiService.get(`api/${id}`)
  }
}

export default Api
