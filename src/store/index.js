import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import tasks from './modules/tasks'

export default new Vuex.Store({
  modules: {
    user: user,
    tasks: tasks,
  },
})
