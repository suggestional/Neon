<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="back()"> 返回 </ion-button>
        </ion-buttons>
        <ion-title>选择单元</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          button
          @click="select(unit.id)"
          detail
          v-for="unit in units"
          :key="unit.id"
        >
          <ion-label>
            <h2>{{ unit.name }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {defineComponent} from "vue";
import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar,} from "@ionic/vue";
import router from "@/router";
import store from "@/store";
import Unit from "@/entity/Unit";

export default defineComponent({
  name: "SelectUnit",
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
  },
  data() {
    return {
      units: [
        {
          id: "0",
          name: "Unit 0",
        },
        {
          id: "1",
          name: "Unit 1",
        },
        {
          id: "2",
          name: "Unit 2",
        },
        {
          id: "3",
          name: "Unit 3",
        },
        {
          id: "4",
          name: "Unit 4",
        },
      ],
      currentId: "0",
    };
  },
  methods: {
    select(unitId) {
      this.currentId = unitId;
      var bookId = store.state.currWordbookId;
      var data = require('../assets/Book' + bookId + '/Unit' + unitId + '.json');
      store.state.currUnit = Unit.initFromJSON(data);
      router.push({path: '/learn-word'});
    },
  },
});
</script>
