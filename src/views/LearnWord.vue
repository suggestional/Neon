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
         {{wordList.japanese}}</ion-title>
      </ion-label>
    </ion-item>
    <ion-content >
      <ion-card >
        <ion-card-content  style="text-align:center">
          <ion-title>中文：{{wordList.chinese}}</ion-title>
          <ion-title>假名：{{wordList.kana}}</ion-title>
          <ion-title>词性：{{wordList.wordClass}}</ion-title>
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

//var wordLists = require('../assets/Book0/Unit0.json');
//var wordLists = require('../assets/Book0/Unit1.json');
var id = 0;

var data = require('../assets/Book0/Unit0.json');
var unit = Unit.initFromJSON(data);
var wordLists = unit.words;
console.log(wordLists[id]);

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
mounted() {
  console.log(wordLists[id]);
  console.log(id);
},
  created: function() {
    //unitId
    //this.unitId = this.$route.query.unitId;
   // console.log("Unit"+ this.unitId)
    this.unitId = this.$route.query.unitId;
    console.log("Unit"+ this.unitId);
/*
    let data = require('../assets/Book0/Unit'+this.unitId+'.json');
    let unit = Unit.initFromJSON(data);
    this.wordLists= unit.words;
    */


  },
  methods:{
    next(){
      id=id+1;
      if(id>=0){
        this.head=true;
      }
      if(id===8){
        this.hide=false;
        this.hidden=true;
        this.openToast("It is the end of the unit",1000)
      }
      if(id>=9){
        //this.openToast("It is the end of the unit",500)

        id=9
        this.$router.push("/exercise")
      }
      console.log(wordLists[id]);
      console.log(id);
      this.wordList.japanese=wordLists[id].japanese;
      this.wordList.wordClass=wordLists[id].wordClass;
      this.wordList.chinese=wordLists[id].chinese;
      this.wordList.kana=wordLists[id].kana;

    },
    previous(){
      id=id-1;
      if(id<=0){
        this.openToast("It is the beginning of the unit",500);
        this.head=false;
        id=0;
      }
      if(id<=9){
        this.hidden=false;
        this.hide =true;
      }
      if(id===1){
        this.head=true;
      }
      console.log(wordLists[id]);
      console.log(id);
      this.wordList.japanese=wordLists[id].japanese;
      this.wordList.wordClass=wordLists[id].wordClass;
      this.wordList.chinese=wordLists[id].chinese;
      this.wordList.kana=wordLists[id].kana;

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

    return {
      hide:true,
      hidden:false,
      head:false,

      wordList: {
        chinese: wordLists[id].chinese,
        japanese:wordLists[id].japanese,
        kana:wordLists[id].kana,
        wordClass:wordLists[id].kana,


      }



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