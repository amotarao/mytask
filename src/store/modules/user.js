import firebase from '@/plugins/firebase'

const provider = new firebase.auth.GoogleAuthProvider()

const store = {
  namespaced: true,
  state: {
    user: {},
    status: false,
  },
  mutations: {
    onAuthStateChanged(state, { user }) {
      state.user = user
    },
    onUserStatusChanged(state, { status }) {
      state.status = status
    },
  },
  actions: {
    signIn: () => {
      firebase.auth().signInWithPopup(provider)
    },
    signOut: () => {
      firebase.auth().signOut()
    },
  },
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
