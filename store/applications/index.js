export const state = () => ({
  applications: [],
  provisions: [],
  missions: []
});

export const getters = {
  applications: (state) => state.applications,
  provisions: (state) => state.provisions,
  missions: (state) => state.missions,
  getApplication: (state) => (id) => {
    return state.applications.filter((item) => {
      return item.id == id;
    })[0];
  }
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
    let applicationData = {};
    let provisionsData = [];

    if(currentApplication){
      await this.$fire.firestore
      .collection("applications")
      .doc(currentApplication.id)
      .get()
      .then((doc) => {
        if(doc.exists){
          applicationData = { id: doc.id, ...doc.data() };

          if(applicationData.provisions){
            applicationData.provisions.forEach((doc) => {
              provisionsData.push({ ...doc });
            });
          }
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
    }
    commit("setProvisions", provisionsData);
  },
  async getMissions({ commit }, { currentApplication }) {
    let applicationData = {};
    let missionsData = [];

    if(currentApplication){
      await this.$fire.firestore
      .collection("applications")
      .doc(currentApplication.id)
      .get()
      .then((doc) => {
        if(doc.exists) {
          applicationData = { id: doc.id, ...doc.data() };

          if(applicationData.missions){
            applicationData.missions.forEach((doc) => {
              missionsData.push({ ...doc });
            });
          }
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
    }
    commit("setMissions", missionsData);
  }
};

export const mutations = {
  setApplications(state, applicationsList) {
    state.applications = applicationsList;
  },
  setProvisions(state, provisionsList) {
    state.provisions = provisionsList;
  },
  setMissions(state, missionsList) {
    state.missions = missionsList;
  }
};
