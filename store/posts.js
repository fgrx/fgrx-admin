import { fireDB } from '~/plugins/firebase.js'
import Vue from 'vue'

export const state = () => ({
  posts: []
})

export const mutations = {
  ADD_POST(state, post) {
    state.posts.unshift(post)
  },
  RESET_POSTS() {
    state.posts = []
  },
  REMOVE_POST(state, id) {
    const indexPost = state.posts.findIndex(item => item.id === id)
    state.posts.splice(indexPost,1);
  },
  UPDATE_POST(state,post){
    state.posts= state.posts.map(postItem=>{
      if(postItem.id===post.id)return Object.assign({},postItem,post)
      return postItem
    })
  }
}

export const getters = {
  getPosts: (state) => {
    return state.posts
  }
}

export const actions = {
  async resetPosts({ commit }) {
    commit('RESET_POSTS')
  },
  removePost({commit},id){
    fireDB.collection("posts").doc(id).delete()
    commit('REMOVE_POST',id)
  },
  async addPost({commit},postData){
    const postRefFirestore = await fireDB.collection("posts").add(postData)
    const post=actions.buildPostFromData(postRefFirestore.id,postData)
    commit('ADD_POST', post)
  },
  async updatePost({commit},post){
    commit('UPDATE_POST',post)
    const postRefFirestore=fireDB.collection("posts").doc(post.id)
    await postRefFirestore.update(post)
  },
  async retrievePost({commit},id){
    const refPost = fireDB.collection("posts").doc(id)
    const postObj = await refPost.get()
    const post= actions.buildPostFromData(postObj.id,postObj.data())
    return post
  },
  async fetchPosts({ commit }) {
    let refPosts = fireDB.collection('posts').orderBy('date', 'asc')
    const postsCollection = await refPosts.get()
    
    const posts=[]
    postsCollection.forEach((postItem) => {
      let post = actions.buildPostFromData(postItem.id, postItem.data())
      commit('ADD_POST', post)
    })
  },
  buildPostFromData(postId,postData) {
    return {
      id:postId,
      title: postData.title,
      slug: postData.slug,
      date: postData.date,
      resume: postData.resume,
      subtitle: postData.subtitle,
      content: postData.content,
      image: postData.image,
      published: postData.published
    }
  }
}
