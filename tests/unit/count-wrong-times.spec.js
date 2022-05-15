import {shallowMount} from "@vue/test-utils";
import ExercisePage from "@/views/ExercisePage";
import store from "@/store";
import Unit from "@/entity/Unit";

/*
用户故事 7 - 统计练习错误次数
细节：在练习结束后的结算清单中显示每个单词的错误次数
验收测试：
1. 给定一个习题组和其中一道题，当用户第一次就做对这道题时，应当记录这道题的错误次数为 0 次，错题本列表长度不变。
2. 给定一个习题组和其中一道题，当用户这道题做错 1 次时，应当记录这道题的错误次数为  1 次，并且在错题本列表中增加这道题，错题本列表长度 + 1。
3. 给定一个习题组和其中一道题，当用户这道题做错 2 次时，应当记录这道题的错误次数为 2 次，并且在错题本列表中增加这道题，错题本列表长度 + 1。
 */

describe("统计错误次数测试", () => {
    var data = require('@/assets/Book0/Unit0.json');
    store.state.currUnit = Unit.initFromJSON(data);

    test("一个习题组和其中一道题，当用户第一次就做对这道题时，应当记录这道题的错误次数为 0 次，错题本列表长度不变", () => {
        const wrapper = shallowMount(ExercisePage);
        let curExercise = wrapper.componentVM.exercise;
        let wrongLen = store.state.wrongList.size();
        let correctAnswerIndex = curExercise.correctAnswerIndex;

        wrapper.componentVM.selectOption(correctAnswerIndex); // 第一题回答正确
        expect(wrapper.componentVM.wrongCounts[curExercise.id]).toBe(0);  // 错误次数为 0
        expect(store.state.wrongList.size()).toBe(wrongLen);    // 错题本列表长度不变
    });

    test("用户这道题做错 1 次时，应当记录这道题的错误次数为  1 次，并且在错题本列表中增加这道题，错题本列表长度 + 1", () => {
        const wrapper = shallowMount(ExercisePage);
        let curExercise = wrapper.componentVM.exercise;
        let wrongLen = store.state.wrongList.size();
        let correctAnswerIndex = curExercise.correctAnswerIndex;

        wrapper.componentVM.selectOption((correctAnswerIndex + 1) % 4); // 第一题回答错误
        expect(wrapper.componentVM.wrongCounts[curExercise.id]).toBe(1);  // 错误次数为 1
        expect(store.state.wrongList.size()).toBe(wrongLen + 1);    // 错题本列表长度 + 1
    });

    test("用户这道题做错 2 次时，应当记录这道题的错误次数为 2 次，并且在错题本列表中增加这道题，错题本列表长度 + 1", () => {
        const wrapper = shallowMount(ExercisePage);
        let wrongLen = store.state.wrongList.size();
        let curExercise = wrapper.componentVM.exercise;
        let correctAnswerIndex = curExercise.correctAnswerIndex;

        wrapper.componentVM.selectOption((correctAnswerIndex + 1) % 4); // 第一题第一次回答错误
        expect(wrapper.componentVM.wrongCounts[curExercise.id]).toBe(1);  // 错误次数为 1
        expect(store.state.wrongList.size()).toBe(wrongLen + 1);    // 错题本列表长度为初始值 + 1

        // 后九题
        for(var i = 0; i < 9; ++i) {
            curExercise = wrapper.componentVM.exercise;
            correctAnswerIndex = curExercise.correctAnswerIndex;
            wrapper.componentVM.selectOption(correctAnswerIndex); // 回答正确
        }

        // 第二次做第一题
        curExercise = wrapper.componentVM.exercise;
        correctAnswerIndex = curExercise.correctAnswerIndex;
        wrapper.componentVM.selectOption((correctAnswerIndex + 1) % 4); // 第一题第二次回答错误
        expect(wrapper.componentVM.wrongCounts[curExercise.id]).toBe(2);  // 错误次数为 2
        expect(store.state.wrongList.size()).toBe(wrongLen + 1);    // 错题本列表长度为初始值 + 1
    });

});