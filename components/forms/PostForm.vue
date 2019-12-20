<template>
  <div>
    <v-alert v-if="success" type="success" dismissible>
      Post saved
    </v-alert>

    <v-alert v-if="fail" type="danger" dismissible>
      An error has occured
    </v-alert>

    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="title"
        label="Title"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-text-field v-model="subtitle" label="Subtitle"></v-text-field>

      <v-text-field
        v-model="slug"
        label="Slug"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-text-field v-model="image" label="Image"></v-text-field>

      <v-textarea label="Resumé" rows="4" v-model="resume"></v-textarea>

      <tiptap-vuetify
        label="Content"
        v-model="content"
        :extensions="extensions"
      />

      <v-checkbox v-model="published" label="Published ?"></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'

export default {
  components: { TiptapVuetify },
  props: ['mode', 'postOrigin'],
  data() {
    return {
      success: false,
      fail: false,
      valid: true,
      title: '',
      slug: '',
      date: '',
      resume: '',
      subtitle: '',
      content: '',
      image: '',
      published: '',
      id: '',
      nameRules: [(v) => !!v || 'This field is required'],
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    }
  },
  mounted() {
    this.success = false
    this.fail = false
    if (this.mode === 'edition') {
      this.id = this.postOrigin.id
      this.title = this.postOrigin.title
      this.resume = this.postOrigin.resume
      this.slug = this.postOrigin.slug
      this.subtitle = this.postOrigin.subtitle
      this.content = this.postOrigin.content
      this.image = this.postOrigin.image
      this.published = this.postOrigin.published
    }
  },
  methods: {
    validate() {
      const post = this.buildPost()
      if (this.mode === 'edition') {
        this.updatePost(post)
      } else {
        this.saveNewPost(post)
      }
    },
    saveNewPost(post) {
      this.success = this.$store.dispatch('posts/addPost', post)
    },
    updatePost(post) {
      post.id = this.id
      try {
        this.$store.dispatch('posts/updatePost', post)
      } catch (error) {
        console.log('failed to update ' + error)
        this.fail = true
      }
      this.success = true
    },
    buildPost() {
      let datePost = new Date()

      return {
        title: this.title,
        slug: this.slug,
        date: this.date,
        resume: this.resume,
        subtitle: this.subtitle,
        content: this.content,
        image: this.image,
        published: this.published,
        date: datePost
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
