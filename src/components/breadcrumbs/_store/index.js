const state = {
  activeRouteId: null
}

const mutations = {
  'SET_ACTIVE_ROUTE_ID': (state, { id, bcTitle }) => {
    state.activeRouteId = {
      id: id,
      title: bcTitle
    }
  }
}

const actions = {
  updateActiveRouteId ({ commit }, { id, bcTitle }) {
    commit('SET_ACTIVE_ROUTE_ID', { id, bcTitle })
  }
}

const getters = {
  getActiveRoute: (state) => state.activeRouteId
}

export default {
  state,
  mutations,
  actions,
  getters
}
