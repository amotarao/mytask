<template>
  <div>
    <h2 class="display-1">{{ title }}</h2>
    <v-layout mt-3 row wrap>
      <v-flex xs12>
        <task-card title="あいうえお" :start-time="new Date()" :duration="70" />
      </v-flex>
      <v-flex xs12>
        <task-card
          title="あいうえお"
          description="説明説明"
          :start-time="new Date()"
          :duration="70"
        />
      </v-flex>
      <v-flex xs12>
        <task-card
          title="あいうえお"
          description="説明説明\n複数行\n説明説明\n複数行\n説明説明\n複数行"
          :start-time="new Date()"
          :duration="70"
        />
      </v-flex>
      <v-flex xs12> <task-card title="あいうえお" :duration="30" /> </v-flex>
      <v-flex xs12> <task-card title="あいうえお" :duration="65" /> </v-flex>
      <v-flex xs12>
        <task-card title="あいうえお" :start-time="new Date()" />
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
  },
}
</script>
