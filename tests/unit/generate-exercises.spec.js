import Word from "@/entity/Word";
import Unit from "@/entity/Unit";
import Option from "@/entity/Option";

/*
用户故事 3 - 生成练习题
细节：对一个单元，生成对应的习题组，其中的每道习题包含一个题面，和四个选项，其中有三个错误答案和一个正确答案。题面可能是：音频，假名注音，假名+汉字，中文；选项可能是：假名+汉字，假名注音，中文。题面和选项不得是相同类型的，四个选项应是同一类型。
验收测试：
1. 给定一个单元，当用户开始练习，那么应当生成一个习题组，习题的总数应当和单词的总数相等，且一一对应。
2. 给定一个单词，当生成了对应习题，那么习题的题面应是单词的音频，假名注音，假名+汉字，中文中的某一项，选项中应当有且仅有这个单词的假名+汉字，假名注音，中文中的一个，其他三个选项与这个单词无关。
*/

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