<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn
        class="top-button"
        fab
        dark
        color="indigo"
        absolute
        top
        left
        to="/"
      >
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>

      <v-btn
        class="top-button"
        fab
        dark
        color="indigo"
        absolute
        top
        right
        to="/portfolio/add"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <h1>Portfolio management</h1>
      <v-list two-line subheader>
        <template v-for="(itemPortfolio, index) in portfolio">
          <v-list-item
            :key="itemPortfolio.title"
          >
            <v-list-item-content>
              <v-list-item-title v-text="itemPortfolio.title"></v-list-item-title>
              <v-list-item-subtitle
                v-text="'Rank :' + itemPortfolio.rank"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <nuxt-link :to="{ name: 'portfolio-id', params: { id: itemPortfolio.id } }">
                  <v-icon color="grey lighten-1">mdi-pen</v-icon>
                </nuxt-link>
              </v-btn>
              <v-btn @click="deletePortfolio(itemPortfolio.id)" icon>
                <v-icon color="red lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider v-if="index + 1 < portfolio.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      portfolio: (this.portfolio = this.$store.state.portfolio.Portfolio)
    }
  },
  created() {
    if (this.$store.getters['portfolio/getPortfolio'].length === 0)
      this.$store.dispatch('portfolio/fetchPortfolio')
  },
  methods: {
    deletePortfolio(id) {
      var result = confirm('Do you really want to delete ?')
      if (result) this.$store.dispatch('portfolio/removePortfolio', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.unpublished {
  background-color: rgb(235, 235, 235);
}
</style>
