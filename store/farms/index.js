export const state = () => ({
  farms: [],
  farmsByClient: []
})

export const getters = {
  farms: state => state.farms,
  farmsByClient: state => state.farmsByClient,
  getFarm: state => id => {
    return state.farms.filter(item => {
      return item.id == id
    })[0]
  }
}

export const actions = {  
  async getFarms({ commit }) {
    let farmData = []

    this.$fire.firestore
      .collection('farms')
      .where('active', '==', true)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          farmData.push({ id: doc.id, ...doc.data() })
        })
        commit('setFarms', farmData)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  async getFarmsByClient({ commit }, { currentClient }) {
    let farmsData = []

    if (currentClient && currentClient.id) {
      await this.$fire.firestore
        .collection('farms')
        .where('clientId', '==', currentClient.id)
        .where('active', '==', true)
        .orderBy('name')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            farmsData.push({ id: doc.id, ...doc.data() })
          })
          commit('setFarmsByClient', farmsData)
        })
        .catch(error => {
          throw new Error(error)
        })
    } else {
      commit('setFarmsByClient', farmsData)
    }
  }
}

export const mutations = {
  setFarms(state, farmList) {
    state.farms = farmList
  },
  setFarmsByClient(state, farmsList) {
    state.farmsByClient = farmsList
  }
}
