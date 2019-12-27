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
        to="/portfolio"
      >
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <h1>Portfolio Edition</h1>
      <PortfolioForm v-if="loaded" :mode="'edition'" :itemPortfolioOrigin="itemPortfolio" />
    </v-flex>
  </v-layout>
</template>

<script>
import PortfolioForm from '~/components/forms/PortfolioForm'

export default {
  middleware: 'auth',
  data() {
    return {
      itemPortfolio: {},
      loaded: false
    }
  },
  components: {
    PortfolioForm
  },
  async mounted() {
    this.itemPortfolio = await this.$store.dispatch(
      'portfolio/retrieveItemPortfolio',
      this.$route.params.id
    )
    this.loaded = true
  }
}
</script>

<style lang="scss" scoped></style>
