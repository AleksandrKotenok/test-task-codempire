import axios from "axios";

axios.defaults.baseURL = "https://api.covid19api.com";

const current = new Date();
export const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate() - 1}`;

export const getSummary = async () => {
  try {
    const {
      data: { Countries },
    } = await axios.get("/summary");
    return Countries;
  } catch (event) {
    console.error(event);
  }
};
export const getCountry = async (countrie) => {
  try {
    const { data } = await axios.get(`/live/country/${countrie}/status/confirmed/date/${date}T13:13:30Z`);
    return data;
  } catch (event) {
    console.error(event);
  }
};
