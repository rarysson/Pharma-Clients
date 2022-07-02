<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: whitesmoke;
  max-width: 1150px;
  margin: 0 auto;
  padding: 50px 25px;
}

button {
  cursor: pointer;
}

input,
button {
  font-family: inherit;
}
</style>
