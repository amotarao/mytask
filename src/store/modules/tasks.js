import Vue from 'vue'

import { firestore } from '@/plugins/firebase'
import { getFormatedDate } from '@/utils/datetime'

const ref = firestore.collection('tasks')

const store = {
  namespaced: true,
  state: {
    unsubscribe: null,
    uid: null,
    tasks: [],
  },
  mutations: {
    addTask(state, { task }) {
      state.tasks.push(task)
    },
    modifiyTask(state, { id, task }) {
      const index = state.tasks.findIndex(task => task.id === id)

      // @see https://forum.vuejs.org/t/vuex-2-getters-not-updating/8609
      Vue.set(state.tasks, index, task)
    },
    removeTask(state, { id }) {
      const index = state.tasks.findIndex(task => task.id === id)
      state.tasks = state.tasks.filter(task => task.id !== index)
    },
  },
  actions: {
    startListener({ state, commit }, { uid }) {
      state.uid = uid

      if (!uid || state.unsubscribe) {
        state.tasks = []
        state.unsubscribe()
        state.unsubscribe = null
      }

      if (!uid) return

      state.unsubscribe = ref.where('author', '==', uid).onSnapshot(
        querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            const { id } = change.doc
            const {
              title,
              description,
              startDate,
              startTime,
              duration,
            } = change.doc.data()

            const task = {
              id,
              title,
              description,
              startDate: startDate && startDate.toDate(),
              startTime,
              duration,
            }

            switch (change.type) {
              case 'added':
                commit('addTask', { task })
                break
              case 'modified':
                commit('modifiyTask', { id, task })
                break
              case 'removed':
                commit('removeTask', { id })
                break
            }
          })
        },
        error => {
          console.error(error)
        }
      )
    },
    stopListener({ state }) {
      state.tasks = []
      state.uid = null

      if (state.unsubscribe) {
        state.unsubscribe()
        state.unsubscribe = null
      }
    },
    async addTask({ state }, { task }) {
      try {
        await ref.add({
          ...task,
          author: state.uid,
          createAt: new Date(),
          updateAt: new Date(),
        })
      } catch (err) {
        console.error(err)
      }
    },
    async editTask({ state }, { id, task }) {
      try {
        await ref.doc(id).update({
          ...task,
          author: state.uid,
          updateAt: new Date(),
        })
      } catch (err) {
        console.error(err)
      }
    },
    async removeTask(context, { id }) {
      try {
        await ref.doc(id).delete()
      } catch (err) {
        console.error(err)
      }
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
      const today = new Date()
      const now = getFormatedDate(today)

      return state.tasks
        .filter(task => getFormatedDate(task.startDate) === now)
        .sort((a, b) => a.startTime - b.startTime)
    },
    featureTasks: state => {
      const today = new Date()
      const now = getFormatedDate(today)

      return state.tasks.filter(task => {
        return getFormatedDate(task.startDate) > now || !task.startDate
      })
    },
  },
}

export default store
