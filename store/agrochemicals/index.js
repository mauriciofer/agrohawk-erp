export const state = () => ({
    agrochemicals: [],
    agrochemicalTypes: [],
    actionModes: []
  })
  
  export const getters = {
    agrochemicals: state => state.agrochemicals,
    agrochemicalTypes: state => state.agrochemicalTypes,
    actionModes: state => state.actionModes,
  
    getAgrochemicalTypeText: (state) => (id) => {
      if(typeof state.agrochemicalTypes !== 'undefined'){
        return state.agrochemicalTypes.filter((item) => {
          return item.id == id;
        })[0].name;
      }else {
        return ""
      }
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
    async getAgrochemicalTypes({ commit }) {
      const data = [];
  
      await this.$fire.firestore
        .collection("agrochemicalTypes")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push({ agrochemicalType: doc.data().name, ...doc.data() });
          });
          commit("setAgrochemicalTypes", data);
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
            data.push({ actionMode: doc.data().name, ...doc.data() });
          });
          commit("setActionModes", data);
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
      state.actionModes = actionModesList
    }
  }