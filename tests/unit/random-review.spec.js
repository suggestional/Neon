/*
用户故事 10 - 根据词书随机选择复习单词
细节：当用户选择随机复习时，会在当前词书范围内随机选择十个单词，生成一套有顺序的习题组，对其中每一道习题，用户需要选出正确的选项。无论正确与否，都进入下一题，但选错会将这个单词放到练习队列最后，重新练习。
验收测试：
1. 给定一本词书，当用户开始随机复习，那么应当随机选择十个单词，生成习题组，习题组的单词应与选择的单词一一对应
2. 给定一个习题组和当前正在做的习题，当用户选择了这道习题的正确选项，那么当前习题应当指向下一题，这道题从题库中删除。
3. 给定一个习题组和当前正在做的习题，当用户选择了这道习题的错误选项，那么当前习题应当指向下一题，这道题被移动到题库的最尾端。
4. 给定一个习题组，当习题组长度为 0，那么显示单元练习结算列表。

 */

import {shallowMount} from '@vue/test-utils'
import ReviewPage from '@/views/ReviewPage.vue'
import ExercisePage from '@/views/ExercisePage.vue'
import store from "@/store";
import router from "@/router";

describe("根据词书随机选择复习单词", () => {
    test("给定一本词书，当用户开始随机复习，那么应当随机选择十个单词，生成习题组，习题组的单词应与选择的单词一一对应", () => {
        const wrapper = shallowMount(ReviewPage);
        wrapper.componentVM.randomReview();//选择随机复习
        //console.log({"path": "/list-words"});
        const exerciseWrapper = shallowMount(ExercisePage);
        let words = store.state.currUnit;
        let expectExercises = words.generateExercises();
        words = []
        for(let i = 0;i<10;i++){
            words.push(expectExercises[i].word)
        }
        let exercises = exerciseWrapper.componentVM.exercises;
        expect(exercises.size()).toBe(10);
        for(let i = 0;i<exercises.size();i++){
            expect(words).toContain(exercises.getItems()[i].word);
        }
    });

    test("给定一本词书，当用户开始随机复习，那么应当随机选择十个单词，单词都在给定词书内", () => {
        var bookId = store.state.currWordbookId;
        let bookLen = 50;
        var wordsIndex = new Set();
        while(wordsIndex.size < 10) {
            wordsIndex.add(Math.floor(Math.random() * bookLen));
        }

        book = [];
        for (var unitId = 0; unitId < 5; ++unitId) {
            var book = book.concat(require('../../src/assets/Book' + bookId + '/Unit' + unitId + '.json'));
        }

        const wrapper = shallowMount(ReviewPage);
        wrapper.componentVM.randomReview();//选择随机复习
        let words = store.state.currUnit;
        let expectExercises = words.generateExercises();
        words = []
        for(let i = 0;i<10;i++){
            words.push(expectExercises[i].word)
        }

        for(let j = 0;j<words.length;j++){
            expect(book).toContainEqual(words[j]);
        }
    });

    test("给定一个习题组和当前正在做的习题，当用户选择了这道习题的正确选项，那么当前习题应当指向下一题，这道题从题库中删除", () => {
        const reviewWrapper = shallowMount(ReviewPage);
        reviewWrapper.componentVM.randomReview();//选择随机复习

        const wrapper = shallowMount(ExercisePage);
        let exercises = wrapper.componentVM.exercises;
        let curExercise = wrapper.componentVM.exercise;
        let nextExercise = exercises.items[1];
        let exerciseLength = exercises.size();

        let correctAnswerIndex = curExercise.correctAnswerIndex;
        expect(exercises.items.indexOf(curExercise)).toBe(0); // 当前题目是第一题
        wrapper.componentVM.selectOption(correctAnswerIndex); // 第一题回答正确
        expect(wrapper.componentVM.exercises.size()).toBe(exerciseLength - 1);  // 删除第一题，题库长度 -1

        expect(exercises.items.indexOf(nextExercise)).toBe(0); // 当前题目是第二题
    });

    test("给定一个习题组和当前正在做的习题，当用户选择了这道习题的错误选项，那么当前习题应当指向下一题，这道题被移动到题库的最尾端", () => {
        const reviewWrapper = shallowMount(ReviewPage);
        reviewWrapper.componentVM.randomReview();//选择随机复习

        const wrapper = shallowMount(ExercisePage);
        let exercises = wrapper.componentVM.exercises;
        let curExercise = wrapper.componentVM.exercise;
        let nextExercise = exercises.items[1];
        let exerciseLength = exercises.size();
        let correctAnswerIndex = curExercise.correctAnswerIndex;

        expect(exercises.items.indexOf(curExercise)).toBe(0); // 当前题目是第一题
        wrapper.componentVM.selectOption((correctAnswerIndex + 1) % 4); // 第一题回答错误
        expect(exercises.items.indexOf(curExercise)).toBe(9); // 第一题错误后移动到最后
        expect(wrapper.componentVM.exercises.size()).toBe(exerciseLength);  // 题库长度不变
        expect(exercises.items.indexOf(nextExercise)).toBe(0); // 当前题目是第二题
    });

    test("给定一个习题组，当习题组长度为 0，那么显示单元练习结算列表", () => {
        const reviewWrapper = shallowMount(ReviewPage);
        reviewWrapper.componentVM.randomReview();//选择随机复习

        const wrapper = shallowMount(ExercisePage);
        const pushSpy = jest.spyOn(router, "push"); // 监听 push

        let curExercise;
        var correctAnswerIndex;

        // 前九题
        for(var i = 0; i < 9; ++i) {
            curExercise = wrapper.componentVM.exercise;
            correctAnswerIndex = curExercise.correctAnswerIndex;
            wrapper.componentVM.selectOption(correctAnswerIndex); // 回答正确
            expect(wrapper.componentVM.exercises.size()).toBe(9 - i); // 做对 i + 1 道题，剩下的题目数量为 10 - (i + 1)
        }

        // 最后一题
        curExercise = wrapper.componentVM.exercise;
        correctAnswerIndex = curExercise.correctAnswerIndex;
        wrapper.componentVM.selectOption(correctAnswerIndex); // 回答正确
        expect(wrapper.componentVM.exercises.size()).toBe(0); // 做对 i + 1 道题，剩下的题目数量为 10 - (i + 1)
        expect(pushSpy).toHaveBeenCalledWith({path: "/list-words", replace: true,}); // 跳转到结算页面
    });
});