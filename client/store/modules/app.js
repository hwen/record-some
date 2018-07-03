const app = {
  namespaced: true,
  state: {
    visitedViews: [],
    currentOptAct: {},
    currentModule: null
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_OPT_ACT: (state, store) => {
      Object.assign(state.currentOptAct, store)
    },
    SET_CURRENT_MODULE: (state, store) => {
      state.currentModule = store
    }
  },
  actions: {
    ToggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    SetCurrentOptAct ({ commit }, store) {
      commit('SET_OPT_ACT', store)
    },
    SetCurrentModule ({commit}, store) {
      commit('SET_CURRENT_MODULE', store)
    }
  }
}

export default app
