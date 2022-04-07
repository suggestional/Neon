<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>设置</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>

      <ion-list>
        <ion-item button @click="buttonClick()" detail>
          <ion-label>
            设置1
          </ion-label>
        </ion-item>
        <ion-item button @click="buttonClick()" detail>
  <!--        <ion-icon :icon="walk" slot="start"></ion-icon>-->
          <ion-label>
            设置2
          </ion-label>
        </ion-item>
        <ion-item button @click="buttonClick()" detail>
          <ion-label>
            设置3
          </ion-label>
        </ion-item>
        <ion-item button @click="buttonClick()" detail>
          <ion-label>
            设置4
          </ion-label>
        </ion-item>

      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonContent, IonLabel } from '@ionic/vue';

export default defineComponent({
  name: 'SettingsPage',
  components: { IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonContent, IonPage }
});
</script>
