export const state = () => ({
  blocks: [],
  farmBlocks: [],
});

export const getters = {
  blocks: (state) => state.blocks,
  farmBlocks: (state) => state.farmBlocks,

  getBlocksByFarm: (state) => (farmId) => {
    return state.blocks.filter((item) => {
      return item.farmId == farmId;
    });
  },

  getBlockText: (state) => (id) => {
    console.log(id)
    console.log(state.blocks)
    return state.farmBlocks.filter((item) => {
      console.log(item)
      return item.id == id;
    })[0].name;
  },
};

export const actions = {
  async getBlocks({ commit }) {
    const blocksData = [];
    this.$fire.firestore
      .collection("blocks")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          blocksData.push({ id: doc.id, ...doc.data() });
        });
        commit("setBlocks", blocksData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  async getFarmBlocks({ commit }, { farmId }) {
    let blocksData = [];

    if (farmId) {
      await this.$fire.firestore
        .collection("blocks")
        .where("farmId", "==", farmId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            blocksData.push({ id: doc.id, ...doc.data() });
          });
          commit("setFarmBlocks", blocksData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      commit("setFarmBlocks", blocksData);
    }
  },
};

export const mutations = {
  setBlocks(state, blockList) {
    state.blocks = blockList;
  },
  setFarmBlocks(state, blockList) {
    state.farmBlocks = blockList;
  },
};
