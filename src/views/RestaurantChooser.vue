<template>
  <div class="chooser d-flex justify-center align-center flex-column">
    <div v-if="loading">
      <h1 class="mb-12">Finding restaurants for you to choose from...</h1>
      <v-progress-linear indeterminate rounded />
    </div>
    <div v-else class="d-flex flex-column align-center">
      <div v-if="!started" class="d-flex flex-column align-center">
        <h1>Choose the restaurant you like the best!</h1>
        <p>At the end you'll have the winner!</p>
      </div>
      <div
        class="d-flex flex-column align-center"
        v-else-if="contestants.length >= 2 && !finished && started"
      >
        <div class="d-flex justify-center">
          <chooser-card
            :info="contestants[contestantIdx]"
            class="mr-4"
            @click="makeChoice(contestantIdx)"
          />
          <chooser-card
            :info="contestants[contestantIdx + 1]"
            class="ml-4"
            @click="makeChoice(contestantIdx + 1)"
          />
        </div>
        <v-progress-linear
          color="light-blue"
          height="10"
          :value="(progress / bracketSteps) * 100"
          striped
          class="mt-8"
        />
      </div>
      <div v-else-if="finished" class="d-flex flex-column align-center">
        <h1>Winner!</h1>
        <chooser-card :info="contestants[0]" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapActions } from "vuex";

import ChooserCard from "../components/ChooserCard.vue";

const BRACKET_TOTAL = 16;

export default {
  components: {
    ChooserCard
  },
  props: {
    search: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    progress: 1,
    contestants: [],
    nextRound: [],
    contestantIdx: 0,
    finished: false,
    started: false
  }),

  computed: {
    ...mapState(["businesses"]),
    bracketSteps() {
      return BRACKET_TOTAL;
    }
  },

  methods: {
    ...mapActions(["retrieveBusinesses"]),
    async triggerSearch() {
      this.loading = true;
      this.started = true;
      this.finished = false;
      await this.retrieveBusinesses({ search: this.search, page: 1 });
      this.contestants = _.shuffle([...this.businesses]);
      this.contestants = this.contestants.slice(0, BRACKET_TOTAL);
      this.loading = false;
    },
    makeChoice(index) {
      this.nextRound.push(this.contestants[index]);
      this.contestantIdx += 2;
      this.progress += 1;

      if (this.contestantIdx >= this.contestants.length) {
        this.contestantIdx = 0;
        this.contestants = this.nextRound;
        this.contestants = _.shuffle(this.contestants);
        this.nextRound = [];
      }

      if (this.contestants.length === 1) {
        this.finished = true;
      }
    }
  }
};
</script>

<style scoped>
.chooser {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
