import Unit from "@/entity/Unit";
import store from "@/store";
import {shallowMount} from "@vue/test-utils";
import LearnWord from "@/views/LearnWord";
import reviewTasks from "@/views/ReviewTasks";
import router from "@/router";

/*
用户故事 5 - 根据记忆曲线列出复习单词（单元）的清单
细节：如果用户没有额外设定，那么记忆曲线会使用默认参数，即
复习次数	与学习间隔的时间（天）
1	1
2	2
3	4
4	7
5	15
验收测试：
1. 给定一个用户的学习记录与记忆曲线设定，当用户选择显示当前日期的复习清单，那么
	a. 给出当前日期需要复习单元的数量；
	b. 给出当前日期需要复习单元的列表；
	c. 并给出每个单元的复习进度（即当前是第 x 次复习）
2. 给定一个用户的学习记录与记忆曲线设定，当用户选择显示历史积压的复习清单，那么
	a. 给出历史积压的需要复习单元的数量；
	b. 按照计划完成的日期，给出当前日期之前未及时复习的单元列表；
	c. 并给出每个单元的复习进度（即当前是第 x 次复习）
3. 给定一个用户的复习清单，当用户选择其中一个单元，那么开始复习
*/

describe("根据记忆曲线列出复习单词（单元）的清单测试", () => {
    const unit1 = Unit.initFromJSON(require('@/assets/Book0/Unit0.json'));
    const fullUnitId1 = "Book0 Unit0";
    const date1 = new Date(new Date().toLocaleDateString());
    const date2 = new Date(date1.getTime() + (24*3600*1000));   // date1 之后的一天
    const date3 = new Date(date2.getTime() + (24*3600*1000));   // date1 之后的一天
    store.state.debug = true;

    test("用户选择显示当前日期的复习清单，那么给出当前日期需要复习单元的数量；给出当前日期需要复习单元的列表；并给出每个单元的复习进度（即当前是第 x 次复习）", () => {
        store.state.currUnit = unit1;
        store.state.fullUnitId = fullUnitId1;
        store.state.currDate = date1;
        store.state.progress = new Map();

        // 学习 unit1
        const learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        // 第二天
        store.state.currDate = date2;
        let reviewTaskPage = shallowMount(reviewTasks);
        // 给出当前日期需要复习单元的数量；
        expect(reviewTaskPage.componentVM.currReviewTasks.length).toBe(1);
        // 给出当前日期需要复习单元的列表；
        expect(reviewTaskPage.componentVM.currReviewTasks[0].fullUnitId).toBe("Book0 Unit0");
        // 并给出每个单元的复习进度（即当前是第 x 次复习）
        expect(reviewTaskPage.componentVM.currReviewTasks[0].reviewId).toBe("1");
    });

    test("用户选择显示历史积压的复习清单，那么给出历史积压的需要复习单元的数量；按照计划完成的日期，给出当前日期之前未及时复习的单元列表；并给出每个单元的复习进度（即当前是第 x 次复习）", () => {
        store.state.currUnit = unit1;
        store.state.fullUnitId = fullUnitId1;
        store.state.currDate = date1;
        store.state.progress = new Map();

        // 学习 unit1
        const learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        // 第三天
        store.state.currDate = date3;
        let reviewTaskPage = shallowMount(reviewTasks);
        // 给出历史积压的需要复习单元的数量
        expect(reviewTaskPage.componentVM.overdueReviewTasks.length).toBe(1);
        // 给出当前日期之前未及时复习的单元列表
        expect(reviewTaskPage.componentVM.overdueReviewTasks[0].fullUnitId).toBe("Book0 Unit0");
        // 给出每个单元的复习进度（即当前是第 x 次复习）
        expect(reviewTaskPage.componentVM.overdueReviewTasks[0].reviewId).toBe("1");
    });

    test("用户选择其中一个单元，那么开始复习", () => {
        store.state.currUnit = unit1;
        store.state.fullUnitId = fullUnitId1;
        store.state.currDate = date1;
        store.state.progress = new Map();
        const pushSpy = jest.spyOn(router, "push"); // 监听 push

        // 学习 unit1
        const learnWordPage = shallowMount(LearnWord);
        for(let i = 0; i < 10; ++i) {
            learnWordPage.componentVM.next();
        }

        // 第二天
        store.state.currDate = date2;
        let reviewTaskPage = shallowMount(reviewTasks);

        reviewTaskPage.componentVM.select("Book0 Unit0", "1"); // 选择要复习的单元
        expect(pushSpy).toHaveBeenCalledWith({ path: "/exercise", replace: true }); // 跳转到练习页面
    });
});