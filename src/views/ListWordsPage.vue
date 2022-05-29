<!-- 这个页面应当有：根据记忆曲线复习，根据错题本复习，随即复习 三个栏目 -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="back()"> 返回 </ion-button>
        </ion-buttons>
        <ion-title>单词列表</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-item v-for="(word, index) in words" :key="index">
        <ion-label>
          {{ word.japanese }}
        </ion-label>
        <ion-badge color="secondary">
          回答错误 {{ wrongCounts[index] }} 次
        </ion-badge>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonButton,
  IonBadge,
  IonButtons,
} from "@ionic/vue";

import store from "@/store";
import router from "@/router";

export default defineComponent({
  name: "ListWordsPage",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonItem,
    IonButton,
    IonBadge,
    IonButtons,
  },

  mounted() {
    let unit = store.state.currUnit;
    this.wrongCounts = store.state.wrongCounts;
    this.words = unit.words;

    // 结算时记录复习
    let fullUnitId = store.state.fullUnitId;
    let reviewProgress = store.state.reviewProgress;
    let reviewTasks = reviewProgress.get(fullUnitId);
    if (reviewTasks !== undefined) {
      for (const reviewTask of reviewTasks) {
        if (reviewTask.reviewId === store.state.currReviewId) {
          reviewTask.isCompleted = true;
          break;
        }
      }
    }

    // 移除 fullUnitId 和 reviewId，避免干扰下次复习
    store.commit("removeFullUnitId");
    store.commit("removeCurrReviewId");
  },

  data() {
    return {
      words: this.words,
      wrongCounts: this.wrongCounts,
    };
  },

  methods: {
    back() {
      router.push({ path: "/", replace: true });
    },
  },
});
</script>

<style scoped>
</style>