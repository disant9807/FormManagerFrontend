import Vue from 'vue'
import Router from 'vue-router'
import Records from '@/pages/records/_router'
Vue.use(Router)

const routes = [ Records ]

const router = new Router({
  mode: 'history',
  routes
})

router.onError(err => {
  console.log(err)
  console.log(err.response)

  if (/loading chunk .* failed./i.test(err)) {
    router.go(0)
  }
})

export default router
