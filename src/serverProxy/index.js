import axios from "./axiosInstance";

async function queryRestaurants(search, page = 1) {
  const LIMIT = 40;
  const { data } = await axios.get("/search", {
    params: {
      term: search,
      location: "Provo",
      categories: "restaurants",
      limit: LIMIT,
      offset: (page - 1) * LIMIT
    }
  });
  return data;
}

export default {
  queryRestaurants
};
