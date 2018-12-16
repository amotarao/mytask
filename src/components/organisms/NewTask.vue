<template>
  <div v-if="!disabled">
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
        :saveLoading="saveLoading"
        @close="dialog = false"
        @save="saveNewTask($event)"
      />
    </v-dialog>
  </div>
</template>

<script>
import TaskEdit from '@/components/organisms/TaskEdit.vue'

import { mapActions } from 'vuex'

export default {
  name: 'new-task',
  components: {
    TaskEdit,
  },
  data() {
    return {
      dialog: false,
      saveLoading: false,
    }
  },
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    async saveNewTask(task) {
      this.saveLoading = true
      await this.addTask({
        task,
      })
      this.saveLoading = false
      this.dialog = false
    },
  },
}
</script>
