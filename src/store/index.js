import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Queue from "@/lib/Queue";

export default createStore({
  plugins: [createPersistedState],
  state() {
    return {
      currWordbookId: localStorage.getItem("currWordbookId") || "0",
      wrongList: localStorage.getItem("wrongList") || new Queue([]),
      currDate: localStorage.getItem("currDate") || new Date(new Date().toLocaleDateString()),
      progress: localStorage.getItem("progress") || new Map(),
    };
  },
  mutations: {
    setCurrWordbookId(state, wordbookID) {
      localStorage.setItem("currWordbookId", wordbookID);
      state.currWordbookId = wordbookID;
    },
  },
  actions: {},
  modules: {},
});
