<template>
  <div>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 3 : 1}`"
        color="primary"
        @click="editDialog = true"
      >
        <v-card-title>
          <div>
            <span v-if="startTime !== null" class="time">{{ timeText }}</span>
            <span v-if="duration" class="grey--text">{{ durationText }}</span>
            <p class="headline">{{ title }}</p>
            <template v-for="(line, i) in separatedDescription">
              <span v-if="line" :key="`${i}-text`">{{ line }}</span>
              <br
                v-if="i !== separatedDescription.length - 1"
                :key="`${i}-br`"
              />
            </template>
          </div>
        </v-card-title>
      </v-card>
    </v-hover>
    <v-dialog v-model="editDialog" lazy persistent max-width="800">
      <transition>
        <task-edit
          mode="edit"
          v-bind="task"
          @close="editDialog = false"
          @save="editTask($event, id)"
        />
      </transition>
    </v-dialog>
  </div>
</template>

<script>
import TaskEdit from '@/components/organisms/TaskEdit.vue'

import { mapActions } from 'vuex'

import { getFormatedTime } from '@/utils/datetime'

export default {
  name: 'task-card',
  components: {
    TaskEdit,
  },
  data() {
    return {
      editDialog: false,
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '(No Title)',
    },
    description: {
      type: String,
      default: '',
    },
    startDate: {
      default: null,
      validator(val) {
        return val instanceof Date
      },
    },
    startTime: {
      type: Number,
      default: null,
    },
    duration: {
      type: Number,
      default: null,
    },
  },
  computed: {
    task() {
      const { title, description, startDate, startTime, duration } = this
      return {
        title,
        description,
        startDate,
        startTime,
        duration,
      }
    },
    timeText() {
      const sd = this.startDate
      const st = this.startTime
      const d = this.duration

      const time = sd !== null ? new Date(sd.getTime()) : new Date()
      time.setHours(0)
      time.setMinutes(st)
      const start = getFormatedTime(time)
      if (!this.duration) return start

      time.setHours(0)
      time.setMinutes(st + d)
      const end = getFormatedTime(time)
      return `${start} - ${end}`
    },
    durationText() {
      const d = this.duration
      if (d === null) return ''

      const hour = Math.floor(d / 60)
      const min = `0${d % 60}`.slice(-2)
      if (!hour) return `(${min}m)`
      return `(${hour}h${min}m)`
    },
    separatedDescription() {
      return this.description.split('\\n')
    },
  },
  methods: {
    ...mapActions('tasks', ['editTask', 'removeTask']),
  },
}
</script>

<style lang="scss" scoped>
.time {
  margin-right: 0.3em;
}
</style>
