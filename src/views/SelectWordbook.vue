<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="back()"> 返回 </ion-button>
        </ion-buttons>
        <ion-title>选择词书</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          button
          @click="buttonClick(wordbook.id)"
          detail
          v-for="wordbook in wordbooks"
          :key="wordbook.id"
        >
          <ion-label>
            <!-- TODO: more info -->
            <h2>{{ wordbook.name }}</h2>
            <p>{{ wordbook.description }}</p>
          </ion-label>
          <ion-badge v-if="isCurrWordbook(wordbook.id)" color="secondary">
            当前词书
          </ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBadge,
  toastController,
} from "@ionic/vue";
import store from "@/store";
import router from "@/router";

export default defineComponent({
  name: "WordbookSelection",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonPage,
    IonButton,
    IonButtons,
    IonBadge,
  },
  data() {
    return {
      wordbooks: [
        {
          id: "0",
          name: "Book 0",
          description: "this is a description",
        },
        {
          id: "1",
          name: "Book 1",
          description: "this is a description",
        },
        {
          id: "2",
          name: "Book 2",
          description: "this is a description",
        },
        {
          id: "3",
          name: "Book 3",
          description: "this is a description",
        },
      ],
    };
  },
  computed: {
    currWordbookId() {
      return store.state.currWordbookId;
    },
  },
  methods: {
    async buttonClick(wordbookId) {
      store.commit("setCurrWordbookId", wordbookId);
      const toast = await toastController.create({
        message: "已保存您的设置。",
        duration: 2000,
      });
      return toast.present();
    },
    back() {
      router.push("/tabs/learn");
    },
    isCurrWordbook(wordbookId) {
      return wordbookId === this.currWordbookId;
    },
  },
});
</script>
