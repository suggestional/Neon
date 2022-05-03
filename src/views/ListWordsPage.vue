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

import Unit from "@/entity/Unit";

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
    let data = require('../assets/Book0/Unit' + this.$route.query.unitId + '.json');
    let unit = Unit.initFromJSON(data);
    this.words = unit.words;
  },

  data() {
    return {
      words: this.words
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
});


</script>

<style scoped>

</style>