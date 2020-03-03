<template>
  <v-app>
    <v-app-bar app dark color="primary">
      Restaurant App
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="search"
            placeholder="Search for restaurants near you"
            outlined
            solo
            dense
            light
            class="mt-5 ml-5"
            @keydown.enter="searchRestaurants"
          />
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content>
      <Home :search="search" ref="home" />
    </v-content>
  </v-app>
</template>

<script>
import Home from "@/views/Home.vue";

export default {
  name: "App",

  components: {
    Home
  },

  data: () => ({
    search: ""
  }),

  methods: {
    async searchRestaurants() {
      await this.$refs.home.triggerSearch();
    }
  }
};
</script>
