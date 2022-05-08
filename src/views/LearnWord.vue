<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>今日学习</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item class="word">
        <ion-label style="text-align: center">
          <ion-title> {{ word.japanese }}</ion-title>
        </ion-label>
      </ion-item>
      <ion-content>
        <ion-card>
          <ion-card-content style="text-align: center">
            <p>中文：{{ word.chinese }}</p>
            <p>假名：{{ word.kana }}</p>
            <p>词性：{{ word.wordClass }}</p>
          </ion-card-content>
        </ion-card>
        <ion-button
          class="next"
          color="primary"
          @click="next()"
          expand="block"
          v-if="hide"
          >下一个</ion-button
        >
        <ion-button
          class="next"
          color="primary"
          @click="next()"
          expand="block"
          v-if="hidden"
          >开始练习</ion-button
        >
        <ion-button
          class="previous"
          color="primary"
          @click="previous()"
          expand="block"
          v-if="head"
          >上一个</ion-button
        >
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonCard,
  IonCardContent,
  IonHeader,
  IonItem,
  IonContent,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonButton,
  IonPage,
  toastController,
} from "@ionic/vue";
import router from "@/router";
import store from "@/store";

var id = 0;

export default {
  name: "learnWord",
  components: {
    IonCard,
    IonCardContent,
    IonHeader,
    IonItem,
    IonContent,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonButton,
    IonPage,
  },

  methods: {
    next() {
      id = id + 1;
      if (id >= 0) {
        this.head = true;
      }
      if (id === 8) {
        this.hide = false;
        this.hidden = true;
        this.openToast("It is the end of the unit", 1000);
      }
      if (id >= 9) {
        id = 9;
        router.push({path:'/exercise'});
        return;
      }
      this.word = this.words[id];
    },

    previous() {
      id = id - 1;
      if (id <= 0) {
        this.openToast("It is the beginning of the unit", 500);
        this.head = false;
        id = 0;
      }
      if (id <= 9) {
        this.hidden = false;
        this.hide = true;
      }
      if (id === 1) {
        this.head = true;
      }
      this.word = this.words[id];
    },

    async openToast(msg, duration) {
      const toast = await toastController.create({
        message: msg,
        duration: duration,
      });
      return toast.present();
    },
  },
  data() {
    var unit = store.state.currUnit
    var words = unit.words;
    return {
      hide: true,
      hidden: false,
      head: false,
      words: words,
      word: words[id],
    };
  },
};
</script>
<style>
.next {
  width: 100px;
  float: right;
}
.previous {
  width: 100px;
  float: left;
}
</style>