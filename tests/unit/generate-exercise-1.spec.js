// 给定一个单元，当用户开始练习，那么应当生成一个习题组，习题的总数应当和单词的总数相等，且一一对应
import Unit from '@/Entity/Unit'
import Word from "@/Entity/Word";

const words = [
    new Word("日语1", "中文1", "假名1", "例句1"),
    new Word("日语2", "中文2", "假名2", "例句2"),
    new Word("日语3", "中文3", "假名3", "例句3")
];

const unit = new Unit(words);
const exercises = unit.generateExercises();

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
