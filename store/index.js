export const state = () => ({
  currentUser: {}
})

export const getters = {

  currentUser: state => {
    return state.currentUser
  }

}

export const actions = {  
  async login({commit}, {email, password}) {
    console.log("LOGIN");
    await this.$fire.auth.signInWithEmailAndPassword(email, password);
    const userData = await this.$fire.auth.currentUser.getIdTokenResult();
    console.log(userData.claims);
    commit('setCurrentUser', userData.claims);
  },
}

export const mutations = {
  setCurrentUser (state, user){
    state.currentUser = user
  }
}