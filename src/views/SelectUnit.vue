<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>选择单元</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button
            @click="select(unit.id)"
            detail
            v-for="unit in units"
            :key="unit.id">
          <ion-label>
            <h2>{{ unit.name }}</h2>
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
      currWordbookId: "0",
    };
  },
  methods: {
    select(unitId) {
      this.currWordbookId = unitId;
      this.$router.push({
        path: '/learn-word',
        query:{
          unitId,
        }
      })
    },
  },
});
</script>
