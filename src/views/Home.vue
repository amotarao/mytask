<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs6> <task-list title="Today" :tasks="todayTasks" /> </v-flex>
      <v-flex xs6> <task-list title="Future" :tasks="featureTasks" /> </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="800">
      <v-btn fixed dark fab bottom right slot="activator" color="green">
        <v-icon>add</v-icon>
      </v-btn>
      <task-edit mode="new" @close="dialog = false" @save="addTask($event)" />
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
  },
}
</script>
