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
        right
        to="/posts/add"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <h1>Posts management</h1>
      <v-list two-line subheader>
        <template v-for="(post, index) in posts">
          <v-list-item
            :key="post.title"
            v-bind:class="{ unpublished: !post.published }"
          >
            <v-list-item-content>
              <v-list-item-title v-text="post.title"></v-list-item-title>
              <v-list-item-subtitle
                v-text="post.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <nuxt-link :to="{ name: 'Posts-id', params: { id: post.id } }">
                  <v-icon color="grey lighten-1">mdi-pen</v-icon>
                </nuxt-link>
              </v-btn>
              <v-btn @click="deletePost(post.id)" icon>
                <v-icon color="red lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider v-if="index + 1 < posts.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      posts: (this.posts = this.$store.state.posts.posts)
    }
  },
  created() {
    if (this.$store.getters['posts/getPosts'].length === 0)
      this.$store.dispatch('posts/fetchPosts')
  },
  methods: {
    deletePost(id) {
      var result = confirm('Do you really want to delete ?')
      if (result) this.$store.dispatch('posts/removePost', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.unpublished {
  background-color: rgb(235, 235, 235);
}
</style>
