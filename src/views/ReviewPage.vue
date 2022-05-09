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
      console.log(bookId)
      var words = [];
      var total = [];
      // TODO: 从一本书中随机选十个单词
      var unit;
      var i,j;
     for (unit=0;unit<=4;unit++) {
      var data0 = require('../assets/Book' + bookId + '/Unit' + unit + '.json');
        //var word = Unit.initFromJSON(data);
        //console.log(data0)
        for (i=0;i<=9;i++)
      {
        total.push(data0[i])

      }
      }
      //console.log(total)
      for( j=0;j<10;j++){
        var random = parseInt(Math.random()*total.length)
        words.push(total[random])
      }
     console.log(words)
      store.state.currUnit = Unit.initFromJSON(words);
      store.state.currUnit = new Unit(words);
     //console.log(store.state.currUnit)
      router.push({path: "/exercise", replace: true});
    },
  },




});

</script>

<style scoped>

</style>