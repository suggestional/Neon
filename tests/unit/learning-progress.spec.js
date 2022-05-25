/*
用户故事 6 - 展示学习进度和已学习的单元列表
细节：在一本词书中，根据用户的学习记录，计算已学习单元占总单元数量的比值，作为学习进度展示给用户，同时提供已经学习的单元列表。
验收测试：
1. 给定一个用户的学习记录，当用户选择查看学习进度，那么
	a. 给出该已背单元列表的进度占比
	b. 列出已经学习的单元列表
 */
import Progress from "@/entity/Progress";
import store from "@/store";

describe("展示学习进度和已学习的单元列表", () => {
    var bookId = store.state.currWordbookId;
    var unitNum = 5;
    const progress=new Progress(bookId,unitNum);
    test("给定一个用户的学习记录，当用户选择查看学习进度，那么给出该已背单元列表的进度占比", () => {
        for(var i=0;i<unitNum;i++){
            var unit = require('../../src/assets/Book' + bookId + '/Unit' + i + '.json');
            var learnedProgress = progress.progressForUnit(i,unit);
            expect(learnedProgress).not.toBeUndefined();
            expect(learnedProgress).not.toBeNull();
        }
    });

    test("给定一个用户的学习记录，当用户选择查看学习进度，那么列出已经学习的单元列表", () => {
        for(var i=0;i<unitNum;i++){
            var learnedWords = progress.learnedWordsAtUnit(i);
            expect(learnedWords).not.toBeUndefined();
            expect(learnedWords).not.toBeNull();
        }
    });
});