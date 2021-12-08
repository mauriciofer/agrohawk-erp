export const state = () => ({
  farmAreas: [],
  blockAreas: [],
  areasBySelectedBlocks: [],
  selectedAreas: []
})

export const getters = {
  farmAreas: (state) => state.farmAreas,
  blockAreas: (state) => state.blockAreas,
  areasBySelectedBlocks: (state) => state.areasBySelectedBlocks,
  selectedAreas: state => state.selectedAreas,

  getAreasByBlock: (state) => (blockId) => {
    return state.farmAreas.filter((item) => {
      return item.blockId == blockId;
    });
  },

  getAreaText: state => id => {
    if(typeof state.farmAreas !== 'undefined'){
      return state.farmAreas.filter(item => {
        return item.id == id
      })[0].name
    } else {
      return ""
    }
  },

  getArea: (state) => (id) => {
    return state.blockAreas.filter((item) => {
      return item.id == id;
    })[0];
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
      .where("active", "==", true)
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
        .where("active", "==", true)
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
  async getBlockAreas({ commit }, { blockId }) {
    let areasData = [];
    if (blockId) {
      await this.$fire.firestore
        .collection("areas")
        .where("blockId", "==", blockId)
        .where('active', '==', true)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            areasData.push({ id: doc.id, ...doc.data() });
          });
          commit("setBlockAreas", areasData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      commit("setBlockAreas", areasData);
    }
  }
}

export const mutations = {
  setFarmAreas(state, areaList) {
    state.farmAreas = areaList;
  },
  setBlockAreas(state, blockList) {
    state.blockAreas = blockList;
  },
  updateAreasBySelectedBlocks(state, areas) {
    state.areasBySelectedBlocks = areas;
  },
  updateSelectedAreas(state, areas) {
    state.selectedAreas = areas
  }
}
