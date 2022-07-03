<template>
  <div>
    <Loading
      v-if="!clients.length && isFetchingData"
      message="Fetching clients"
    />

    <SearchBar style="margin-bottom: 25px" @search="search = $event" />

    <table v-if="clients.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Birth</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
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
    <div v-else-if="!isFetchingData" class="text-center">
      <strong style="font-size: 20px">No clients!</strong>
    </div>

    <Loading v-if="clients.length && isFetchingData" message="Loading more" />

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
import SearchBar from "../components/SearchBar.vue";

let idDebounce;

export default {
  name: "Home",

  props: {
    pageNumber: {
      type: [Number, String],
      default: 1,
    },

    userId: {
      type: String,
      default: "",
    },
  },

  components: {
    Loading,
    ClientInfoModal,
    SearchBar,
  },

  data() {
    return {
      openModal: false,
      currentClient: {},
      search: "",
    };
  },

  computed: {
    ...mapState(["isFetchingData"]),
    ...mapGetters(["formattedClients"]),

    clients() {
      return this.formattedClients.filter((client) =>
        client.name.toLowerCase().includes(this.search)
      );
    },
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

  async beforeMount() {
    document.addEventListener("scroll", this.handleAppScroll);

    if (this.userId) {
      await this.fetchClients(+this.pageNumber);

      const client = this.formattedClients.find((c) => c.id === this.userId);
      this.currentClient = client ? client : {};
      this.openModal = !!client;
    } else {
      await this.fetchClients();
    }
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
