
/*
用户故事 1 - 切换词书
细节：软件中有不同难度的单词书，难度包括入门、初级、中级、高级，用户可根据自己的需求选择不同的单词书。
验收测试：
1. 给定一位用户，当用户未选择过词书，那么自动为用户选择入门难度的单词书。
2. 给定一位用户，当用户选择了一本词书，那么保存用户的词书选择。
 */

import {shallowMount} from "@vue/test-utils";
import SelectWordbook from "@/views/SelectWordbook";
import store from "@/store";

describe("切换词书测试", () => {
    test("用户未选择过词书，那么自动为用户选择入门难度的单词书", () => {
        // 什么也不干，应当有一个默认值
        expect(store.state.currWordbookId).toBe("0");
    });

    test("给定一位用户，当用户选择了一本词书，那么保存用户的词书选择。", () => {
        const wrapper = shallowMount(SelectWordbook);
        wrapper.componentVM.buttonClick("3"); // 选择下标为 3 的词书
        expect(store.state.currWordbookId).toBe("3");
    });

});