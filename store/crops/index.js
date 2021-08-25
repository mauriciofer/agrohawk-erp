export const state = () => ({
  farmBlocks: [],
  farmCrops: [],
  cropsBySelectedBlocks: [],
  cropById: {},
  cropsBySelectedAreas: []
})

export const getters = {
  crops: state => state.crops,
  farmCrops: (state) => state.farmCrops,
  cropsBySelectedBlocks: (state) => state.cropsBySelectedBlocks,
  cropsBySelectedAreas: (state) => state.cropsBySelectedAreas,
  getCropsByArea: (state) => (areaId) => {
    return state.farmCrops.filter((item) => {
      return item.areaId == areaId;
    });
  },
  cropById: state => state.cropById,
}

export const actions = {  
  updateCropsBySelectedAreas({ commit }, { crops }) {
    commit("updateCropsBySelectedAreas", crops);
  },
  async getCrops({commit}) {
    let cropsData = [];

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
  async getCropById({ commit }, { cropId }) {
    await this.$fire.firestore
      .collection("crops")
      .doc(cropId)
      .get()
      .then((snap) => {
        commit("setCropById", { id: snap.id, ...snap.data() });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
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
  setCropById(state, crop) {
    state.cropById = crop;
  }
}