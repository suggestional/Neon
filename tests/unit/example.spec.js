import Unit from "@/entity/Unit";

//import Tab1Page from '../../src/views/LearnPage.vue'




describe('Tab1Page.vue', () => {
  test("题面是假名+汉字，选项应当是中文，或者假名注音，且四个选项类型相同", () => {
    // 设置题面类型为假名+汉字
    console.log(Unit.initFromJSON('../assets/Book0/Unit0.json'));
  });

})
