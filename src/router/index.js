import { createRouter, createWebHistory } from "@ionic/vue-router";
// import { RouteRecordRaw } from 'vue-router';
import TabsPage from "../views/TabsPage.vue";
import LearnPage from "../views/LearnPage.vue";
import ReviewPage from "../views/ReviewPage.vue";
import SettingsPage from "../views/SettingsPage.vue";
import WordbookSelection from "../views/WordbookSelection.vue";
import LearnWord from "../views/LearnWord.vue";
import ExercisePage from "@/views/ExercisePage";
import SelectUnit from "../views/SelectUnit";

const routes = [
  {
    path: "/",
    redirect: "/tabs/learn",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/learn",
      },
      {
        path: "learn",
        component: LearnPage,
      },
      {
        path: "review",
        component: ReviewPage,
      },
      {
        path: "settings",
        component: SettingsPage,
      },
    ],
  },
  {
    path: "/wordbook-selection",
    component: WordbookSelection,
  },
  {
    // TODO: add params for dynamic route matching
    path: "/learn-word",
    component: LearnWord,
  },
  {
    path: "/exercise",
    component: ExercisePage,
  },
  {
    path: "/select-unit",
    component: SelectUnit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
