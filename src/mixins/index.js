import Joi from "@hapi/joi";

export default val => {
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    image_url: Joi.string().required(),
    rating: Joi.number().required(),
    distance: Joi.number().required(),
    display_phone: Joi.string().required(),
    coordinates: Joi.object({
      latitude: Joi.number(),
      longitude: Joi.number()
    }),
    location: Joi.array().items(Joi.string())
  });
  const { error } = schema.validate(val);
  return !error;
};
