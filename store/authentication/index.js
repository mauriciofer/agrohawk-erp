  export const state = () => ({
  currentUser: null
})

export const getters = {
  currentUser: state => state.currentUser
}

export const actions = {  
  async login({commit}, {email, password}) {
    await this.$fire.auth.signInWithEmailAndPassword(email, password);
    const userData = await this.$fire.auth.currentUser.getIdTokenResult();
    console.log(userData.claims)
    commit('setCurrentUser', userData.claims);
  },
}

export const mutations = {
  setCurrentUser (state, user){
    state.currentUser = user
  },
  removeCurrentUser (state){
    state.currentUser = {}
  }
}