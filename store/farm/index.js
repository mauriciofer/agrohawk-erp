export const state = () => ({
  farms: [],
  farmsByClient: [],
})

export const getters = {
  farms: state => state.farms,
  farmsByClient: state => state.farmsByClient
}

export const actions = {
  async getFarms({ commit }) {
    const farmData = [];
    this.$fire.firestore
      .collection("farms")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          farmData.push({ id: doc.id, ...doc.data() });
        });
        commit('setfarms', farmData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  async getFarmsByClient({ commit }, { currentClient }) {
    let farmsData = [];
    
    if (currentClient) {
        await this.$fire.firestore
            .collection("farms")
            .where("clientId", "==", currentClient.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  farmsData.push({ id: doc.id, ...doc.data() });
                });
                commit('setFarmsByClient', farmsData);
            })
            .catch((error) => {
                throw new Error(error);
            });
    } else {
        commit('setFarmsByClient', farmsData);
    }
  }
}

export const mutations = {
  setfarms(state, farmList) {
    state.farms = farmList
  },
  setFarmsByClient(state, farmsList) {
    state.farmsByClient = farmsList
  }
}