<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
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
  IonTitle,
  IonList,
  IonItem,
  IonContent,
  IonLabel,
} from "@ionic/vue";

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
      currWordbookId: "0",
    };
  },
  methods: {
    buttonClick(wordbookId) {
      // TODO: save preference
      this.currWordbookId = wordbookId;
    },
  },
});
</script>
