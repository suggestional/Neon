import Unit from "@/entity/Unit";
import store from "@/store";
import {shallowMount} from "@vue/test-utils";
import LearnWord from "@/views/LearnWord";
import LearningProgressPage from "@/views/LearningProgressPage";

/*
用户故事 6 - 展示学习记录
细节：用户可以按日期查看每天学习过哪些单元。
验收测试：
1. 给定一个单元 U 和一个日期 D，当用户在日期 D 学习一次单元 U，那么在学习记录中添加日期 D 和单元 U 的对应关系，日期 D 的学习记录的总长度 + 1，学习记录总长度 + 1。
2. 给定一个单元 U 和一个日期 D，当用户在日期 D 学习两次单元 U，那么在学习记录中添加日期 D 和单元 U 的对应关系，日期 D 的学习记录的总长度 + 1，学习记录总长度 + 1。
3. 给定两个单元 U1 U2 和一个日期 D，当用户在日期 D 学习单元 U1 U2 各一次，那么在学习记录中添加日期 D 和单元 U1、日期 D 与单元 U2 的对应关系，日期 D 的学习记录的总长度 + 2，学习记录总长度 + 1。
4. 给定两个单元 U1 U2 和一个日期 D，当用户在日期 D 学习单元 U1 两次，U2 一次，那么在学习记录中添加日期 D 和单元 U1、日期 D 与单元 U2 的对应关系，日期 D 的学习记录的总长度 + 2，学习记录总长度 + 1。
5. 给定一个单元 U 和两个日期 D1 D2，当用户在日期 D1 D2 各学习单元 U 一次，那么在学习记录中添加日期 D1 和单元 U、日期 D2 与单元 U 的对应关系，日期 D1 的学习记录的总长度 + 1，日期 D2 的学习记录的总长度 + 1，学习记录总长度 + 2。
6. 给定两个单元 U1 U2 和两个日期 D1 D2，当用户在日期 D1 D2 各学习单元 U1 一次，在日期 D2 学习单元 U2 一次，那么在学习记录中添加日期 D1 和单元 U1、日期 D2 与单元 U1、日期 D2 和单元 U2 的对应关系，日期 D1 的学习记录的总长度 + 1，日期 D2 的学习记录的总长度 + 2，学习记录总长度 + 2。
*/

