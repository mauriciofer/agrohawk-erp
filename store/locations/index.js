export const state = () => ({
    provincias: [],
    cantones: [],
    distritos: []
});

export const getters = {
    provincias: state => state.provincias,
    cantones: state => state.cantones,
    distritos: state => state.distritos
};

export const actions = {
    async getProvincias({ commit }) {
        const provinciasData = [];

        await this.$fire.firestore
            .collection("provincias")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    provinciasData.push({ provincia: doc.data().name, ...doc.data() });
                });
                commit('setProvincias', provinciasData);
            })
            .catch((error) => {
                throw new Error(error);
            });
    },
    async getCantones({ commit }, { provinciaId }) {
        const cantonesData = [];

        if (provinciaId) {
            await this.$fire.firestore
                .collection("cantones")
                .where("provincia", "==", provinciaId)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        cantonesData.push({ canton: doc.data().name, ...doc.data() });
                    });
                    commit('setCantones', cantonesData);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
    },
    async getDistritos({ commit }, { cantonId }) {
        const distritosData = [];

        if (cantonId) {
            await this.$fire.firestore
                .collection("distritos")
                .where("canton", "==", cantonId)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        distritosData.push({ distrito: doc.data().name, ...doc.data() });
                    });
                    commit('setDistritos', distritosData);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
    }
};

export const mutations = {
    setProvincias(state, provinciasList) {
        state.provincias = provinciasList
    },
    setCantones(state, cantonesList) {
        state.cantones = cantonesList
    },
    setDistritos(state, distritosList) {
        state.distritos = distritosList
    }
};