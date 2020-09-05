import Vue from 'vue'
import { BNavbar, BPopover, BTooltip, TooltipPlugin, NavbarPlugin, ModalPlugin, BFormCheckbox } from 'bootstrap-vue'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import '@/utils/fontAwesomeIcons'
import appBtn from '@/components/buttons/app-btn'

Vue.component('app-btn', appBtn)
Vue.component('b-form-checkbox', BFormCheckbox)
Vue.component('b-navbar', BNavbar)
Vue.component('b-popover', BPopover)
Vue.component('b-tooltip', BTooltip)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.use(NavbarPlugin)
Vue.use(ModalPlugin)
Vue.use(TooltipPlugin)
