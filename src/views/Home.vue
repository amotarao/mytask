<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs6> <task-list title="Today" :tasks="todayTasks" /> </v-flex>
      <v-flex xs6> <task-list title="Future" :tasks="featureTasks" /> </v-flex>
    </v-layout>
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      slot="activator"
      color="green"
      @click="dialog = true"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" lasy persistent max-width="800">
      <task-edit
        mode="new"
        @close="dialog = false"
        @save="saveNewTask($event)"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import TaskList from '@/components/organisms/TaskList.vue'
import TaskEdit from '@/components/organisms/TaskEdit.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    TaskList,
    TaskEdit,
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    ...mapGetters('tasks', ['allTasks', 'todayTasks', 'featureTasks']),
  },
  methods: {
    ...mapActions('tasks', ['addTask', 'editTask', 'removeTask']),
    saveNewTask(task) {
      this.addTask({
        task,
      })
      this.dialog = false
    },
  },
}
</script>
