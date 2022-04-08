<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>学习</ion-title>
      </ion-toolbar>
    </ion-header>
  <ion-content fullscreen>
    <ion-card button @click="buttonClick()">
      <ion-card-header>
        <ion-card-title>切换词书</ion-card-title>
      </ion-card-header>
    </ion-card>
    <ion-card button @click="buttonClick()">
      <ion-card-header>
        <ion-card-title>开始学习</ion-card-title>
      </ion-card-header>
    </ion-card>
    <ion-card button @click="buttonClick()">
      <ion-card-header>
        <ion-card-title>开始复习</ion-card-title>
      </ion-card-header>
    </ion-card>
  </ion-content>


  </ion-page>

</template>



<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonContent, IonCard, IonCardHeader, IonCardTitle, IonTitle } from '@ionic/vue';

export default defineComponent({
  name: 'LearnPage',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonPage }
});
</script>


