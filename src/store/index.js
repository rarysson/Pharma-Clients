import { format } from "date-fns";
import Vue from "vue";
import Vuex from "vuex";
import { fetchClients } from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clients: [],
    currentPage: 1,
    isFetchingData: false,
  },
  mutations: {
    addDataToClients(state, data) {
      state.clients = [...state.clients, ...data];
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setIsFetchingData(state, isFetching) {
      state.isFetchingData = isFetching;
    },
  },
  actions: {
    async fetchClients({ commit, state }) {
      commit("setIsFetchingData", true);
      const data = await fetchClients(state.currentPage);
      commit("setIsFetchingData", false);
      commit("addDataToClients", data);
      commit("setCurrentPage", state.currentPage + 1);
    },
  },
  getters: {
    formattedClients({ clients, currentPage }) {
      return clients.map((client) => ({
        id: client.login.uuid,
        img: client.picture.large,
        name: `${client.name.first} ${client.name.last}`,
        email: client.email,
        gender: client.gender,
        birthday: format(new Date(client.dob.date), "dd/MM/yyyy"),
        tel: client.phone,
        nationality: client.nat,
        address: `${client.location.street.name} - ${client.location.street.number}, ${client.location.city}, ${client.location.state}, ${client.location.country}`,
        url: `${window.origin}/${currentPage}/${client.login.uuid}`,
      }));
    },
  },
});
