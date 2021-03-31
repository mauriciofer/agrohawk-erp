export const state = () => ({
  users: [],
  roles: []
})

export const getters = {
  users: state => state.users,
  roles: state => state.roles
}

export const actions = {  
  async getUsers({commit}) {
    const userData = [];
    this.$fire.firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
        });
        commit('setUsers', userData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },

  async getRoles({commit}) {
    const roleData = [];
    await this.$fire.firestore
      .collection("roles")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          roleData.push({ role: doc.id, ...doc.data() });
        });
        commit('setRoles', roleData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
}

export const mutations = {
  setUsers (state, userList){
    state.users = userList
  },
  setRoles (state, roleList){
    state.roles = roleList
  }
}