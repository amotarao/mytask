<template>
  <v-form @submit.prevent="$emit('save', task)">
    <v-card>
      <v-card-title>
        <span class="headline">{{ head }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="tmp.title" label="Title" clearable />
              <v-textarea
                v-model="tmp.description"
                label="Description"
                clearable
              />
              <v-layout wrap>
                <v-flex xs4>
                  <v-text-field
                    v-model="computedStartDate"
                    label="Start Date"
                    type="date"
                    clearable
                  />
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="computedStartTime"
                    label="Start Time"
                    type="time"
                    clearable
                  />
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="computedDuration"
                    label="Duration"
                    type="time"
                    clearable
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green darken-1" flat @click="setNow">Now</v-btn>
        <v-spacer />
        <v-btn color="green darken-1" flat @click="cansel">Cancel</v-btn>
        <v-btn type="submit" color="green darken-1" flat>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { getFormatedDate } from '@/utils/datetime'

export default {
  name: 'task-edit',
  data() {
    return {
      tmp: {},
    }
  },
  props: {
    mode: {
      type: String,
      default: 'new',
      validator(val) {
        return (
          ['new', 'edit'].findIndex(mode => mode === val.toLowerCase()) >= 0
        )
      },
    },
    title: {
      type: String,
      default: '',
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
    head() {
      const mode = this.mode
      return `${mode.charAt(0).toUpperCase()}${mode.slice(1)} Task`
    },
    computedStartDate: {
      get() {
        return getFormatedDate(this.tmp.startDate)
      },
      set(val) {
        if (!val) {
          this.tmp.startDate = null
          return
        }
        const match = val.match(/(\d+)-(\d+)-(\d+)/)
        if (!match) {
          this.tmp.startDate = null
          return
        }
        const [, y, m, d] = match
        this.tmp.startDate = new Date(y, m - 1, d, 0, 0, 0, 0)
      },
    },
    computedStartTime: {
      get() {
        const s = this.tmp.startTime
        if (s === null) return ''
        const hour = `0${Math.floor(s / 60)}`.slice(-2)
        const min = `0${s % 60}`.slice(-2)
        return `${hour}:${min}`
      },
      set(val) {
        if (!val) {
          this.tmp.startTime = null
          return
        }
        const match = val.match(/(\d+):(\d+)/)
        if (!match) {
          this.tmp.startTime = null
          return
        }
        const [, h, m] = match
        this.tmp.startTime = parseInt(h) * 60 + parseInt(m)
      },
    },
    computedDuration: {
      get() {
        const d = this.tmp.duration
        if (d === null) return ''
        const hour = `0${Math.floor(d / 60)}`.slice(-2)
        const min = `0${d % 60}`.slice(-2)
        return `${hour}:${min}`
      },
      set(val) {
        if (!val) {
          this.tmp.duration = null
          return
        }
        const match = val.match(/(\d+):(\d+)/)
        if (!match) {
          this.tmp.duration = null
          return
        }
        const [, h, m] = match
        this.tmp.duration = parseInt(h) * 60 + parseInt(m)
      },
    },
    task() {
      return {
        ...this.tmp,
      }
    },
  },
  methods: {
    resetValues() {
      const { title, description, startDate, startTime, duration } = this
      this.tmp = {
        title,
        description,
        startDate,
        startTime,
        duration,
      }
    },
    setNow() {
      const now = new Date()
      this.tmp.startDate = now
      this.tmp.startTime = now.getHours() * 60 + now.getMinutes()
    },
    cansel() {
      this.$emit('close')
    },
  },
  mounted() {
    this.resetValues()
  },
}
</script>
