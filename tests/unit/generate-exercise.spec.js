import Word from "@/entity/Word";
import Unit from "@/entity/Unit";
import Option from "@/entity/Option";

/*
用户故事 3 - 生成练习题
细节：对一个单元，生成对应的习题组，其中的每道习题包含一个题面，和四个选项，其中有三个错误答案和一个正确答案。题面可能是：音频，假名注音，假名+汉字，中文；选项可能是：假名+汉字，假名注音，中文。题面和选项不得是相同类型的，四个选项应是同一类型。
验收测试：
3. 给定一道习题，当题面是假名注音，那么选项应当是假名+汉字，或者中文，且四个选项类型相同。
4. 给定一道习题，当题面是中文，那么选项应当是假名注音，或者假名+汉字，且四个选项类型相同。
*/

describe("练习题选项测试", () => {
    const words = [
        new Word("日语1", "中文1", "假名1", "词性1"),
        new Word("日语2", "中文2", "假名2", "词性2"),
        new Word("日语3", "中文3", "假名3", "词性3"),
        new Word("日语4", "中文4", "假名4", "词性4")
    ];

    const unit = new Unit(words);

    test("题面是假名注音，选项应当是假名+汉字，或者中文，且四个选项类型相同", () => {
        // 设置题面类型为假名注音
        let exercise = words[0].generateExercise(0, unit, Option.KANA);
        let optionTypes = [Option.JAPANESE, Option.CHINESE];

        // 测试第一个选项类型是否为假名+汉字，或者中文
        let optionType = exercise.options[0].type;
        expect(optionTypes).toContain(optionType);

        // 测试后面的选项类型是否和第一个相同
        exercise.options.forEach((option) => {
            expect(option.type).toBe(optionType);
        });
    });

    test("题面是中文，选项应当是假名+汉字，或者假名注音，且四个选项类型相同", () => {
        // 设置题面类型为中文
        let exercise = words[0].generateExercise(0, unit, Option.CHINESE);
        let optionTypes = [Option.KANA, Option.JAPANESE];

        // 测试第一个选项类型是否为假名+汉字，或者假名注音
        let optionType = exercise.options[0].type;
        expect(optionTypes).toContain(optionType);

        // 测试后面的选项类型是否和第一个相同
        exercise.options.forEach((option) => {
            expect(option.type).toBe(optionType);
        });
    });

    test("题面是假名+汉字，选项应当是中文，或者假名注音，且四个选项类型相同", () => {
        // 设置题面类型为假名+汉字
        let exercise = words[0].generateExercise(0, unit, Option.JAPANESE);
        let optionTypes = [Option.KANA, Option.CHINESE];

        // 测试第一个选项类型是否为中文，或者假名注音
        let optionType = exercise.options[0].type;
        expect(optionTypes).toContain(optionType);

        // 测试后面的选项类型是否和第一个相同
        exercise.options.forEach((option) => {
            expect(option.type).toBe(optionType);
        });
    });
});