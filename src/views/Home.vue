<template>
  <div>
    <div v-if="!formattedClients.length && isFetchingData" class="text-center">
      <p>Fetching clients...</p>
    </div>

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
            <button class="view-info-btn">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Home",

  computed: {
    ...mapState(["isFetchingData"]),
    ...mapGetters(["formattedClients"]),
  },

  methods: {
    ...mapActions(["fetchClients"]),
  },

  beforeMount() {
    this.fetchClients();
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
