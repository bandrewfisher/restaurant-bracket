<template>
  <div class="home">
    <div class="restaurantPanel pa-3">
      <v-progress-linear rounded height="6" indeterminate :active="searchLoading" />
      <div v-if="!searchLoading" class="pb-12">
        <h2 class="mb-2">{{ numResults }} restaurants found near you</h2>
        <restaurant-card v-for="item in businesses" :key="item.id" :info="item" />
        <div class="buttonNav" v-if="businesses.length > 0">
          <v-btn icon elevation="6" :disabled="page === 1" @click="prevPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            icon
            elevation="6"
            :disabled="page === Math.ceil(numResults / 40)"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <div class="mapPanel">
      <GmapMap
        :center="{ lat: 10, lng: 10 }"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 100%"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import server from "../serverProxy";
import RestaurantCard from "../components/RestaurantCard.vue";

export default {
  name: "Home",

  components: {
    RestaurantCard
  },

  props: {
    search: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      location: null,
      businesses: [],
      numResults: 0,
      searchLoading: false,
      page: 1,
      markers: []
    };
  },

  methods: {
    async getLocation() {
      const getLoc = () => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      };

      return getLoc().then(position => {
        return position;
      });
    },
    async triggerSearch() {
      this.searchLoading = true;

      this.numResults = 0;
      this.businesses = [];
      // Get current position
      if (!this.location) {
        const { coords } = await this.getLocation();
        this.location = {
          latitude: coords.latitude,
          longitude: coords.longitude
        };
      }
      const { total, businesses } = await server.queryRestaurants(this.search, this.page);
      this.businesses = businesses.map(b =>
        _.pick(b, ["id", "name", "image_url", "rating", "distance", "display_phone"])
      );
      this.numResults = total;

      this.searchLoading = false;
    },

    nextPage() {
      this.page += 1;
      this.triggerSearch();
    },

    prevPage() {
      this.page -= 1;
      this.triggerSearch();
    }
  }
};
</script>

<style scoped>
.home {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}

.restaurantPanel {
  height: 100%;
  width: 50%;
}

.mapPanel {
  height: 100%;
  width: 50%;
  background-color: green;
  position: fixed;
  right: 0;
}

.buttonNav {
  display: flex;
  justify-content: space-around;
}
</style>
