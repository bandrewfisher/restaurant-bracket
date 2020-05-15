<template>
  <v-app>
    <v-app-bar app dark color="primary">
      Restaurant App
      <v-row>
        <v-col cols="6">
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
      <v-spacer />
      <v-menu>
        <template #activator="{on}">
          <v-btn v-on="on">Mode</v-btn>
        </template>
        <v-list>
          <v-list-item @click="navigate('/')">
            <v-list-item-title>List View</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigate('/chooser')">
            <v-list-item-title>Chooser View</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <Home v-if="$route.path === '/'" :search="search" ref="home" />
      <RestaurantChooser v-else-if="$route.path === '/chooser'" ref="chooser" :search="search" />
    </v-content>
  </v-app>
</template>

<script>
import Home from "@/views/Home.vue";
import RestaurantChooser from "@/views/RestaurantChooser.vue";

export default {
  name: "App",

  components: {
    Home,
    RestaurantChooser
  },

  data: () => ({
    search: "",
    businesses: []
  }),

  methods: {
    async searchRestaurants() {
      if (this.$refs.home) {
        this.$refs.home.reset();
        this.$refs.home.triggerSearch();
      }

      if (this.$refs.chooser) {
        this.$refs.chooser.triggerSearch();
      }
    },
    navigate(route) {
      this.$router.push(route);
    }
  }
};
</script>
