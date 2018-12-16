import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import user from './modules/user'
import tasks from './modules/tasks'

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user: user,
    tasks: tasks,
  },
})
