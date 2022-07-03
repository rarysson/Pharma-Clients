<template>
  <form class="search-container" @submit.prevent="submitSearch">
    <input type="text" placeholder="Search..." v-model.trim="search" />
    <button class="search-btn" type="submit">
      <span class="search-icon">&#128269;</span>
    </button>
  </form>
</template>

<script>
export default {
  name: "SearchBar",

  data() {
    return {
      search: "",
    };
  },

  methods: {
    submitSearch() {
      this.$emit("search", this.search);
    },
  },
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
}

input {
  width: 100%;
  padding: 5px 10px;
  border: 2px solid gray;
}

.search-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  font-size: 20px;
  transition: transform 250ms;
}

.search-btn:hover {
  transform: scale(0.75);
}
</style>
