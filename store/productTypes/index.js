export const state = () => ({
  productTypes: []
})

export const getters = {
  productTypes: state => state.productTypes,

  getProductTypeText: state => id => {
    if (state.productTypes.length > 0 && id) {
      const currentProductType = state.productTypes.filter(item => {
        return item.id == id
      })[0]
      return currentProductType.name + ' ' + currentProductType.variety
    } else {
      return ''
    }
  }
}

export const actions = {
  async getProductTypes({ commit }) {
    const productTypeData = []
    this.$fire.firestore
      .collection('productTypes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          productTypeData.push({ id: doc.id, ...doc.data() })
        })
        commit('setProductTypes', productTypeData)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

export const mutations = {
  setProductTypes(state, productTypeList) {
    state.productTypes = productTypeList
  }
}
