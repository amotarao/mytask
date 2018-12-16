const store = {
  namespaced: true,
  state: {
    user: {},
    status: false,
  },
  mutations: {
    onAuthStateChanged(state, { user }) {
      console.log(user)
      state.user = user
    },
    onUserStatusChanged(state, { status }) {
      console.log(status)
      state.status = status
    },
  },
  actions: {},
  getters: {
    user(state) {
      return state.user
    },
    isSignedIn(state) {
      return state.status
    },
  },
}

export default store
