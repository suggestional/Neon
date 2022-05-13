<!-- 这个页面应当有：根据记忆曲线复习，根据错题本复习，随即复习 三个栏目 -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>单词列表</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-item
          v-for="(word, index) in words"
          :key="index"
      >
        <ion-label>
          {{ word.japanese }}
        </ion-label>
        <ion-badge color="secondary">
          回答错误 {{ wrongCounts[index] }} 次
        </ion-badge>

      </ion-item>

      <ion-button color="primary" @click="goHome()" expand="block">返回首页</ion-button>

    </ion-content>
  </ion-page>

</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonButton
} from '@ionic/vue';

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
    IonButton
  },

  mounted() {
    let unit = store.state.currUnit;
    this.wrongCounts = store.state.wrongCounts;
    this.words = unit.words;
  },

  data() {
    return {
      words: this.words,
      wrongCounts: this.wrongCounts,
    };
  },

  methods: {
    goHome() {
      router.push({path: "/", replace: true});
    }
  }
});


</script>

<style scoped>

</style>