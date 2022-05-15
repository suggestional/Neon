<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>复习</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
        <ion-item button detail @click="this.$router.push({path: '/@todo', replace: false})">
          <ion-label>
            <h2>根据记忆曲线复习</h2>
          </ion-label>
        </ion-item>
        <ion-item button detail @click="this.$router.push({path: '/@todo', replace: false})">
          <ion-label>
            <h2>根据错题本复习</h2>
          </ion-label>
        </ion-item>
        <ion-item button detail @click="randomReview()">
          <ion-label>
            <h2>随机复习</h2>
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
  IonContent,
  IonTitle,
  IonLabel,
  IonItem,
  IonList,
} from "@ionic/vue";
import store from "@/store";
import Unit from "@/entity/Unit";
import router from "@/router";

export default defineComponent({
  name: "ReviewPage",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonItem,
    IonList,
  },

  methods: {
    /**
     * @function randomReview
     * @description 随机从当前词书中选择十个单词，组成一个 Unit，存入 store 中，然后跳转到 Exercise 界面
     */
    randomReview() {
      var bookId = store.state.currWordbookId;
      var words = [];

      // 从一本书中随机选十个单词
      let bookLen = 50;
      var wordsIndex = new Set();
      while(wordsIndex.size < 10) {
        wordsIndex.add(Math.floor(Math.random() * bookLen));
      }

      book = [];
      for (var unitId = 0; unitId < 5; ++unitId) {
        var book = book.concat(require('../assets/Book' + bookId + '/Unit' + unitId + '.json'));
      }

      wordsIndex.forEach(function (wordIndex) {
        words.push(book[wordIndex]);
      });

      store.state.currUnit = new Unit(words);
      router.push({path: "/exercise", replace: true});
    },
  },




});

</script>

<style scoped>

</style>