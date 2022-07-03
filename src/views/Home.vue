<template>
  <div @scroll="handleAppScroll">
    <Loading
      v-if="!formattedClients.length && isFetchingData"
      message="Fetching clients"
    />

    <table v-if="formattedClients.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Birth</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in formattedClients" :key="client.id">
          <td>{{ client.name }}</td>
          <td class="capitalize-text text-center">{{ client.gender }}</td>
          <td class="text-center">{{ client.birthday }}</td>
          <td class="text-center">
            <button class="view-info-btn" @click="viewClientInfo(client)">
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Loading
      v-if="formattedClients.length && isFetchingData"
      message="Loading more"
    />

    <ClientInfoModal
      :open="openModal"
      :clientData="currentClient"
      @close="openModal = false"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import Loading from "../components/Loading.vue";
import ClientInfoModal from "../components/ClientInfoModal.vue";

let idDebounce;

export default {
  name: "Home",

  components: {
    Loading,
    ClientInfoModal,
  },

  data() {
    return {
      openModal: false,
      currentClient: {},
    };
  },

  computed: {
    ...mapState(["isFetchingData"]),
    ...mapGetters(["formattedClients"]),
  },

  methods: {
    ...mapActions(["fetchClients"]),

    handleAppScroll() {
      clearTimeout(idDebounce);

      idDebounce = setTimeout(() => {
        const reachedEnd =
          window.innerHeight + window.scrollY === document.body.scrollHeight;

        if (reachedEnd) {
          this.fetchClients();
        }
      }, 250);
    },

    viewClientInfo(client) {
      this.currentClient = client;
      this.openModal = true;
    },
  },

  beforeMount() {
    this.fetchClients();

    document.addEventListener("scroll", this.handleAppScroll);
  },

  beforeDestroy() {
    document.body.removeEventListener("scroll", this.handleAppScroll);
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

th {
  background-color: lightsteelblue;
}

th,
td {
  border: 2px solid gray;
  padding: 10px;
}

.capitalize-text {
  text-transform: capitalize;
}

.text-center {
  text-align: center;
}

.view-info-btn {
  color: aliceblue;
  background-color: dimgray;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
}

.view-info-btn:hover {
  background-color: darkslategray;
}
</style>
