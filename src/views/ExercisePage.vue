<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>练习</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-item>
        <ion-label>
          {{ exercises[0].question.text }}
        </ion-label>
      </ion-item>


      <ion-card
          button
          @click="selectOption(index)"
          detail
          v-for="(option, index) in exercises[0].options"
          :key="index"
      >
        <ion-card-header>
          <ion-card-title>{{ option.text }}</ion-card-title>
        </ion-card-header>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader, IonCardTitle, IonLabel, IonCard, IonItem } from '@ionic/vue';
import Unit from "@/entity/Unit";

var data = require('../assets/Book0/Unit0.json');
var unit = Unit.initFromJSON(data);
var exercises = unit.generateExercises();

export default defineComponent({
  name: "ExercisePage.vue",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCardHeader, IonCardTitle, IonLabel, IonCard, IonItem },

  data() {
    return {
      exercises: exercises
    };
  },

  methods: {
    /**
     * @function selectOption
     * @description 选择了某个选项，判断选项是否正确
     * @param {Number} index - 选择的选项下标
     */
    selectOption(index) {
      return index;
    },

    /**
     * @function wrong
     * @description 目前在队列头部的题目回答错误，把这道题移动到队列末尾
     */
    wrong() {

    },

    /**
     * @function wrong
     * @description 目前在队列头部的题目回答正确，删除这道题
     */
    correct() {

    }



  }
})
</script>

<style scoped>

</style>