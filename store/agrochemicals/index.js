export const state = () => ({
    agrochemicals: [],
    agrochemicalTypes: [],
    actionModes: []
  })
  
  export const getters = {
    agrochemicals: state => state.agrochemicals,
    agrochemicalTypes: state => state.agrochemicalTypes,
    actionModes: state => state.actionModes,
  
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
    async getAgrochemicalTypes({commit}) {
      const data = [];
      this.$fire.firestore
        .collection("agrochemicalTypes")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          commit('setAgrochemicalTypes', data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    async getActionModes({commit}) {
      const data = [];
      this.$fire.firestore
        .collection("actionModes")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          commit('setActionModes', data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }
  
  export const mutations = {
    setAgrochemicals (state, agrochemicalsList){
      state.agrochemicals = agrochemicalsList
    },
    setAgrochemicalTypes (state, agrochemicalTypesList){
      state.agrochemicalTypes = agrochemicalTypesList
    },
    setActionModes (state, actionModesList){
      console.log(actionModesList)
      state.actionModes = actionModesList
    }
  }