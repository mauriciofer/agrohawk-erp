export const state = () => ({
  clients: [],
});

export const getters = {
  clients: (state) => state.clients,

  getClient: (state) => (id) => {
    return state.clients.filter((item) => {
      return item.id == id;
    })[0];
  },
};

export const actions = {
  async getClients({ commit }) {
    let clientsData = [];
    await this.$fire.firestore
      .collection("clients")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          clientsData.push({ id: doc.id, ...doc.data() });
        });
        commit("setClients", clientsData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
};

export const mutations = {
  setClients(state, clientsList) {
    state.clients = clientsList;
  },
};
