<template>
  <div class="home">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6> <task-list title="今日のタスク" /> </v-flex>
        <v-flex xs6> <task-list title="いつかやるタスク" /> </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TaskList from '@/components/organisms/TaskList.vue'

export default {
  name: 'home',
  components: {
    TaskList,
  },
}
</script>
