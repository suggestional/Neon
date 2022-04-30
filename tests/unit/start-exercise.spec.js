import Word from "@/entity/Word";
import Option from "@/entity/Option";
import Exercise from "@/entity/Exercise";
import Queue from "../../src/lib/Queue";

/*
用户故事 5 - 进行练习
细节：用户练习时，会得到一套有顺序的习题组，对其中每一道习题，用户需要选出正确的选项。无论正确与否，都进入下一题，
但选错会将这个单词放到练习队列最后，重新练习。
验收测试：
1. 给定一个习题组和当前正在做的习题，当用户选择了这道习题的正确选项，那么题库中的这道题的错误次数应当为 0，当前习题应当指向下一题，这道题被标记为正确回答。
2. 给定一个习题组和当前正在做的习题，当用户选择了这道习题的错误选项，那么题库中的这道习题的错误次数应当加上1，且这道题被移动到题库的最尾端，
题库的总长度保持不变，当前习题应当指向下一题。
3. 给定一个习题组，当所有习题都被标记为正确回答，那么显示单元练习结算列表。

 */

describe("进行练习测试", () => {

  const exercises_test = [
    new Exercise(
        new Word("日语1", "中文1", "假名1", "词性1"),
        new Option(new Word(),'中文1',2),
        [new Option(),new Option(),new Option(),new Option()],
        0
    ),
    new Exercise(
        new Word("日语2", "中文2", "假名2", "词性2"),
        new Option(new Word(),'中文2',2),
        [new Option(),new Option(),new Option(),new Option()],
        3
    ),
    new Exercise(
        new Word("日语3", "中文3", "假名3", "词性3"),
        new Option(new Word(),'中文1',2),
        [new Option(),new Option(),new Option(),new Option()],
        1
    ),
    new Exercise(
        new Word("日语4", "中文4", "假名4", "词性4"),
        new Option(new Word(),'中文1',2),
        [new Option(),new Option(),new Option(),new Option()],
        2
    ),
  ]

  const correctAnswersIndex = [0,3,1,2]

  let exercise_queue = new Queue(exercises_test);



  test("选择正确，该题错误次数为0，当前习题应当指向下一题，这道题被标记为正确回答", () => {
    const exerciseLength = exercises_test.length
    let length = exercises_test.length;
    for(let i=0;i<exerciseLength;i++){
      expect(exercise_queue.getItems()[0].correctAnswerIndex).toBe(correctAnswersIndex[i]);
      length--;
      let currentExercise = exercise_queue.dequeue();

      expect(currentExercise.isCorrect).toBe(true);  //to complete 这道题被标记为正确回答，未通过
      expect(currentExercise.wrongTimes).toBe(0);  //to complete 错误次数应当为0，未通过
      expect(exercise_queue.size()).toBe(length);//回答正确题库长度减一
      if(exercise_queue.size()>0){
        expect(exercise_queue.getItems()[0].word).toBe(exercises_test[0].word) //除了题库只剩下一题的情况，当前应该指向下一题
      }
    }
  });

  test("选择错误，错误次数加1，且这道题被移动到题库的最尾端,题库的总长度保持不变，当前习题应当指向下一题", () => {
    const exerciseLength = exercises_test.length
    for(let i=0;i<exerciseLength;i++){
      let expectWrongTime = exercise_queue.getItems()[0].wrongTimes +1
      exercise_queue.getItems()[0].addWrongTime();//to complete 错误次数加1 未通过
      expect(exercise_queue.getItems()[0].wrongTimes).toBe(expectWrongTime) //to complete 错误次数加1 未通过
      let wrongExercise = exercise_queue.getItems()[0];
      exercise_queue.dequeue();
      let lastExercise = exercise_queue.enqueue(wrongExercise);
      expect(lastExercise.word).toBe(wrongExercise.word) //这道题被移动到题库的最尾端
      expect(exercise_queue.size()).toBe(exerciseLength) //题库的总长度保持不变
      expect(exercise_queue.getItems()[0].word).toBe(exercises_test[0].word) //当前习题应当指向下一题
    }
  });

  test("当所有习题都被标记为正确回答，那么显示单元练习结算列表", () => {
    const exerciseLength = exercises_test.length
    for(let i=0;i<exerciseLength;i++){
      exercise_queue.getItems()[0].isCorrect = true;
      exercise_queue.dequeue();
    }
    expect(exercise_queue.size()).toBe(0);
    // to complete 显示单元练习结算列表
  });

});