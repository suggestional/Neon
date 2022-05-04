<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>今日学习</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content >
    <ion-item class="word" >
      <ion-label  style="text-align:center">
      <ion-title>
        {{ word.japanese }}</ion-title>
      </ion-label>
    </ion-item>
    <ion-content >
      <ion-card >
        <ion-card-content  style="text-align:center">
          <ion-title>中文：{{ word.chinese }}</ion-title>
          <ion-title>假名：{{ word.kana }}</ion-title>
          <ion-title>词性：{{ word.wordClass }}</ion-title>
        </ion-card-content>
      </ion-card>
      <ion-button class="next" color="primary" @click="next()" expand="block" v-if="hide">下一个</ion-button>
      <ion-button class="next" color="primary" @click="next()" expand="block" v-if="hidden">开始练习</ion-button>
      <ion-button class="previous" color="primary" @click="previous()" expand="block" v-if="head" >上一个</ion-button>
    </ion-content>
    </ion-content>
  </div>
</template>

<script>


import {
  IonCard,
  IonCardContent,
  IonHeader,
  IonItem,
  IonContent,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonButton, toastController,

} from "@ionic/vue";
import Unit from "@/entity/Unit";
import router from "@/router";

var id = 0;

export default {
  name: 'learnWord',
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
  },

  methods:{
    next(){
      id = id + 1;
      if(id >= 0){
        this.head = true;
      }
      if(id === 8){
        this.hide = false;
        this.hidden = true;
        this.openToast("It is the end of the unit",1000);
      }
      if(id >= 9){
        id = 9;
        router.push({path:'/exercise',query: {unitId: this.unitId}});
        return;
      }
      this.word = this.words[id];
    },

    previous(){
      id = id - 1;
      if(id <= 0){
        this.openToast("It is the beginning of the unit",500);
        this.head = false;
        id = 0;
      }
      if(id <= 9){
        this.hidden = false;
        this.hide = true;
      }
      if(id === 1){
        this.head=true;
      }
      this.word = this.words[id];
    },

    async openToast(msg, duration) {
      const toast = await toastController
          .create({
            message: msg,
            duration: duration
          })
      return toast.present();
    },
  },
  data() {
    var data = require('../assets/Book' + this.$store.state.currWordbookId + '/Unit'+ this.$route.query.unitId + '.json');
    var unit = Unit.initFromJSON(data);
    var words = unit.words;
    return {
      hide:true,
      hidden:false,
      head:false,
      words: words,
      word: words[id],
      unitId: this.$route.query.unitId,
    };
  },
}


</script>
<style>

.next{
  width:100px;
  float: right;
}
.previous{
  width:100px;
  float:left;
}
</style>