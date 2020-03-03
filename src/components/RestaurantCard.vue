<template>
  <div class="card mb-2">
    <div>
      <v-img aspect-ratio="1" width="120px" :src="info.image_url" />
    </div>
    <div class="card-content pl-2">
      <div class="card-header">
        <h3>{{ info.name }}</h3>
        <v-rating :value="info.rating" dense small readonly half-increments />
      </div>
      <span>Address</span>
      <span>{{ info.display_phone }}</span>
    </div>
  </div>
</template>

<script>
import Joi from "@hapi/joi";

export default {
  props: {
    info: {
      type: Object,
      validator(val) {
        const schema = Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          image_url: Joi.string().required(),
          rating: Joi.number().required(),
          distance: Joi.number().required(),
          display_phone: Joi.string().required()
        });
        const { error } = schema.validate(val);
        return !error;
      }
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  height: 150px;
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
