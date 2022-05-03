/*
2. 给定一个单词，当生成了对应习题，那么
  习题的题面应是单词的音频，假名注音，假名 + 汉字，中文中的某一项，
  选项中应当有且仅有这个单词的假名 + 汉字，假名注音，中文中的一个，其他三个选项与这个单词无关。
*/

import Word from "@/entity/Word";
import Unit from "@/entity/Unit";
import Option from "@/entity/Option";

// todo: more test cases
// const words = [
//   {
//     japanese: "日语1",
//     chinese: "中文1",
//     kana: "假名1",
//     example: "例句1",
//   },
//   {
//     japanese: "日语2",
//     chinese: "中文2",
//     kana: "假名2",
//     example: "例句2",
//   },
//   {
//     japanese: "日语3",
//     chinese: "中文3",
//     kana: "假名3",
//     example: "例句3",
//   },
// ];

const words = [
    new Word("日语1", "中文1", "假名1", "例句1"),
    new Word("日语2", "中文2", "假名2", "例句2"),
    new Word("日语3", "中文3", "假名3", "例句3")
];

const unit = new Unit(words);
const exercises = unit.generateExercises();

// todo: question types; audio? kana + chinese character?
const questionTypes = [Option.KANA, Option.CHINESE];
const optionTypes = [Option.KANA, Option.CHINESE];

test("习题的题面应是单词的音频，假名注音，假名 + 汉字，中文中的某一项", () => {
    exercises.forEach((exercise) => {
        expect(exercise.question.word).toBe(exercise.word);
        expect(questionTypes).toContain(exercise.question.type);
    });
});

test("选项中应当有且仅有这个单词的假名 + 汉字，假名注音，中文中的一个，其他三个选项与这个单词无关。", () => {
    exercises.forEach((exercise) => {
        // there is only one option related to the word
        let cnt = 0;
        exercise.options.forEach((option) => {
            if (option.word.equals(exercise.word)) {
                cnt++;
                // todo: type of option matches?
                expect(optionTypes).toContain(option.type);
            }
        });
        expect(cnt).toBe(1);
    });
});