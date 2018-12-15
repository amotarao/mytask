const initialState = {
  tasks: [],
}

const generateID = () => {
  return Math.random()
    .toString(36)
    .slice(-8)
}

const store = {
  namespaced: true,
  state: initialState,
  mutations: {
    postTask(state, task) {
      let id
      while (!id || state.tasks.findIndex(task => task.id === id) >= 0) {
        id = generateID()
      }

      state.tasks.push({
        ...task,
        id,
        createAt: new Date(),
        updateAt: new Date(),
      })
    },
    putTask(state, id, task) {
      const index = state.tasks.findIndex(task => task.id === id)
      const oldTask = state.tasks[index]

      state.tasks[index] = {
        ...oldTask,
        ...task,
        updateAt: new Date(),
      }
    },
    deleteTask(state, id) {
      const index = state.tasks.findIndex(task => task.id === id)
      state.tasks = state.tasks.filter(task => task.id !== index)
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit('postTask', task)
    },
    editTask({ commit }, id, task) {
      commit('putTask', id, task)
    },
    removeTask({ commit }, id) {
      commit('deleteTask', id)
    },
  },
  getters: {
    task: state => id => {
      return state.tasks.find(task => task.id === id)
    },
    allTasks: state => {
      return state.tasks
    },
    todayTasks: state => {
      const now = new Date()
      now.setHours(0)
      now.setMinutes(0)
      now.setSeconds(0)

      return state.tasks.filter(task => {
        task.startDate >= now || !task.startDate
      })
    },
    featureTasks: state => {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      now.setHours(0)
      now.setMinutes(0)
      now.setSeconds(0)

      return state.tasks.filter(
        task => task.startDate >= now || !task.startDate
      )
    },
  },
}

export default store
