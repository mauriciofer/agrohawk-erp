export const state = () => ({
  crops: []
})

export const getters = {
  crops: state => state.crops
}

export const actions = {  
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
}

export const mutations = {
  setCrops (state, cropsList){
    state.crops = cropsList
  }
}