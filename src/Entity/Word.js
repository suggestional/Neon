import Exercise from "@/Entity/Exercise";

class Word {
    /**
     * @function constructor
     * @description 构造函数
     * @param {String} japanese - 假名+中文，即日语单词本体
     * @param {String} chinese - 中文解释
     * @param {String} kana - 假名注音
     * @param {String} example - 单词例句
     */
    constructor(japanese, chinese, kana, example) {
        this.japanese = japanese;
        this.chinese = chinese;
        this.kana = kana;
        this.example = example;
    }

    /**
     * @function generateExercise
     * @description 生成本单词对应的练习题
     * @return {Exercise} 练习题
     */
    generateExercise() {
        let options = [];
        let correctAnswerIndex = 0;

        // todo: generate options and correctAnswerIndex

        let exercise = new Exercise(this.japanese, this.chinese, options, correctAnswerIndex);


        return exercise;
    }
}

export default Word;