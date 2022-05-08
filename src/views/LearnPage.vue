<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>学习</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
        <ion-item button detail @click="this.$router.push({path: '/select-wordbook', replace: false})">
          <ion-label>
            <h2>切换词书</h2>
          </ion-label>
        </ion-item>
        <ion-item button detail @click="this.$router.push({path: '/select-unit', replace: false})">
          <ion-label>
            <h2>开始学习</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonLabel,
  IonItem,
  IonList,
} from "@ionic/vue";

export default defineComponent({
  name: "LearnPage",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonItem,
    IonList,
  },
});
</script>
