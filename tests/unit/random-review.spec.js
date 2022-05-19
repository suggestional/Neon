/*
用户故事 9 - 根据词书随机选择复习单词
细节：当用户选择随机复习时，会在当前词书范围内随机选择十个单词，生成一套有顺序的习题组，对其中每一道习题，用户需要选出正确的选项。无论正确与否，都进入下一题，但选错会将这个单词放到练习队列最后，重新练习。
验收测试：
1. 给定一本词书，当用户开始随机复习，那么应当随机选择十个单词，单词都在给定词书内。
2. 给定一本词书，当用户开始随机复习，那么应当跳转到练习页面。

 */

import {shallowMount} from '@vue/test-utils'
import ReviewPage from '@/views/ReviewPage.vue'
import store from "@/store";
import router from "@/router";

describe("根据词书随机选择复习单词", () => {
    test("给定一本词书，当用户开始随机复习，那么应当随机选择十个单词，单词都在给定词书内", () => {
        var bookId = store.state.currWordbookId;

        book = [];
        for (var unitId = 0; unitId < 5; ++unitId) {
            var book = book.concat(require('../../src/assets/Book' + bookId + '/Unit' + unitId + '.json'));
        }

        const wrapper = shallowMount(ReviewPage);
        wrapper.componentVM.randomReview();//选择随机复习
        let words = store.state.currUnit.words;

        words.forEach(function(word) {
            expect(book).toContainEqual(word);
        });
    });

    test("给定一本词书，当用户开始随机复习，那么应当跳转到练习页面", () => {
        const pushSpy = jest.spyOn(router, "push"); // 监听 push
        const wrapper = shallowMount(ReviewPage);
        wrapper.componentVM.randomReview();//选择随机复习
        expect(pushSpy).toHaveBeenCalledWith({path: "/exercise", replace: true,}); // 跳转到练习页面
    });
});