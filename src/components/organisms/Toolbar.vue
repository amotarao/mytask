<template>
  <v-toolbar dark color="green">
    <v-toolbar-title class="white--text">My Task</v-toolbar-title>
    <v-spacer />

    <template v-if="!isSignedIn">
      <v-btn @click="startSignIn" flat>Sign in</v-btn>
      <v-btn @click="startSignIn" outline color="white">Sign up</v-btn>
    </template>
    <template v-else>
      <v-avatar size="36px">
        <img :src="user.photoURL" alt="Avatar" />
      </v-avatar>
    </template>
  </v-toolbar>
</template>

<script>
import { signIn } from '@/plugins/firebase'

import { mapGetters } from 'vuex'

export default {
  name: 'toolbar',
  computed: {
    ...mapGetters('user', ['user', 'isSignedIn']),
  },
  methods: {
    startSignIn() {
      signIn()
    },
  },
}
</script>

<style lang="scss" scoped>
.user-icon {
  overflow: hidden;
}
</style>
