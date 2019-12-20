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
      <h1>Post Edition</h1>
      <PostForm v-if="loaded" :mode="'edition'" :postOrigin="post" />
    </v-flex>
  </v-layout>
</template>

<script>
import PostForm from '~/components/forms/PostForm'

export default {
  middleware: 'auth',
  data() {
    return {
      post: {},
      loaded: false
    }
  },
  components: {
    PostForm
  },
  async mounted() {
    this.post = await this.$store.dispatch(
      'posts/retrievePost',
      this.$route.params.id
    )
    this.loaded = true
  }
}
</script>

<style lang="scss" scoped></style>
