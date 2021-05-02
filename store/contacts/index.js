export const state = () => ({
    contacts: [],
    contact: null
});

export const getters = {
    contacts: state => state.contacts,
    contact: state => state.contact
};

export const actions = {
    async getContacts({ commit }, { currentClient }) {
        const contactsData = [];

        if (currentClient) {
            await this.$fire.firestore
                .collection("contacts")
                .where("clientId", "==", currentClient.id)
                .orderBy("timestamp")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        contactsData.push({ id: doc.id, ...doc.data() });
                    });
                    commit('setContacts', contactsData);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
    },
    async updateContact({ commit }, { newContact }) {
        commit('setContact', newContact);
    },
    async saveContact({ commit }, { currentContact }) {
        await this.$fire.firestore
            .collection("contacts")
            .doc(currentContact.id)
            .update({
                email: currentContact.email,
                isPrincipal: currentContact.isPrincipal,
                lastName: currentContact.lastName,
                mobile: currentContact.mobile,
                name: currentContact.name,
                phone: currentContact.phone,
                signs: currentContact.signs,
                type: currentContact.type
            })
            .then(() => {
                commit('setContact', currentContact);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

export const mutations = {
    setContacts(state, contactsList) {
        state.contacts = contactsList
    },
    setContact(state, contact) {
        state.contact = contact
    }
};
