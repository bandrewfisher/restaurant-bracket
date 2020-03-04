<template>
  <v-card width="250px" height="400px" @click="$emit('click')" class="cursor-pointer">
    <v-img :src="info.image_url" height="200px" />
    <v-card-title>{{ info.name }}</v-card-title>
  </v-card>
</template>

<script>
import businessValidator from "../mixins";

export default {
  props: {
    info: {
      required: true,
      validator: businessValidator
    }
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
