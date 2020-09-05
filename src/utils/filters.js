import Vue from 'vue'
import { shortUserName, numberWithSpaces } from '@/assets/js/helpers'

Vue.filter('shortUsername', shortUserName)
Vue.filter('numberWithSpaces', numberWithSpaces)
