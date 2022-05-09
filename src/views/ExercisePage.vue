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
        <ion-card-content>
          <p>{{ option.text }}</p>
        </ion-card-content>
      </ion-card>
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
  IonContent,
  IonLabel,
  IonCard,
  IonItem,
  IonCardContent,
  toastController,
} from "@ionic/vue";
import Queue from "@/lib/Queue";
import router from "@/router";
import store from "@/store";

export default defineComponent({
  name: "ExercisePage.vue",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonCard,
    IonItem,
    IonCardContent,
  },

  data() {
    var unit = store.state.currUnit;
    console.log(unit)
    var exercises = new Queue(unit.generateExercises());
    var wrongCounts = new Array(10).fill(0);
    return {
      exercises: exercises,
      exercise: exercises.items[0],
      wrongCounts: wrongCounts,
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
          store.state.wrongCounts = this.wrongCounts;
          router.push({path:'/list-words', replace: true});
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
      this.wrongCounts[wrongExercise.id] += 1;
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
      const toast = await toastController.create({
        message: msg,
        duration: duration,
      });
      return toast.present();
    },
  },
});
</script>

<style scoped>
</style>