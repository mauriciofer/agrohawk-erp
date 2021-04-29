export const state = () => ({
    clients: []
});

export const getters = {
    clients: state => state.clients
};

export const actions = {
    async getClients({ commit }) {
        const clientsData = [];
        await this.$fire.firestore
            .collection("clients")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    clientsData.push({ id: doc.id, ...doc.data() });
                });
                commit('setClients', clientsData);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
};

export const mutations = {
    setClients(state, clientsList) {
        state.clients = clientsList
    }
};
