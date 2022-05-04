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
          {{ exercise.question.text }}
        </ion-label>
      </ion-item>

      <ion-card
          button
          @click="selectOption(index)"
          v-for="(option, index) in exercise.options"
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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonCard,
  IonItem,
  toastController
} from '@ionic/vue';
import Unit from "@/entity/Unit";
import Queue from "@/lib/Queue";
import router from "@/router";

export default defineComponent({
  name: "ExercisePage.vue",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonCard,
    IonItem
  },

  data() {
    var unitId = this.$route ? this.$route.query.unitId : 0;
    var bookId = this.$store ? this.$store.state.currWordbookId : 0;
    var data = require('../assets/Book' + bookId + '/Unit' + unitId + '.json');
    var unit = Unit.initFromJSON(data);
    var exercises = new Queue(unit.generateExercises());
    return {
      exercises: exercises,
      exercise: exercises.items[0],
      unitId: unitId
    };
  },

  methods: {
    /**
     * @function selectOption
     * @description 选择了某个选项，判断选项是否正确
     * @param {Number} index - 选择的选项下标
     */
    selectOption(index) {
      if (this.exercise.correctAnswerIndex === index) {
        this.openToast("恭喜，回答正确！", 500);
        if (this.correct()) {
          router.push({path:'/list-words',query: {unitId: this.unitId}});
          return;
        }

      } else {
        this.openToast("回答错误，正确答案：" + this.wrong(), 1500);
      }
      this.exercise = this.exercises.items[0];
    },

    /**
     * @function wrong
     * @description 目前在队列头部的题目回答错误，把这道题移动到队列末尾
     * @return {String} 练习题的正确答案
     */
    wrong() {
      let wrongExercise = this.exercises.dequeue();
      this.exercises.enqueue(wrongExercise);
      return wrongExercise.options[wrongExercise.correctAnswerIndex].text;
    },

    /**
     * @function correct
     * @description 目前在队列头部的题目回答正确，删除这道题
     * @return {Boolean} 练习题是否全部回答完毕
     */
    correct() {
      this.exercises.dequeue();
      return this.exercises.isEmpty();
    },

    async openToast(msg, duration) {
      const toast = await toastController
          .create({
            message: msg,
            duration: duration
          })
      return toast.present();
    },
  }
});
</script>

<style scoped>

</style>