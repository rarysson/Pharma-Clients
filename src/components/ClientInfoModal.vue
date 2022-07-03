<template>
  <transition name="modal">
    <div v-if="open" class="overlay" @click.self="closeModal">
      <div class="modal">
        <button class="close-btn" @click="closeModal">
          <span class="close-icon">&#128473;</span>
        </button>

        <img class="user-profile" :src="clientData.img" alt="user profile" />

        <p class="user-name">{{ clientData.name }}</p>

        <div class="infos-container">
          <div class="info-container full-width">
            <p class="label">Email</p>
            <p class="info">{{ clientData.email }}</p>
          </div>

          <div class="info-container">
            <p class="label">Gender</p>
            <p class="info capitalize">{{ clientData.gender }}</p>
          </div>

          <div class="info-container">
            <p class="label">Birthday</p>
            <p class="info">{{ clientData.birthday }}</p>
          </div>

          <div class="info-container">
            <p class="label">Telephone number</p>
            <p class="info">{{ clientData.tel }}</p>
          </div>

          <div class="info-container">
            <p class="label">Nationality</p>
            <p class="info">{{ clientData.nationality }}</p>
          </div>

          <div class="info-container full-width">
            <p class="label">Address</p>
            <p class="info">{{ clientData.address }}</p>
          </div>

          <div class="info-container full-width">
            <p class="label">ID</p>
            <p class="info">{{ clientData.id }}</p>
          </div>

          <div class="info-container full-width">
            <p class="label">URL</p>
            <div class="overflow-container">
              <p class="info url">{{ clientData.url }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ClientInfoModal",

  props: {
    open: {
      type: Boolean,
      required: true,
    },

    clientData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.overlay {
  background-color: rgba(75, 75, 75, 0.75);
  display: grid;
  min-height: 100vh;
  left: 0;
  place-items: center;
  position: fixed;
  transition: all 0.3s;
  top: 0;
  width: 100%;
  z-index: 1;
}

.modal {
  position: relative;
  background: radial-gradient(circle, white 0%, #ecf0f1 100%);
  height: 500px;
  margin: 10px;
  width: 525px;
  padding: 25px;
  transition: all 0.3s;
}

.close-btn {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 25px;
  border: none;
  background-color: transparent;
  padding: 10px;
  transition: transform 250ms;
}

.close-icon {
  line-height: 0;
}

.close-btn:hover {
  transform: scale(1.25);
}

.modal-enter .modal,
.modal-leave-active .modal {
  transform: scale(0);
}

.user-profile {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
}

.user-name {
  margin: 60px 0 30px;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
}

.infos-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.info-container {
  display: flex;
  flex-direction: column;
}

.info-container.full-width {
  grid-column: span 2;
  width: 100%;
}

.label {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 3px;
}

.info {
  color: dimgray;
}

.info.capitalize {
  text-transform: capitalize;
}

.overflow-container {
  overflow: auto;
}

.info.url {
  white-space: nowrap;
}
</style>
