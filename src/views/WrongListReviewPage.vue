<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>练习</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-item lines="none">
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
  alertController,
} from "@ionic/vue";
import router from "@/router";
import store from "@/store";

export default defineComponent({
  name: "WrongListReviewPage",
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
    return {
      exercise: store.state.wrongList.items[0],
    };
  },

  methods: {
    /**
     * @function selectOption
     * @description 选择了某个选项，判断选项是否正确
     * @param {Number} index - 选择的选项下标
     */
    async selectOption(index) {
      if (this.exercise.correctAnswerIndex === index) {
        if (this.correct()) {
          const alert = await alertController.create({
            header: "错题本已清空",
            message: "恭喜，错题本已清空，点击按钮回到复习界面",
            buttons: [
              {
                text: "返回",
                handler: () => {
                  router.push({ path: "/tabs/review", replace: true });
                },
              },
            ],
          });
          await alert.present();
          return;
        } else {
          this.openToast("恭喜，回答正确！", 500);
        }
      } else {
        this.openToast("回答错误，正确答案：" + this.wrong(), 1500);
      }
      this.exercise = store.state.wrongList.items[0];
    },

    /**
     * @function wrong
     * @description 目前在队列头部的题目回答错误，把这道题移动到队列末尾
     * @return {String} 练习题的正确答案
     */
    wrong() {
      let wrongExercise = store.state.wrongList.dequeue();
      store.state.wrongList.enqueue(wrongExercise);
      return wrongExercise.options[wrongExercise.correctAnswerIndex].text;
    },

    /**
     * @function correct
     * @description 目前在队列头部的题目回答正确，删除这道题
     * @return {Boolean} 练习题是否全部回答完毕
     */
    correct() {
      store.state.wrongList.dequeue();
      return store.state.wrongList.isEmpty();
    },

    /**
     * @function openToast
     * @description 打开 Toast 提示框
     * @param {String} msg - 要提示的信息
     * @param {Number} duration - 持续时间，单位为 ms
     */
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