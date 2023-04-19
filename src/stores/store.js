import { defineStore } from "pinia";
import { fetchCorona, fetchIndiaTimeline } from "./serve";
export const useWorldStore = defineStore("world", {
  state: () => ({
    dataCorona: {},
    loading: true,
    error: null,
  }),

  mutations: {
    setDataCorona(data) {
      this.dataCorona = data;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setError(error) {
      this.error = error;
    },
  },
  getters: {
    getCountryState(state) {
      return (countryName) => {
        const countriesStat = this?.$state?.dataCorona?.countries_stat ?? []; // Add null checks and default value
        return countriesStat.find(
          (country) => country.country_name === countryName
        );
      };
    },
  },

  actions: {
    async fetchDataCorona() {
      try {
        const response = await fetchCorona();
        this.$state.dataCorona = response.data;
      } catch (error) {
        this.$state.error = error;
        console.log(error);
      } finally {
        this.$state.loading = false;
      }
    },
  },
});

//time line india store
export const useIndiaStore = defineStore("timeline", {
  state: () => ({
    timeLineIndia: {},
    loading: true,
    error: null,
  }),

  mutations: {
    setTimeLine(data) {
      this.timeLineIndia = data;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setError(error) {
      this.error = error;
    },
  },
  getters: {
    // getCountryState(state) {
    //   return (startDate) => {
    //     const countriesStat = this?.$state?.timeLineIndia?.countries_stat ?? []; // Add null checks and default value
    //     return countriesStat.find(
    //       (country) => country.country_name === countryName
    //     );
    //   };
    // },
  },

  actions: {
    async fetchIndiaTimeline() {
      try {
        const response = await fetchIndiaTimeline();
        this.$state.timeLineIndia = response.data;
      } catch (error) {
        this.$state.error = error;
        console.log(error);
      } finally {
        this.$state.loading = false;
      }
    },
  },
});
