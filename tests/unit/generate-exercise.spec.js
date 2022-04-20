import Word from "@/Entity/Word";
import Unit from "@/Entity/Unit";
import Option from "@/Entity/Option";

describe("练习题选项测试", () => {
    const words = [
        new Word("日语1", "中文1", "假名1", "例句1"),
        new Word("日语2", "中文2", "假名2", "例句2"),
        new Word("日语3", "中文3", "假名3", "例句3"),
        new Word("日语4", "中文4", "假名4", "例句4")
    ];

    const unit = new Unit(words);

    test("题面是假名注音，选项应当是假名+汉字，或者中文，且四个选项类型相同", () => {
        let exercise = words[0].generateExercise(unit);
        let optionTypes = [Option.JAPANESE, Option.CHINESE];

        // 保证题面一定是假名注音
        while(exercise.question.type !== Option.KANA) {
            exercise = words[0].generateExercise(unit);
        }

        // 测试第一个选项类型是否为假名+汉字，或者中文
        let optionType = exercise.options[0].type;
        expect(optionTypes).toContain(optionType);

        // 测试后面的选项类型是否和第一个相同
        exercise.options.forEach((option) => {
            expect(option.type).toBe(optionType);
        });
    });

    test("题面是中文，选项应当是假名+汉字，或者假名注音，且四个选项类型相同", () => {
        let exercise = words[0].generateExercise(unit);
        let optionTypes = [Option.KANA, Option.JAPANESE];

        // 保证题面一定是中文
        while(exercise.question.type !== Option.CHINESE) {
            exercise = words[0].generateExercise(unit);
        }

        // 测试第一个选项类型是否为假名+汉字，或者假名注音
        let optionType = exercise.options[0].type;
        expect(optionTypes).toContain(optionType);

        // 测试后面的选项类型是否和第一个相同
        exercise.options.forEach((option) => {
            expect(option.type).toBe(optionType);
        });
    });

    test("题面是假名+汉字，选项应当是中文，或者假名注音，且四个选项类型相同", () => {
        let exercise = words[0].generateExercise(unit);
        let optionTypes = [Option.KANA, Option.CHINESE];

        // 保证题面一定是假名+汉字
        while(exercise.question.type !== Option.JAPANESE) {
            exercise = words[0].generateExercise(unit);
        }

        // 测试第一个选项类型是否为中文，或者假名注音
        let optionType = exercise.options[0].type;
        expect(optionTypes).toContain(optionType);

        // 测试后面的选项类型是否和第一个相同
        exercise.options.forEach((option) => {
            expect(option.type).toBe(optionType);
        });
    });
});