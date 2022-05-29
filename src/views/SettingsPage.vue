<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>设置</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          button
          @click="
            this.$router.push({ path: '/learning-progress', replace: false })
          "
          detail
        >
          <ion-label> 查看学习记录 </ion-label>
        </ion-item>

        <!-- <ion-item button @click="buttonClick()" detail>
          <ion-label> 设置2 </ion-label>
        </ion-item>
        <ion-item button @click="buttonClick()" detail>
          <ion-label> 设置3 </ion-label>
        </ion-item>
        <ion-item button @click="buttonClick()" detail>
          <ion-label> 设置4 </ion-label>
        </ion-item> -->
        <ion-item>
          <ion-label> 开发者选项 - 当前日期：{{ time }}</ion-label>
          <ion-button
            color="primary"
            fill="clear"
            @click="decrease()"
            style="float: left"
            >上一天
          </ion-button>
          <ion-button
            color="primary"
            fill="clear"
            @click="increase()"
            style="float: right"
            >下一天
          </ion-button>
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
  IonTitle,
  IonList,
  IonItem,
  IonContent,
  IonLabel,
  IonButton,
} from "@ionic/vue";
import store from "@/store";

export default defineComponent({
  name: "SettingsPage",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonPage,
    IonButton,
  },
  methods: {
    /**
     * @function increase
     * @description 下一天
     */
    increase() {
      /*
      store.state.currDate = new Date(store.state.currDate.getTime() + (24*3600*1000));
      this.time = this.formatDate(store.state.currDate);
       */
      store.state.currDate = new Date(
        store.state.currDate.getTime() + 24 * 3600 * 1000
      );
      var datetime =
        store.state.currDate.getFullYear() +
        "/" +
        (store.state.currDate.getMonth() + 1) +
        "/" +
        store.state.currDate.getDate();
      let reg = new Date(datetime.replace(/-/g, "/"));
      this.time = this.formatDate(reg);
    },

    /**
     * @function decrease
     * @description 上一天
     */
    decrease() {
      store.state.currDate = new Date(
        store.state.currDate.getTime() - 24 * 3600 * 1000
      );
      this.time = this.formatDate(store.state.currDate);
    },

    /**
     * @function formatDate
     * @description 格式化日期
     * @param {Date} date - 要格式化的日期
     * @return {String} 格式化后的日期
     */
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d + " ";
    },
  },
  data() {
    return {
      time: this.formatDate(store.state.currDate),
    };
  },
});
</script>
