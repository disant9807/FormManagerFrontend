import Vue from 'vue'

const state = {
}
const mutations = {
}

const actions = {
  writeMessage ({ commit }, { message, type = 0, time = undefined }) {
    const groupType = !type ? 'success' : type === 1 ? 'danger' : 'info'
    let duration = time !== undefined
      ? time
      : groupType === 'success' ? 1000 : 5000
    Vue.prototype.$notify({
      group: 'system',
      type: groupType,
      text: message,
      duration: duration
    })
  },
  writeMessageCenter ({ commit }, { message, type = 0 }) {
    const groupType = !type ? 'success' : type === 1 ? 'danger' : 'info'
    Vue.prototype.$notify({
      group: 'center',
      type: groupType,
      text: message,
      duration: groupType === 'success' ? 1000 : 5000
    })
  }
}

const getters = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
