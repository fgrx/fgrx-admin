<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm8 md6>
      <h1>Connexion</h1>
      <v-form ref="form">
        <v-text-field
          name="loginField"
          label="Login"
          id="loginField"
          v-model="login"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="'password'"
          name="passwordField"
          label="Password"
          id="passwordField"
          required
        ></v-text-field>

        <v-btn color="primary" @click="connexion">Connexion</v-btn>
        <v-btn color="secondary" @click="reset">Reset</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: ''
    }
  },
  mounted() {},
  methods: {
    async connexion() {
      await this.$store.dispatch('auth/connectUser', {
        login: this.login,
        password: this.password
      })

      if (this.$store.state.auth.isAuthenticated === true)
        this.$router.push({ path: '/' })
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss" scoped></style>
