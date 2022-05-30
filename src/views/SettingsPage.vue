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

        <ion-item-group>
          <ion-item-divider>
            <ion-label>记忆曲线设定</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label>第一次复习</ion-label>
            <ion-input
              v-model="reviewSetting1"
              :min="1"
              :max="reviewSetting2 - 1"
              type="number"
              @ionChange="updateReviewSetting('1', this.reviewSetting1)"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>第二次复习</ion-label>
            <ion-input
              v-model="reviewSetting2"
              :min="reviewSetting1 + 1"
              :max="reviewSetting3 - 1"
              type="number"
              @ionChange="updateReviewSetting('2', this.reviewSetting2)"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>第三次复习</ion-label>
            <ion-input
              v-model="reviewSetting3"
              :min="reviewSetting2 + 1"
              :max="reviewSetting4 - 1"
              type="number"
              @ionChange="updateReviewSetting('3', this.reviewSetting3)"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>第四次复习</ion-label>
            <ion-input
              v-model="reviewSetting4"
              :min="reviewSetting3 + 1"
              :max="reviewSetting5 - 1"
              type="number"
              @ionChange="updateReviewSetting('4', this.reviewSetting4)"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>第五次复习</ion-label>
            <ion-input
              v-model="reviewSetting5"
              :min="reviewSetting4 + 1"
              :max="15"
              type="number"
              @ionChange="updateReviewSetting('5', this.reviewSetting5)"
            ></ion-input>
          </ion-item>
        </ion-item-group>
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
  IonItemGroup,
  IonItemDivider,
  IonInput,
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
    IonItemGroup,
    IonItemDivider,
    IonInput,
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

    /**
     * @function updateReviewSetting
     * @description 更新记忆曲线设定
     * @param {String} reviewId
     * @param {String} newVal
     */
    updateReviewSetting(reviewId, newVal) {
      store.commit("updateReviewSetting", {
        reviewId: reviewId,
        newVal: parseInt(newVal),
      });
    },
  },

  data() {
    return {
      time: this.formatDate(store.state.currDate),
      reviewSettings: store.state.reviewSettings,
      reviewSetting1: 1,
      reviewSetting2: 2,
      reviewSetting3: 4,
      reviewSetting4: 7,
      reviewSetting5: 15,
    };
  },

  mounted() {
    this.reviewSetting1 = this.reviewSettings.get("1");
    this.reviewSetting2 = this.reviewSettings.get("2");
    this.reviewSetting3 = this.reviewSettings.get("3");
    this.reviewSetting4 = this.reviewSettings.get("4");
    this.reviewSetting5 = this.reviewSettings.get("5");
  },
});
</script>
