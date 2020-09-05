import Vue from 'vue'
import Vuex from 'vuex'

import toastr from '@/store/modules/toastr'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toastr
  }
})
