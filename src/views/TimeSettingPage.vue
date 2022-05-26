<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>时间设置</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item class="word">
        <ion-label style="text-align: center">
          <ion-title> {{ time }} </ion-title>
        </ion-label>
      </ion-item>
      <ion-content>
        <ion-button
            class="next"
            color="primary"
            @click="increase()"
            expand="block"
        >++</ion-button>
        <ion-button
            class="previous"
            color="primary"
            @click="decrease()"
            expand="block"
        >--</ion-button>
      </ion-content>
      <ion-list>
      </ion-list>
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
  IonList,
  IonItem,
  IonContent,
  IonLabel,
  IonButton,
} from '@ionic/vue';
import store from "@/store";

var currDate = store.state.currDate.getTime();

export default defineComponent({
  name: 'TimeSettingPage',
  components: { IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonContent, IonButton, IonPage },
  methods: {
    increase() {
      currDate = currDate + (24*3600*1000)
      this.time = this.formatDate(currDate)
    },

    decrease() {
      currDate = currDate - (24*3600*1000)
      this.time = this.formatDate(currDate)
    },

    formatDate(date){
      date = new Date(date);
      var y=date.getFullYear();
      var m=date.getMonth()+1;
      var d=date.getDate();
      m = m<10?("0"+m):m;
      d = d<10?("0"+d):d;
      return y+"-"+m+"-"+d+" ";
    }

  },
  data() {
    return {
      time:this.formatDate(currDate),
    };
  },
});
</script>
