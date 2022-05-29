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
            <h2>{{ unit.name }} </h2>
          </ion-label>
          <ion-badge v-if="hasBeenLearned('Book' + wordbookId + ' ' + 'Unit' + unit.id)" color="secondary">
            已学习
          </ion-badge>

        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {defineComponent} from "vue";
import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonButton, IonButtons,} from "@ionic/vue";
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
      wordbookId: store.state.currWordbookId,
    };
  },
  methods: {
    back() {
      router.push({path: "/tabs/learn", replace: true});
    },

    select(unitId) {
      this.currentId = unitId;
      var bookId = store.state.currWordbookId;
      store.state.fullUnitId = "Book" + bookId + " " + "Unit" + unitId;
      var data = require('../assets/Book' + bookId + '/Unit' + unitId + '.json');
      store.state.currUnit = Unit.initFromJSON(data);
      router.push({path: '/learn-word', replace: true});
    },

    hasBeenLearned(fullUnitId) {
      return store.state.progress.get(fullUnitId) !== undefined;
    }
  },
});
</script>
