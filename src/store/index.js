import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Queue from "@/lib/Queue";

export default createStore({
  plugins: [createPersistedState],
  state() {
    return {
      currWordbookId: localStorage.getItem("currWordbookId") || "0",
      wrongList: localStorage.getItem("wrongList") || new Queue([]),
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
