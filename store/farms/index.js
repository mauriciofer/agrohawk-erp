export const state = () => ({
  farms: [],
  farmsByClient: [],
  farm: {}
})

export const getters = {
  farms: state => state.farms,
  farmsByClient: state => state.farmsByClient,
  getFarmByApplication: state => state.farm,
  getFarm: (state) => (id) => {
    return state.farms.filter((item) => {
      return item.id == id;
    })[0];
  }
}

export const actions = {
  async getFarmById({ commit }, { farmId }) {
    const farmData = [];
    this.$fire.firestore
      .collection("farms")
      .get(farmId)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          farmData.push({ id: doc.id, ...doc.data() });
        });
        commit('setFarm', farmData[0]);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  async getFarms({ commit }) {
    const farmData = [];
    this.$fire.firestore
      .collection("farms")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          farmData.push({ id: doc.id, ...doc.data() });
        });
        commit('setFarms', farmData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  async getFarmsByClient({ commit }, { currentClient }) {
    console.log(currentClient)
    let farmsData = [];

    if (currentClient && currentClient.id) {
      await this.$fire.firestore
        .collection("farms")
        .where("clientId", "==", currentClient.id)
        .orderBy("name")
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
  setFarms(state, farmList) {
    state.farms = farmList
  },
  setFarmsByClient(state, farmsList) {
    state.farmsByClient = farmsList
  },
  setFarm(state, farm) {
    state.farm = farm
  }
}