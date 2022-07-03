<template>
  <div class="loading-container">
    <span class="loading-icon">&#11118;</span>
    <p>{{ message }}...</p>
  </div>
</template>

<script>
export default {
  name: "Loading",

  props: {
    message: {
      type: String,
      default: "Loading",
    },
  },
};
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.loading-icon {
  font-size: 35px;
  margin-right: 5px;
}
</style>
