import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Queue from "@/lib/Queue";

export default createStore({
  plugins: [createPersistedState],
  state() {
    return {
      currWordbookId: localStorage.getItem("currWordbookId") || "0",
      wrongList: localStorage.getItem("wrongList") || new Queue([]),
      currDate:
        localStorage.getItem("currDate") ||
        new Date(new Date().toLocaleDateString()),
      progress: localStorage.getItem("progress") || new Map(),
      reviewSettings:
        localStorage.getItem("reviewSettings") ||
        new Map([
          ["1", 1],
          ["2", 2],
          ["3", 4],
          ["4", 7],
          ["5", 15],
        ]),
      reviewProgress: localStorage.getItem("reviewProgress") || new Map(),
      currReviewId: localStorage.getItem("currReviewId") || "",
      fullUnitId: localStorage.getItem("fullUnitId") || "",
      debug: localStorage.getItem("debug") || false,
    };
  },
  mutations: {
    setCurrWordbookId(state, wordbookID) {
      localStorage.setItem("currWordbookId", wordbookID);
      state.currWordbookId = wordbookID;
    },
    removeFullUnitId() {
      localStorage.setItem("fullUnitId", "");
    },
    removeCurrReviewId() {
      localStorage.setItem("currReviewId", "");
    },
    updateReviewSetting(state, payload) {
      state.reviewSettings.set(payload.reviewId, payload.newVal);
    },
  },
  actions: {},
  modules: {},
});
