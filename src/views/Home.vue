<template>
  <div>
    <toolbar />
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex xs6> <task-list title="Today" :tasks="todayTasks" /> </v-flex>
        <v-flex xs6>
          <task-list title="Future" :tasks="featureTasks" />
        </v-flex>
      </v-layout>
    </v-container>
    <new-task :disabled="!isSignedIn" />
  </div>
</template>

<script>
import TaskList from '@/components/organisms/TaskList.vue'
import Toolbar from '@/components/organisms/Toolbar.vue'
import NewTask from '@/components/organisms/NewTask.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    TaskList,
    Toolbar,
    NewTask,
  },
  computed: {
    ...mapGetters('user', ['user', 'isSignedIn']),
    ...mapGetters('tasks', ['allTasks', 'todayTasks', 'featureTasks']),
  },
  watch: {
    user() {
      if (!this.user) {
        this.stopListener()
        return
      }
      const { uid } = this.user
      this.startListener({ uid })
    },
  },
  methods: {
    ...mapActions('tasks', ['startListener', 'stopListener']),
  },
}
</script>
