import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState],
  state() {
    return {
      currWordbookId: localStorage.getItem("currWordbookId") || "0",
      wrongList: localStorage.getItem("wrongList") || [],
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
