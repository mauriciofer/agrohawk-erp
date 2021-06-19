export const state = () => ({
  applications: [],
  provisions: []
});

export const getters = {
  applications: (state) => state.applications,
  provisions: (state) => state.provisions
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
  async getProvisions({ commit }, { currentApplication }) {
    let applicationsData = [];
    let provisionsData = [];

    console.log('currentApplication', currentApplication);

    if(currentApplication){
      await this.$fire.firestore
      .collection("applications")
      .get(currentApplication.id)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          applicationsData.push({ id: doc.id, ...doc.data() });
        });

        console.log('applicationsData', applicationsData);

        if(applicationsData && applicationsData.length){

          console.log('applicationsData[0]', applicationsData[0]);
          console.log('applicationsData.provisions', applicationsData[0].provisions);

          applicationsData[0].provisions.forEach((doc) => {
            provisionsData.push({ ...doc });
          });

          console.log('provisionsData', provisionsData);

        }
      })
      .catch((error) => {
        throw new Error(error);
      });
    }
    commit("setProvisions", provisionsData);
  }
};

export const mutations = {
  setApplications(state, applicationsList) {
    state.applications = applicationsList;
  },
  setProvisions(state, provisionsList) {
    state.provisions = provisionsList;
  }
};
