<template>
  <v-toolbar dark color="green">
    <v-toolbar-title class="white--text">My Task</v-toolbar-title>
    <v-spacer />

    <template v-if="!isSignedIn">
      <v-btn @click="signIn" flat>Sign in</v-btn>
      <v-btn @click="signIn" outline color="white">Sign up</v-btn>
    </template>
    <template v-else>
      <v-menu lazy offset-y right>
        <v-avatar slot="activator" size="36px">
          <img :src="user.photoURL" alt="Avatar" />
        </v-avatar>
        <v-list>
          <v-list-tile @click="signOut">
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </template>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'toolbar',
  computed: {
    ...mapGetters('user', ['user', 'isSignedIn']),
  },
  methods: {
    ...mapActions('user', ['signIn', 'signOut']),
  },
}
</script>

<style lang="scss" scoped>
.user-icon {
  overflow: hidden;
}
</style>
