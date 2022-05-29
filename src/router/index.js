import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../views/TabsPage.vue";
import LearnPage from "../views/LearnPage.vue";
import ReviewPage from "../views/ReviewPage.vue";
import SettingsPage from "../views/SettingsPage.vue";
import SelectWordbook from "../views/SelectWordbook.vue";
import LearnWord from "../views/LearnWord.vue";
import ExercisePage from "@/views/ExercisePage";
import SelectUnit from "../views/SelectUnit";
import ListWordsPage from "@/views/ListWordsPage";
import WrongListReviewPage from "@/views/WrongListReviewPage";
import LearningProgressPage from "@/views/LearningProgressPage";
import ReviewTasks from "@/views/ReviewTasks";

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
    path: "/select-wordbook",
    component: SelectWordbook,
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
  {
    path: "/list-words",
    component: ListWordsPage,
  },
  {
    path: "/wrong-list-review",
    component: WrongListReviewPage,
  },
  {
    path: "/learning-progress",
    component: LearningProgressPage,
  },
  {
    path: "/review-tasks",
    component: ReviewTasks,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
