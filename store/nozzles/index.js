export const state = () => ({
    nozzles: []
  })
  
  export const getters = {
    nozzles: state => state.nozzles,
    getNozzle: (state) => (id) => {
      return state.nozzles.filter((item) => {
        return item.id == id;
      })[0];
    }
  }
  
  export const actions = {  
    async getNozzles({commit}) {
      const nozzlesData = [];
      this.$fire.firestore
        .collection("nozzles")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            nozzlesData.push({ id: doc.id, ...doc.data() });
          });
          commit('setNozzles', nozzlesData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  }
  
  export const mutations = {
    setNozzles (state, nozzlesList){
      state.nozzles = nozzlesList
    }
  }