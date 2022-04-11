<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>今日学习</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item class="word">
      <ion-label >
        某某单词xxx
      </ion-label>
    </ion-item>
    <ion-content class="ion-padding">

      <ion-card >
        <ion-card-header>
          <ion-card-subtitle>xx</ion-card-subtitle>
          <ion-card-title>xxx</ion-card-title>
        </ion-card-header>
        <ion-card-content>
         显示单词详细信息 例句等等
        </ion-card-content>
      </ion-card>
      <ion-button class="next" color="primary" @click="next()" expand="block">下一个</ion-button>
      <ion-button class="previous" color="primary" @click="previous()" expand="block">上一个</ion-button>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'learnWord',
  method:{
    next(){
    },
    previous(){
     
    },
  }
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