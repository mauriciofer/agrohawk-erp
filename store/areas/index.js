export const state = () => ({
  farmBlocks: [],
  farmAreas: [],
  areasBySelectedBlocks: [],
  selectedAreas: []
})

export const getters = {
  farmAreas: (state) => state.farmAreas,
  areasBySelectedBlocks: (state) => state.areasBySelectedBlocks,
  selectedAreas: state => state.selectedAreas,

  getAreasByBlock: (state) => (blockId) => {
    return state.farmAreas.filter((item) => {
      return item.blockId == blockId;
    });
  }
}

export const actions = {
  updateAreasBySelectedBlocks({ commit }, { areas }) {
    commit("updateAreasBySelectedBlocks", areas);
  },
  updateSelectedAreas({ commit }, { areas }) {
    commit('updateSelectedAreas', areas)
  },
  async getAreas({commit}) {
    const areasData = [];
    this.$fire.firestore
      .collection("areas")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          areasData.push({ id: doc.id, ...doc.data() });
        });
        commit('setAreas', areasData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  async getFarmAreas({ commit }, { farmId }) {
    let areasData = [];

    if (farmId) {
      await this.$fire.firestore
        .collection("areas")
        .where("farmId", "==", farmId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            areasData.push({ id: doc.id, ...doc.data() });
          });
          commit("setFarmAreas", areasData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      commit("setFarmAreas", areasData);
    }
  },
}

export const mutations = {
  setFarmAreas(state, areaList) {
    state.farmAreas = areaList;
  },
  updateAreasBySelectedBlocks(state, areas) {
    state.areasBySelectedBlocks = areas;
  },
  updateSelectedAreas(state, areas) {
    state.selectedAreas = areas
  }
}