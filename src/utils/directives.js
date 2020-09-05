import Vue from 'vue'
import { directive as onClickaway } from 'vue-clickaway'

// Глобальные директивы
Vue.directive('focus', {
  // Когда привязанный элемент вставлен в DOM, переключаем фокус на элемент
  inserted: el => el.focus()
})
Vue.directive('onClickaway', onClickaway)
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
