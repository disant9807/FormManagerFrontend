import Vue from 'vue'
import router from './router'
import store from './store/store'
import App from './App'
import './utils/filters'
import './utils/directives'
import './utils/components'

import Notifications from 'vue-notification'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(Notifications)

Vue.config.productionTip = false
Vue.config.performance = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
