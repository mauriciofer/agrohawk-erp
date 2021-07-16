export const state = () => ({
    agrochemicals: []
  })
  
  export const getters = {
    agrochemicals: state => state.agrochemicals,
  
    getAgrochemicalsText: (state) => (id) => {
      const currentAgrochemical = state.Agrochemical.filter((item) => {
        return item.id == id;
      })[0] ;
      return currentAgrochemical.name + " " + currentAgrochemical.variety;
    }
  }
  
  export const actions = {  
    async getAgrochemicals({commit}) {
      const agrochemicalsData = [];
      this.$fire.firestore
        .collection("agrochemicals")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            agrochemicalsData.push({ id: doc.id, ...doc.data() });
          });
          commit('setAgrochemicals', agrochemicalsData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  }
  
  export const mutations = {
    setAgrochemicals (state, agrochemicalsList){
      state.agrochemicals = agrochemicalsList
    }
  }