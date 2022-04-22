import Word from "@/Entity/Word";
import Unit from "@/Entity/Unit";
import Option from "@/Entity/Option";

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
        let exercise = words[0].generateExercise(unit, Option.KANA);
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
        let exercise = words[0].generateExercise(unit, Option.CHINESE);
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
        let exercise = words[0].generateExercise(unit, Option.JAPANESE);
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