<template>
  <div class="card mb-2" @click="$emit('click')">
    <div>
      <v-img aspect-ratio="1" width="120px" :src="info.image_url" />
    </div>
    <div class="card-content pl-2">
      <div class="card-header">
        <h3>{{ info.name }}</h3>
        <v-rating :value="info.rating" dense small readonly half-increments />
      </div>
      <span v-for="(addr, index) in info.location" :key="index">{{ addr }}</span>
      <span>{{ info.display_phone }}</span>
    </div>
  </div>
</template>

<script>
import businessItemValidator from "../mixins";

export default {
  props: {
    info: {
      required: true,
      validator: businessItemValidator
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  height: 150px;
}

.card:hover {
  cursor: pointer;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
