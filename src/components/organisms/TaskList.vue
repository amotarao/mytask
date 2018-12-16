<template>
  <div>
    <v-flex tag="h2" class="display-1" ma-2>{{ title }}</v-flex>
    <v-layout row wrap>
      <v-flex xs12 ma-2 v-for="task in propsFilterdTasks" :key="task.id">
        <task-card v-bind="task" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import TaskCard from '@/components/molecules/TaskCard.vue'

export default {
  name: 'task-list',
  components: {
    TaskCard,
  },
  props: {
    title: {
      type: String,
    },
    tasks: {
      type: Array,
    },
  },
  computed: {
    propsFilterdTasks() {
      return this.tasks.map(task => {
        const { id, title, description, startDate, startTime, duration } = task
        return {
          id,
          title,
          description,
          startDate,
          startTime,
          duration,
        }
      })
    },
  },
}
</script>