describe("展示学习记录测试", () => {
    const unit1 = Unit.initFromJSON(require('@/assets/Book0/Unit0.json'));
    const unit2 = Unit.initFromJSON(require('@/assets/Book0/Unit1.json'));
    const fullUnitId1 = "Book0 Unit0";
    const fullUnitId2 = "Book0 Unit1";
    const date1 = new Date(new Date().toLocaleDateString());
    const date2 = new Date(date1.getTime() + (24*3600*1000));   // date1 之后的一天
    store.state.debug = true;

    test("用户在日期 D 学习一次单元 U，那么在学习记录中添加日期 D 和单元 U 的对应关系，日期 D 的学习记录的总长度 + 1，学习记录总长度 + 1", () => {
        store.state.currUnit = unit1;
        store.state.fullUnitId = fullUnitId1;
        store.state.currDate = date1;
        store.state.progress = new Map();
        let learningProgressPage = shallowMount(LearningProgressPage);
        // 记录初始学习记录长度
        let initialDatesLen = learningProgressPage.componentVM.dates.length;
        // 初始状态 date1 没有学习记录
        expect(learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString())).toBe(-1);

        // 学习 unit1
        const learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        learningProgressPage = shallowMount(LearningProgressPage);
        // 学习记录中有 date1
        let indexOfDate1 = learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString());
        expect(indexOfDate1).not.toBe(-1);
        // date1 学习记录中有 unit1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].has(fullUnitId1)).not.toBe(-1);
        // date1 学习记录总长度 + 1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].size).toBe(1);
        // 学习记录总长度 + 1
        expect(learningProgressPage.componentVM.dates.length).toBe(initialDatesLen + 1);
    });

    test("用户在日期 D 学习两次单元 U，那么在学习记录中添加日期 D 和单元 U 的对应关系，日期 D 的学习记录的总长度 + 1，学习记录总长度 + 1", () => {
        store.state.currUnit = unit1;
        store.state.fullUnitId = fullUnitId1;
        store.state.currDate = date1;
        store.state.progress = new Map();
        let learningProgressPage = shallowMount(LearningProgressPage);
        // 记录初始学习记录长度
        let initialDatesLen = learningProgressPage.componentVM.dates.length;
        // 初始状态 date1 没有学习记录
        expect(learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString())).toBe(-1);

        // 学习 unit1
        const learnWordPage1 = shallowMount(LearnWord);
        const learnWordPage2 = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage1.componentVM.next();
            learnWordPage2.componentVM.next();
        }

        learningProgressPage = shallowMount(LearningProgressPage);
        // 学习记录中有 date1
        let indexOfDate1 = learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString());
        expect(indexOfDate1).not.toBe(-1);
        // date1 学习记录中有 unit1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].has(fullUnitId1)).not.toBe(-1);
        // date1 学习记录总长度 + 1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].size).toBe(1);
        // 学习记录总长度 + 1
        expect(learningProgressPage.componentVM.dates.length).toBe(initialDatesLen + 1);
    });

    test("用户在日期 D 学习单元 U1 U2 各一次，那么在学习记录中添加日期 D 和单元 U1、日期 D 与单元 U2 的对应关系，日期 D 的学习记录的总长度 + 2，学习记录总长度 + 1。", () => {
        store.state.currUnit = unit1;
        store.state.fullUnitId = fullUnitId1;
        store.state.currDate = date1;
        store.state.progress = new Map();

        let learningProgressPage = shallowMount(LearningProgressPage);
        // 记录初始学习记录长度
        let initialDatesLen = learningProgressPage.componentVM.dates.length;
        // 初始状态 date1 没有学习记录
        expect(learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString())).toBe(-1);

        // 学习 unit1
        let learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }
        //学习unit2
        store.state.currUnit = unit2;
        store.state.fullUnitId = fullUnitId2;
        learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        learningProgressPage = shallowMount(LearningProgressPage);
        // 学习记录中有 date1
        let indexOfDate1 = learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString());
        expect(indexOfDate1).not.toBe(-1);
        // date1 学习记录中有 unit1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].has(fullUnitId1)).not.toBe(-1);
        // date1 学习记录中有 unit2
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].has(fullUnitId2)).not.toBe(-1);
        // date1 学习记录总长度 + 2
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].size).toBe(2);
        // 学习记录总长度 + 1
        expect(learningProgressPage.componentVM.dates.length).toBe(initialDatesLen + 1);
    });

    test("用户在日期 D 学习单元 U1 两次，U2 一次，那么在学习记录中添加日期 D 和单元 U1、日期 D 与单元 U2 的对应关系，日期 D 的学习记录的总长度 + 2，学习记录总长度 + 1。", () => {
        store.state.currUnit = unit1;
        store.state.fullUnitId = fullUnitId1;
        store.state.currDate = date1;
        store.state.progress = new Map();

        let learningProgressPage = shallowMount(LearningProgressPage);
        // 记录初始学习记录长度
        let initialDatesLen = learningProgressPage.componentVM.dates.length;
        // 初始状态 date1 没有学习记录
        expect(learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString())).toBe(-1);

        // 学习 unit1
        let learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }
        //第二次学习unit1
        learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }
        //学习unit2
        store.state.currUnit = unit2;
        store.state.fullUnitId = fullUnitId2;
        learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        learningProgressPage = shallowMount(LearningProgressPage);
        // 学习记录中有 date1
        let indexOfDate1 = learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString());
        expect(indexOfDate1).not.toBe(-1);
        // date1 学习记录中有 unit1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].has(fullUnitId1)).not.toBe(-1);
        // date1 学习记录中有 unit2
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].has(fullUnitId2)).not.toBe(-1);
        // date1 学习记录总长度 + 2
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].size).toBe(2);
        // 学习记录总长度 + 1
        expect(learningProgressPage.componentVM.dates.length).toBe(initialDatesLen + 1);
    });

    test("用户在日期 D1 D2 各学习单元 U 一次，那么在学习记录中添加日期 D1 和单元 U、日期 D2 与单元 U 的对应关系，日期 D1 的学习记录的总长度 + 1，日期 D2 的学习记录的总长度 + 1，学习记录总长度 + 2。", () => {
        store.state.currUnit = unit1;
        store.state.fullUnitId = fullUnitId1;
        store.state.currDate = date1;
        store.state.progress = new Map();

        let learningProgressPage = shallowMount(LearningProgressPage);
        // 记录初始学习记录长度
        let initialDatesLen = learningProgressPage.componentVM.dates.length;
        // 初始状态 date1 没有学习记录
        expect(learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString())).toBe(-1);
        // 初始状态 date2 没有学习记录
        expect(learningProgressPage.componentVM.dates.indexOf(date2.toLocaleDateString())).toBe(-1);

        // 学习 unit1
        let learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        // 第二天
        store.state.currDate = date2;
        // 学习 unit1
        learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        learningProgressPage = shallowMount(LearningProgressPage);
        // 学习记录中有 date1
        let indexOfDate1 = learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString());
        expect(indexOfDate1).not.toBe(-1);
        // 学习记录中有 date2
        let indexOfDate2 = learningProgressPage.componentVM.dates.indexOf(date2.toLocaleDateString());
        expect(indexOfDate2).not.toBe(-1);
        // date1 学习记录中有 unit1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].has(fullUnitId1)).not.toBe(-1);
        // date1 学习记录总长度 + 1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].size).toBe(1);
        // date2 学习记录中有 unit1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate2].has(fullUnitId1)).not.toBe(-1);
        // date2 学习记录总长度 + 1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate2].size).toBe(1);
        // 学习记录总长度 + 2
        expect(learningProgressPage.componentVM.dates.length).toBe(initialDatesLen + 2);

    });

    test("用户在日期 D1 D2 各学习单元 U1 一次，在日期 D2 学习单元 U2 一次，那么在学习记录中添加日期 D1 和单元 U1、日期 D2 与单元 U1、日期 D2 和单元 U2 的对应关系，日期 D1 的学习记录的总长度 + 1，日期 D2 的学习记录的总长度 + 2，学习记录总长度 + 2。", () => {
        store.state.currUnit = unit1;
        store.state.fullUnitId = fullUnitId1;
        store.state.currDate = date1;
        store.state.progress = new Map();

        let learningProgressPage = shallowMount(LearningProgressPage);
        // 记录初始学习记录长度
        let initialDatesLen = learningProgressPage.componentVM.dates.length;
        // 初始状态 date1 没有学习记录
        expect(learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString())).toBe(-1);
        // 初始状态 date2 没有学习记录
        expect(learningProgressPage.componentVM.dates.indexOf(date2.toLocaleDateString())).toBe(-1);

        // 学习 unit1
        let learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        // 第二天
        store.state.currDate = date2;
        // 学习 unit1
        learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        // 学习 unit2
        store.state.currUnit = unit2;
        store.state.fullUnitId = fullUnitId2;
        learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        learningProgressPage = shallowMount(LearningProgressPage);
        // 学习记录中有 date1
        let indexOfDate1 = learningProgressPage.componentVM.dates.indexOf(date1.toLocaleDateString());
        expect(indexOfDate1).not.toBe(-1);
        // 学习记录中有 date2
        let indexOfDate2 = learningProgressPage.componentVM.dates.indexOf(date2.toLocaleDateString());
        expect(indexOfDate2).not.toBe(-1);
        // date1 学习记录中有 unit1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].has(fullUnitId1)).not.toBe(-1);
        // date1 学习记录总长度 + 1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate1].size).toBe(1);
        // date2 学习记录中有 unit1
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate2].has(fullUnitId1)).not.toBe(-1);
        // date2 学习记录中有 unit2
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate2].has(fullUnitId2)).not.toBe(-1);
        // date2 学习记录总长度 + 2
        expect(learningProgressPage.componentVM.learnedUnits[indexOfDate2].size).toBe(2);
        // 学习记录总长度 + 2
        expect(learningProgressPage.componentVM.dates.length).toBe(initialDatesLen + 2);

    });

});