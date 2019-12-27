<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm8 md6>
      <v-btn
        class="top-button"
        fab
        dark
        color="indigo"
        absolute
        top
        left
        to="/posts"
      >
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <h1>Add a portfolio</h1>
      <PortfolioForm :mode="'add'" />
    </v-flex>
  </v-layout>
</template>

<script>
import PortfolioForm from '~/components/forms/PortfolioForm'

export default {
  middleware: 'auth',
  components: {
    PortfolioForm
  }
}
</script>

<style lang="scss" scoped></style>
