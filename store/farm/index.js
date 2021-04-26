export const state = () => ({
    farms: [],
  })
  
  export const getters = {
    farms: state => state.farms
  }
  
  export const actions = {  
    async getFarms({commit}) {
      const farmData = [];
      this.$fire.firestore
        .collection("farms")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            farmData.push({ id: doc.id, ...doc.data() });
          });
          commit('setfarms', farmData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  
    
  }
  
  export const mutations = {
    setfarms (state, farmList){
      state.farms = farmList
    }
  }