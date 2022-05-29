<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>今日学习</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item lines="none">
        <ion-label style="text-align: center">
          <ion-title> {{ word.japanese }}</ion-title>
        </ion-label>
      </ion-item>
      <ion-content>
        <ion-card>
          <ion-card-content style="text-align: center">
            <p>中文：{{ word.chinese }}</p>
            <p>假名：{{ word.kana }}</p>
            <p>词性：{{ word.wordClass }}</p>
          </ion-card-content>
        </ion-card>
        <ion-button
          class="next"
          color="primary"
          @click="next()"
          expand="block"
          v-if="id <= 8"
          >下一个
        </ion-button>
        <ion-button
          class="next"
          color="primary"
          @click="next()"
          expand="block"
          v-if="id >= 9"
          >开始练习
        </ion-button>
        <ion-button
          class="previous"
          color="primary"
          @click="previous()"
          expand="block"
          v-if="id >= 1"
          >上一个
        </ion-button>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  toastController,
} from "@ionic/vue";
import router from "@/router";
import store from "@/store";
import ReviewTask from "@/entity/ReviewTask";

var id = 0;

export default {
  name: "learnWord",
  components: {
    IonCard,
    IonCardContent,
    IonHeader,
    IonItem,
    IonContent,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonButton,
    IonPage,
  },

  methods: {
    next() {
      id = id + 1;
      if (id === 9) {
        this.openToast("It is the end of the unit", 1000);
      }
      if (id >= 10) {
        id = 0;
        this.id = id;
        // 如果已经存在学习记录，那么增加一次学习记录，否则创建新的映射
        if (
          typeof store.state.progress.get(store.state.fullUnitId) ===
          "undefined"
        ) {
          store.state.progress.set(store.state.fullUnitId, [
            new Date(store.state.currDate.toLocaleDateString()),
          ]);
        } else {
          store.state.progress
            .get(store.state.fullUnitId)
            .push(new Date(store.state.currDate.toLocaleDateString()));
        }

        // 创建新的复习任务；即使已经存在复习任务，也覆盖之前的复习任务
        let reviewSettings = store.state.reviewSettings;
        let reviewTasks = [];
        reviewSettings.forEach(function (value, key) {
          reviewTasks.push(
            new ReviewTask(
              store.state.fullUnitId,
              key,
              new Date(store.state.currDate.toLocaleDateString())
            )
          );
        });
        store.state.reviewProgress.set(store.state.fullUnitId, reviewTasks);

        router.push({ path: "/exercise", replace: true });
      }
      this.word = this.words[id];
      this.id = id;
    },

    previous() {
      id = id - 1;
      if (id <= 0) {
        this.openToast("It is the beginning of the unit", 500);
        id = 0;
      }
      this.word = this.words[id];
      this.id = id;
    },

    async openToast(msg, duration) {
      if (store.state.debug) {
        return;
      }
      const toast = await toastController.create({
        message: msg,
        duration: duration,
      });
      return toast.present();
    },
  },
  data() {
    var unit = store.state.currUnit;
    var words = unit.words;
    id = 0;
    return {
      id: id,
      words: words,
      word: words[id],
    };
  },
};
</script>
<style>
.next {
  width: 100px;
  float: right;
}

.previous {
  width: 100px;
  float: left;
}
</style>