<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>今日学习</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content >
    <ion-item class="word" >
      <ion-label>
        <p>
         {{wordList.japanese}}
        </p>
      </ion-label>
    </ion-item>
    <ion-content >

      <ion-card >
        <ion-card-header>
        </ion-card-header>
        <ion-card-content>
          <p>中文：{{wordList.chinese}}</p>
          <p>假名：{{wordList.kana}}</p>
          <p>词性：{{wordList.wordClass}}</p>
        </ion-card-content>
      </ion-card>
      <ion-button class="next" color="primary" @click="next()" expand="block">下一个</ion-button>
      <ion-button class="previous" color="primary" @click="previous()" expand="block">上一个</ion-button>
    </ion-content>
    </ion-content>
  </div>
</template>

<script>


var wordLists = require('../../resources/Book0/Unit0.json');
var id = 0;
export default {
  name: 'learnWord',

mounted() {

  console.log(wordLists[id]);
  console.log(id);

},
  methods:{
    next(){
      id=id+1;
      if(id>=9){
        alert("It is the end of the unit")
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
        alert("It is the beginning of the unit")
      }
      console.log(wordLists[id]);
      console.log(id);
      this.wordList.japanese=wordLists[id].japanese;
      this.wordList.wordClass=wordLists[id].wordClass;
      this.wordList.chinese=wordLists[id].chinese;
      this.wordList.kana=wordLists[id].kana;

    },
  },
  data() {
    return {
      wordList: {
        chinese: wordLists[id].chinese,
        japanese:wordLists[id].japanese,
        kana:wordLists[id].kana,
        wordClass:wordLists[id].kana,
      },

    };

  },

}


</script>
<style>
.word{
  width: 200px;
  margin-left: 500px;
}
.next{
  width:100px;
  float: right;
}
.previous{
  width:100px;
  float:left;
}
</style>