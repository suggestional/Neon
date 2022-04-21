/*
2. 给定一个单词，当生成了对应习题，那么
  习题的题面应是单词的假名注音，假名 + 汉字，中文中的某一项，
  选项中应当有且仅有这个单词的假名 + 汉字，假名注音，中文中的一个，其他三个选项与这个单词无关。
*/

import Word from "@/Entity/Word";
import Unit from "@/Entity/Unit";
import Option from "@/Entity/Option";

describe("生成练习题测试", () => {
  const words = [
    new Word("日语1", "中文1", "假名1", "词性1"),
    new Word("日语2", "中文2", "假名2", "词性2"),
    new Word("日语3", "中文3", "假名3", "词性3"),
    new Word("日语4", "中文4", "假名4", "词性4")
  ];

  const unit = new Unit(words);
  const exercises = unit.generateExercises();

  const questionTypes = [Option.JAPANESE, Option.KANA, Option.CHINESE];
  const optionTypes = [Option.JAPANESE, Option.KANA, Option.CHINESE];

  test("当用户开始练习，那么应当生成一个习题组", () => {
    expect(exercises).not.toBe([])
    expect(exercises).not.toBeUndefined();
    expect(exercises).not.toBeNull();
  });

  test("习题的总数应当和单词的总数相等", () => {
    expect(exercises.length).toBe(words.length)
  });

  test("习题应当和单词一一对应", () => {
    exercises.forEach((exercise) => {
      expect(words).toContain(exercise.question.word);
    });
  });

  test("习题的题面应是单词的假名注音，假名 + 汉字，中文中的某一项", () => {
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


});