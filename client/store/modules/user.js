
const user = {
  namespaced: true,
  state: {
    userInfo: {},
  },

  mutations: {
    SET_USER: (state, data) => {
      const { userInfo, status } = data
      state.userInfo = userInfo
      state.status = status
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      commit('SET_USER', {
        userInfo: {},
        status: 200
      })
    },
  }
}

export default user
