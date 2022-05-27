<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>学习记录</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-accordion-group>
        <ion-accordion
            v-for="(date, index) in dates"
            :key="index"
        >
          <ion-item slot="header">
            <ion-label>{{ date }}</ion-label>
          </ion-item>

          <ion-list slot="content">
            <ion-item
                v-for="unit in learnedUnits[index]"
                :key="unit"
            >
              <ion-label>{{ unit }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-accordion>
      </ion-accordion-group>
      <ion-button color="primary" @click="goHome()" expand="block">返回首页</ion-button>
    </ion-content>
  </ion-page>

</template>

<script>
import { defineComponent } from 'vue';
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
} from '@ionic/vue';
import store from "@/store";
import router from "@/router";

export default defineComponent({
  name: 'LearningProgressPage',
  components: { IonButton, IonHeader, IonToolbar, IonTitle, IonList, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonPage, IonContent },

  mounted() {
    let progress = store.state.progress;
    let dates = new Set();
    progress.forEach(function(learningDates) {
      learningDates.forEach(function(learningDate) {
        dates.add(learningDate.toLocaleDateString());
      });
    });

    dates = Array.from(dates).sort();   // 按顺序排列所有学习日期
    let datesLen = dates.length;
    let learnedUnits = [];

    for(let i = 0; i < datesLen; ++i) {
      learnedUnits.push(new Set());
    }
    progress.forEach(function (learningDates, fullUnitId) {
      learningDates.forEach(function(value) {
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
    goHome() {
      router.push({path: "/", replace: true});
    }
  }


});
</script>