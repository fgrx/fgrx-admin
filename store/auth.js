import { fireAuth } from '~/plugins/firebase.js'

export const state = () => ({
  authUser: '',
  isAuthenticated:false,
})

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  },
  SET_IS_AUTHENTICATED(state,auth){
    state.isAuthenticated=auth
  }
}

export const actions = {
  async connectUser({ commit }, { login, password }) {
    try {
      const result = await fireAuth.signInWithEmailAndPassword(login, password)
      commit('SET_IS_AUTHENTICATED', true)
    } catch (error) {
      alert(error)
    }
  },
  verifyUserConnexion({commit}){
    return new Promise((resolve, reject) => {
      fireAuth.onAuthStateChanged(user=>{
        if(user)commit('SET_IS_AUTHENTICATED', true)
        resolve(user)
      });
    });
  }
}
