export const state = () => ({
  applications: [],
});

export const getters = {
  applications: (state) => state.applications,

  getApplication: (state) => (id) => {
    return state.applications.filter((item) => {
      return item.id == id;
    })[0];
  },
};

export const actions = {
  async getApplications({ commit }) {
    let applicationsData = [];
    await this.$fire.firestore
      .collection("applications")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          applicationsData.push({ id: doc.id, ...doc.data() });
        });
        commit("setApplications", applicationsData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
};

export const mutations = {
  setApplications(state, applicationsList) {
    state.applications = applicationsList;
  },
};
