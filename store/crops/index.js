export const state = () => ({
  farmBlocks: [],
  farmCrops: [],
  cropsBySelectedAreas: []
})

export const getters = {
  crops: state => state.crops,
  farmCrops: (state) => state.farmCrops,
  cropsBySelectedAreas: (state) => state.cropsBySelectedAreas,

  getCropsByArea: (state) => (areaId) => {
    return state.farmCrops.filter((item) => {
      return item.blockId == areaId;
    });
  }
}

export const actions = {  
  updateCropsBySelectedAreas({ commit }, { crops }) {
    commit("updateCropsBySelectedAreas", crops);
  },
  async getCrops({commit}) {
    const cropsData = [];
    this.$fire.firestore
      .collection("crops")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cropsData.push({ id: doc.id, ...doc.data() });
        });
        commit('setCrops', cropsData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  async getFarmCrops({ commit }, { farmId }) {
    let cropsData = [];

    if (farmId) {
      await this.$fire.firestore
        .collection("crops")
        .where("farmId", "==", farmId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cropsData.push({ id: doc.id, ...doc.data() });
          });
          commit("setFarmCrops", cropsData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      commit("setFarmBlocks", cropsData);
    }
  },
}

export const mutations = {
  setCrops (state, cropsList){
    state.crops = cropsList
  },
  setFarmCrops(state, cropList) {
    state.farmCrops = cropList;
  },
  updateCropsBySelectedAreas(state, crops) {
    state.cropsBySelectedAreas = crops;
  },
}