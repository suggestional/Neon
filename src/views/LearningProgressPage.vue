<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="back()"> 返回 </ion-button>
        </ion-buttons>
        <ion-title>学习记录</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item
        v-if="dates === null || dates === undefined || dates.length === 0"
        lines="none"
      >
        <ion-label>暂无学习记录！</ion-label>
      </ion-item>
      <ion-accordion-group v-else>
        <ion-accordion v-for="(date, index) in dates" :key="index">
          <ion-item slot="header">
            <ion-label>{{ date }}</ion-label>
          </ion-item>

          <ion-list slot="content">
            <ion-item v-for="unit in learnedUnits[index]" :key="unit">
              <ion-label>{{ unit }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
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
  IonButtons,
} from "@ionic/vue";
import store from "@/store";
import router from "@/router";

export default defineComponent({
  name: "LearningProgressPage",
  components: {
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonPage,
    IonContent,
    IonButtons,
  },

  mounted() {
    let progress = store.state.progress;
    let dates = new Set();
    progress.forEach(function (learningDates) {
      learningDates.forEach(function (learningDate) {
        dates.add(learningDate.toLocaleDateString());
      });
    });

    dates = Array.from(dates).sort(); // 按顺序排列所有学习日期
    let datesLen = dates.length;
    let learnedUnits = [];

    for (let i = 0; i < datesLen; ++i) {
      learnedUnits.push(new Set());
    }
    progress.forEach(function (learningDates, fullUnitId) {
      learningDates.forEach(function (value) {
        learnedUnits[dates.indexOf(value.toLocaleDateString())].add(fullUnitId);
      });
    });

    this.dates = dates;
    this.learnedUnits = learnedUnits;
  },

  data() {
    return {
      dates: this.dates,
      learnedUnits: this.learnedUnits,
    };
  },

  methods: {
    back() {
      router.push({ path: "/tabs/settings", replace: true });
    },
  },
});
</script>