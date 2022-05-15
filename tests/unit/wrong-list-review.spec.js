import {shallowMount} from "@vue/test-utils";
import store from "@/store";
import Unit from "@/entity/Unit";
import Queue from "@/lib/Queue";
import WrongListReviewPage from "@/views/WrongListReviewPage";

/*
用户故事 8 - 根据错题本列出复习单词的清单
细节：用户所有回答错误的题目都会被记录在错题本中，用户可以进入错题本重做这些题目，如果回答正确，就把题目移出错题本
验收测试：
1. 给定一个错题本和其中的一道题，当用户回答正确时，这道题应当被移出错题本，错题本总长度 - 1，当前习题指向下一题。
2. 给定一个错题本和其中的一道题，当用户回答错误时，这道题应当被移动到错题本的最后，错题本总长度不变，当前习题指向下一题。
 */

describe("按错题本复习测试", () => {
    // 错题数据
    const data = require('@/assets/Book0/Unit0.json');
    const unit = Unit.initFromJSON(data);

    test("给定一个错题本和其中的一道题，当用户回答正确时，这道题应当被移出错题本，错题本总长度 - 1，当前习题指向下一题", () => {
        store.state.wrongList = new Queue(unit.generateExercises());    // 构造一个错题本

        const wrapper = shallowMount(WrongListReviewPage);
        let curExercise = store.state.wrongList.items[0];
        let nextExercise = store.state.wrongList.items[1];
        let wrongLen = store.state.wrongList.size();
        let correctAnswerIndex = curExercise.correctAnswerIndex;

        wrapper.componentVM.selectOption(correctAnswerIndex); // 第一题回答正确
        expect(store.state.wrongList.items.indexOf(curExercise)).toBe(-1); // 第一题被移出错题本
        expect(store.state.wrongList.size()).toBe(wrongLen - 1);  // 错题本列表长度 - 1
        expect(store.state.wrongList.items.indexOf(nextExercise)).toBe(0); // 当前题目是第二题
    });

    test("给定一个错题本和其中的一道题，当用户回答错误时，这道题应当被移动到错题本的最后，错题本总长度不变，当前习题指向下一题", () => {
        store.state.wrongList = new Queue(unit.generateExercises());    // 构造一个错题本

        const wrapper = shallowMount(WrongListReviewPage);
        let curExercise = store.state.wrongList.items[0];
        let nextExercise = store.state.wrongList.items[1];
        let wrongLen = store.state.wrongList.size();
        let correctAnswerIndex = curExercise.correctAnswerIndex;

        wrapper.componentVM.selectOption((correctAnswerIndex + 1) % 4); // 第一题回答错误
        expect(store.state.wrongList.items.indexOf(curExercise)).toBe(9); // 第一题错误后移动到最后
        expect(store.state.wrongList.size()).toBe(wrongLen);  // 错题本列表长度不变
        expect(store.state.wrongList.items.indexOf(nextExercise)).toBe(0); // 当前题目是第二题
    });


});