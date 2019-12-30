import { fireDB } from '~/plugins/firebase.js'

export const state = () => ({
  Portfolio: []
})

export const mutations = {
  ADD_ITEMPORTFOLIO(state, itemPortfolio) {
    state.Portfolio.unshift(itemPortfolio)
  },
  RESET_PORTFOLIO() {
    state.Portfolio = []
  },
  REMOVE_ITEMPORTFOLIO(state, id) {
    const indexItemPortfolio = state.Portfolio.findIndex(item => item.id === id)
    state.Portfolio.splice(indexItemPortfolio,1);
  },
  UPDATE_ITEMPORTFOLIO(state,itemPortfolio){
    state.Portfolio= state.Portfolio.map(item=>{
      if(itemPortfolio.id===item.id)return Object.assign({},itemPortfolio,item)
      return item
    })
  }
}

export const getters = {
  getPortfolio: (state) => {
    return state.Portfolio
  }
}

export const actions = {
  async resetPortfolio({ commit }) {
    commit('RESET_Portfolio')
  },
  removeItemPortfolio({commit},id){
    fireDB.collection("portfolio").doc(id).delete()
    commit('REMOVE_ITEMPORTFOLIO',id)
  },
  async addItemPortfolio({commit},itemPortfolioData){
    const RefFirestore = await fireDB.collection("portfolio").add(itemPortfolioData)
    const itemPortfolio=actions.buildItemPortfolioFromData(RefFirestore.id,itemPortfolioData)
    commit('ADD_ITEMPORTFOLIO', itemPortfolio)
  },
  async updateItemPortfolio({commit},itemPortfolio){
    commit('UPDATE_ITEMPORTFOLIO',itemPortfolio)
    const RefFirestore=fireDB.collection("portfolio").doc(itemPortfolio.id)
    await RefFirestore.update(itemPortfolio)
  },
  async retrieveItemPortfolio({commit},id){
    const RefFirestore = fireDB.collection("portfolio").doc(id)
    const itemPortfolioObj = await RefFirestore.get()
    const itemPortfolio= actions.buildItemPortfolioFromData(itemPortfolioObj.id,itemPortfolioObj.data())
    return itemPortfolio
  },
  async fetchPortfolio({ commit }) {
    let RefFirestore= fireDB.collection('portfolio').orderBy('rank', 'asc')
    const PortfolioCollection = await RefFirestore.get()

    PortfolioCollection.forEach((item) => {
      const itemPortfolio = actions.buildItemPortfolioFromData(item.id, item.data())
      commit('ADD_ITEMPORTFOLIO', itemPortfolio)
    })
  },
  buildItemPortfolioFromData(itemPortfolioId,itemPortfolioData) {
    return {
      id:itemPortfolioId,
      description: itemPortfolioData.description,
      rank: itemPortfolioData.rank,
      tech: itemPortfolioData.tech,
      github: itemPortfolioData.github,
      url: itemPortfolioData.url,
      title: itemPortfolioData.title,
      image: itemPortfolioData.image,
    }
  }
}
