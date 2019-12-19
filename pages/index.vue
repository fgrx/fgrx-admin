<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Adminstration</h1>

      <v-btn v-if="!isBuilding" color="success" @click="build"
        >Build the blog !</v-btn
      >

      <div v-if="isBuilding">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
        Building !
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      isBuilding: false
    }
  },
  middleware: 'auth',
  methods: {
    build() {
      this.isBuilding = true
      
      return this.$axios
        .get(
          `https://api.zeit.co/v1/integrations/deploy/QmbrY4Gq5AsXSrEaV7cWtqipxjPbu9mJnfDLRchCRKsZsG/JibcJ2CXIu`
        )
        .then((res) => {
          this.isBuilding = false
        })
    }
  }
}
</script>
