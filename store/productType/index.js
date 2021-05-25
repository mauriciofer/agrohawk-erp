export const state = () => ({
  productTypes: []
})

export const getters = {
  productTypes: state => state.productTypes
}

export const actions = {  
  async getproductTypes({commit}) {
    const productTypeData = [];
    this.$fire.firestore
      .collection("productTypes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productTypeData.push({ id: doc.id, ...doc.data() });
        });
        commit('setproductTypes', productTypeData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
}

export const mutations = {
  setproductTypes (state, productTypeList){
    state.productTypes = productTypeList
  }
}