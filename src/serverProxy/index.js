import _ from "lodash";
import axios from "./axiosInstance";

async function queryRestaurants(search, page = 1, limit = 50) {
  const { data } = await axios.get("/search", {
    params: {
      term: search,
      location: "Provo",
      categories: "restaurants",
      limit,
      offset: (page - 1) * limit
    }
  });

  const { total } = data;
  let { businesses } = data;

  businesses = businesses
    .map(b =>
      _.pick(b, [
        "id",
        "name",
        "image_url",
        "rating",
        "distance",
        "display_phone",
        "coordinates",
        "location"
      ])
    )
    .map(b => ({
      ...b,
      location: b.location.display_address
    }));
  return { total, businesses };
}

export default {
  queryRestaurants
};
