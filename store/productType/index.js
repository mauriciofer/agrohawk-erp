export const state = () => ({
  productType: []
})

export const getters = {
  productType: state => state.productType
}

export const actions = {  
  async getproductType({commit}) {
    const productTypeData = [];
    this.$fire.firestore
      .collection("productType")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productTypeData.push({ id: doc.id, ...doc.data() });
        });
        commit('setproductType', productTypeData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
}

export const mutations = {
  setproductType (state, productTypeList){
    state.productType = productTypeList
  }
}