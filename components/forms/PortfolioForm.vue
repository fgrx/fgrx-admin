<template>
  <div>
    <v-alert v-if="success" type="success" dismissible>
      Portfolio saved
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

      <v-text-field v-model="image" label="Image"></v-text-field>

      <v-textarea
        label="Description"
        rows="7"
        v-model="description"
      ></v-textarea>

      <v-text-field v-model="url" label="URL"></v-text-field>

      <v-text-field v-model="github" label="URL Github"></v-text-field>

      <v-text-field v-model="rank" label="Order"></v-text-field>

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
  Image,
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
  props: ['mode', 'itemPortfolioOrigin'],
  data() {
    return {
      success: false,
      fail: false,
      valid: true,
      title: '',
      description: '',
      url: '',
      github: '',
      rank: 0,
      image: '',
      id: '',
      nameRules: [(v) => !!v || 'This field is required'],
      extensions: [
        History,
        Blockquote,
        Image,
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
      this.id = this.itemPortfolioOrigin.id
      this.title = this.itemPortfolioOrigin.title
      this.description = this.itemPortfolioOrigin.description != undefined ? this.itemPortfolioOrigin.description : null
      this.url = this.itemPortfolioOrigin.url != undefined ? this.itemPortfolioOrigin.url : null
      this.github = this.itemPortfolioOrigin.github != undefined ? this.itemPortfolioOrigin.github : null
      this.rank = this.itemPortfolioOrigin.rank != undefined ? this.itemPortfolioOrigin.rank : null
      this.image = this.itemPortfolioOrigin.image != undefined ? this.itemPortfolioOrigin.image : null
    }
  },
  methods: {
    validate() {
      const itemPortfolio = this.buildItemPortfolio()
      if (this.mode === 'edition') {
        this.updateItemPortfolio(itemPortfolio)
      } else {
        this.saveNewItemPortfolio(itemPortfolio)
      }
    },
    saveNewItemPortfolio(itemPortfolio) {
      this.success = this.$store.dispatch('portfolio/addItemPortfolio', itemPortfolio)
      this.$router.replace({ path: '/portfolio' })
    },
    updateItemPortfolio(itemPortfolio) {
      itemPortfolio.id = this.id
      try {
        this.$store.dispatch('portfolio/updateItemPortfolio', itemPortfolio)
      } catch (error) {
        this.fail = true
      }
      this.success = true
    },

    buildItemPortfolio() {
      return {
        title: this.title,
        description: this.description,
        url: this.url,
        github: this.github,
        rank: this.rank,
        image: this.image
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
