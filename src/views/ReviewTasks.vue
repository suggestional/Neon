<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="back()"> 返回 </ion-button>
        </ion-buttons>
        <ion-title>记忆曲线</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-accordion-group>
        <ion-accordion>
          <ion-item slot="header">
            <ion-label>今日任务 ({{ currReviewTasks.length }})</ion-label>
          </ion-item>
          <ion-item
            v-if="currReviewTasks.length === 0"
            slot="content"
            position="floating"
          >
            <ion-label>暂无今日任务！</ion-label>
          </ion-item>
          <ion-list v-else slot="content">
            <ion-item
              button
              @click="select(reviewTask.fullUnitId, reviewTask.reviewId)"
              detail
              v-for="reviewTask in currReviewTasks"
              :key="reviewTask.fullUnitId"
            >
              <ion-label>
                <h2>{{ reviewTask.fullUnitId }}</h2>
              </ion-label>
              <ion-badge color="secondary">
                第{{ reviewTask.reviewId }}次复习
              </ion-badge>
            </ion-item>
          </ion-list>
        </ion-accordion>
        <ion-accordion>
          <ion-item slot="header">
            <ion-label>过期任务 ({{ overdueReviewTasks.length }})</ion-label>
          </ion-item>
          <ion-item
            v-if="overdueReviewTasks.length === 0"
            slot="content"
            position="floating"
          >
            <ion-label>暂无过期任务！</ion-label>
          </ion-item>
          <ion-list v-else slot="content">
            <ion-item
              button
              @click="select(reviewTask.fullUnitId, reviewTask.reviewId)"
              detail
              v-for="reviewTask in overdueReviewTasks"
              :key="reviewTask.fullUnitId"
            >
              <ion-label>
                <h2>{{ reviewTask.fullUnitId }}</h2>
              </ion-label>
              <ion-badge color="secondary">
                第{{ reviewTask.reviewId }}次复习
              </ion-badge>
            </ion-item>
          </ion-list>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import dayjs from "dayjs";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonPage,
  IonList,
  IonButton,
  IonContent,
  IonBadge,
  IonButtons,
} from "@ionic/vue";
import store from "@/store";
import router from "@/router";
import Unit from "@/entity/Unit";

export default defineComponent({
  name: "ReviewTasks",
  components: {
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonAccordion,
    IonAccordionGroup,
    IonList,
    IonItem,
    IonLabel,
    IonPage,
    IonContent,
    IonBadge,
    IonButtons,
  },

  mounted() {
    let reviewProgress = store.state.reviewProgress;
    let reviewSettings = store.state.reviewSettings;
    let currReviewTasks = [];
    let overdueReviewTasks = [];

    reviewProgress.forEach(function (reviewTasks) {
      reviewTasks.forEach(function (reviewTask) {
        let supposedDay = dayjs(reviewTask.learnedDate).add(
            reviewSettings.get(reviewTask.reviewId),
            "day"
        );
        if (supposedDay.isSame(dayjs(store.state.currDate), "day")) {
          currReviewTasks.push(reviewTask);
        } else if (
            supposedDay.isBefore(dayjs(store.state.currDate), "day") &&
            !reviewTask.isCompleted
        ) {
          overdueReviewTasks.push(reviewTask);
        }
      });
    });

    this.currReviewTasks = currReviewTasks;
    this.overdueReviewTasks = overdueReviewTasks;
  },

  beforeUpdate() {
    let reviewProgress = store.state.reviewProgress;
    let reviewSettings = store.state.reviewSettings;
    let currReviewTasks = [];
    let overdueReviewTasks = [];

    reviewProgress.forEach(function (reviewTasks) {
      reviewTasks.forEach(function (reviewTask) {
        let supposedDay = dayjs(reviewTask.learnedDate).add(
          reviewSettings.get(reviewTask.reviewId),
          "day"
        );
        if (supposedDay.isSame(dayjs(store.state.currDate), "day")) {
          currReviewTasks.push(reviewTask);
        } else if (
          supposedDay.isBefore(dayjs(store.state.currDate), "day") &&
          !reviewTask.isCompleted
        ) {
          overdueReviewTasks.push(reviewTask);
        }
      });
    });

    this.currReviewTasks = currReviewTasks;
    this.overdueReviewTasks = overdueReviewTasks;
  },

  data() {
    return {
      currReviewTasks: [],
      overdueReviewTasks: [],
    };
  },

  methods: {
    select(fullUnitId, reviewId) {
      // 存下当前的 fullUnitId 和 reviewId，待结算时使用
      store.state.fullUnitId = fullUnitId;
      store.state.currReviewId = reviewId;
      let tokens = fullUnitId.split(" ");
      let data = require("../assets/" + tokens[0] + "/" + tokens[1] + ".json");
      store.state.currUnit = Unit.initFromJSON(data);
      router.push({ path: "/exercise", replace: true });
    },

    back() {
      router.push({ path: "/tabs/review", replace: false });
    },
  },
});
</script>