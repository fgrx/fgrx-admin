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
      <h1>Add a post</h1>
      <PostForm :mode="'add'" />
    </v-flex>
  </v-layout>
</template>

<script>
import PostForm from '~/components/forms/PostForm'

export default {
  middleware: 'auth',
  components: {
    PostForm
  }
}
</script>

<style lang="scss" scoped></style>
