import Exercise from "@/Entity/Exercise";
import Option from "@/Entity/Option";

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
     * @function generateOption
     * @description 为本单词生成相应的选项
     * @param {String} type - 选项类型，'j', 'c', 'k'中的一种
     * @return {Option} - 选项
     */
    generateOption(type) {
        let text;
        switch (type) {
            case 'c':
                text = this.chinese;
            case 'j':
                text = this.japanese;
            case 'k':
                text = this.kana;
        }
        return new Option(this, text, type);
    }

    /**
     * @function generateExercise
     * @description 生成本单词对应的练习题
     * @param {Unit} unit - 生成练习题的所属的单元
     * @param {String} questionType - 题面类型
     * @param {String} optionType - 选项类型
     * @return {Exercise} 练习题
     */
    generateExercise(unit, questionType, optionType) {
        let correctAnswerIndex = Math.floor(Math.random() * 4);
        let words = unit.chooseWordForOptions(this);
        words.splice(correctAnswerIndex, 0, this);
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].generateOption(optionType);
        }
        let exercise = new Exercise(this, this.generateOption(questionType), words, correctAnswerIndex);
        return exercise;
    }

    /**
     * @function equals
     * @description 判断两个单词是否相等
     * @param {Word} word - 与之比较的单词
     * @return {bool} 比较结果
     */
    equals(word) {
        return this.japanese == word.japanese;
    }
}

export default Word;