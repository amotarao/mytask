<template>
  <div>
    <v-flex tag="h2" class="display-1" ma-2>{{ title }}</v-flex>
    <v-layout row wrap>
      <v-flex xs12 ma-2 v-for="task in tasks" :key="task.id">
        <task-card
          :title="task.title"
          :description="tasks.description"
          :start-date="task.startDate"
          :start-time="task.startTime"
          :duration="task.duration"
        />
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
}
</script>
