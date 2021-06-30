export const state = () => ({
  blocks: [],
  farmBlocks: [],
  selectedBlocks: []
})

export const getters = {
  blocks: state => state.blocks,
  farmBlocks: state => state.farmBlocks,
  selectedBlocks: state => state.selectedBlocks,

  getBlocksByFarm: state => farmId => {
    return state.blocks.filter(item => {
      return item.farmId == farmId
    })
  },

  getBlockText: state => id => {
    if(typeof this.cropsBySelectedBlocks !== 'undefined'){
      return state.farmBlocks.filter(item => {
        return item.id == id
      })[0].name
    } else {
      return ""
    }
  }
}

export const actions = {
  updateSelectedBlocks({ commit }, { blocks }) {
    commit('updateSelectedBlocks', blocks)
  },
  async getBlocks({ commit }) {
    const blocksData = []
    this.$fire.firestore
      .collection('blocks')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          blocksData.push({ id: doc.id, ...doc.data() })
        })
        commit('setBlocks', blocksData)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  async getFarmBlocks({ commit }, { farmId }) {
    let blocksData = []

    if (farmId) {
      await this.$fire.firestore
        .collection('blocks')
        .where('farmId', '==', farmId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            blocksData.push({ id: doc.id, ...doc.data() })
          })
          commit('setFarmBlocks', blocksData)
        })
        .catch(error => {
          throw new Error(error)
        })
    } else {
      commit('setFarmBlocks', blocksData)
    }
  }
}

export const mutations = {
  setBlocks(state, blockList) {
    state.blocks = blockList
  },
  setFarmBlocks(state, blockList) {
    state.farmBlocks = blockList
  },
  updateSelectedBlocks(state, blocks) {
    state.selectedBlocks = blocks
  }
}
