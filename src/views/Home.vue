<template>
  <div class="home">
    <div class="restaurantPanel pa-3">
      <v-progress-linear rounded height="6" indeterminate :active="searchLoading" />
      <div v-if="!searchLoading" class="pb-12">
        <h2 class="mb-2">{{ numResults }} restaurants found near you</h2>
        <restaurant-card
          v-for="(item, index) in businesses"
          :key="item.id"
          :info="item"
          @click="selectRestaurant(index)"
        />
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
        :center="location"
        :zoom="mapZoom"
        map-type-id="terrain"
        style="width: 100%; height: 100%"
        ref="mapRef"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :icon="markerIcon(index)"
          :z-index="markerZIndex(index)"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
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
      location: {
        lat: 10,
        lng: 10
      },
      locationLoaded: false,
      businesses: [],
      numResults: 0,
      searchLoading: false,
      page: 1,
      markers: [],
      mapZoom: 12,

      // Controls selected marker
      selectedIdx: null,
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      selIcon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      zIndex: 0,
      selZIndex: 1000
    };
  },

  methods: {
    selectRestaurant(index) {
      this.selectedIdx = index;
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo(this.markers[index].position);
      });
    },
    markerIcon(index) {
      return index === this.selectedIdx ? this.selIcon : this.icon;
    },
    markerZIndex(index) {
      return index === this.selectedIdx ? this.selZIndex : this.zIndex;
    },
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
    reset() {
      this.page = 1;
    },
    async triggerSearch() {
      this.searchLoading = true;

      this.selectedIdx = null;
      this.numResults = 0;
      this.businesses = [];
      // Get current position
      if (!this.locationLoaded) {
        const { coords } = await this.getLocation();
        this.location = {
          lat: coords.latitude,
          lng: coords.longitude
        };
        this.locationLoaded = true;
      }
      const { total, businesses } = await server.queryRestaurants(this.search, this.page);
      this.businesses = businesses;

      // Add each business to the map
      this.markers = [];
      this.businesses.forEach(({ coordinates: { latitude, longitude } }) => {
        this.markers.push({
          position: {
            lat: latitude,
            lng: longitude
          }
        });
      });
      this.numResults = total;
      this.selectedIdx = null;

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
  position: fixed;
  right: 0;
}

.buttonNav {
  display: flex;
  justify-content: space-around;
}
</style>
