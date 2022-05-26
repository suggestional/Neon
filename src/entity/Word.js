import Exercise from "@/entity/Exercise";
import Option from "@/entity/Option";

class Word {
    /**
     * @function constructor
     * @description 构造函数
     * @param {String} japanese - 假名+中文，即日语单词本体
     * @param {String} chinese - 中文解释
     * @param {String} kana - 假名注音
     * @param {String} wordClass - 单词词性
     */
    constructor(japanese, chinese, kana, wordClass) {
        this.japanese = japanese;
        this.chinese = chinese;
        this.kana = kana;
        this.wordClass = wordClass;
    }

    /**
     * @function generateOption
     * @description 为本单词生成相应的选项
     * @param {Number} type - 选项类型
     * @return {Option} - 选项
     */
    generateOption(type) {
        let text;
        switch (type) {
            case Option.CHINESE:
                text = this.chinese;
                break;
            case Option.JAPANESE:
                text = this.japanese;
                break;
            case Option.KANA:
                text = this.kana;
                break;
        }
        return new Option(this, text, type);
    }

    /**
     * @function generateExercise
     * @description 生成本单词对应的练习题
     * @param {Number} id - 练习题对应单词在 Unit 中的下标
     * @param {Unit} unit - 生成练习题的所属的单元
     * @param {Number} questionType - 生成练习题的题面类型
     * @return {Exercise} 练习题
     */
    generateExercise(id, unit, questionType) {
        let correctAnswerIndex = Math.floor(Math.random() * 4);
        let words = unit.chooseWordForOptions(this);
        words.splice(correctAnswerIndex, 0, this);

        let optionType, questionEqualsOption;
        do {
            optionType = Math.ceil(Math.random() * 3);
            // 保证题面和答案不同
            questionEqualsOption = this.generateOption(questionType).text === this.generateOption(optionType).text
        } while(questionEqualsOption);

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].generateOption(optionType);
        }
        return new Exercise(id, this, this.generateOption(questionType), words, correctAnswerIndex);
    }

    /**
     * @function equals
     * @description 判断两个单词是否相等
     * @param {Word} word - 与之比较的单词
     * @return {Boolean} 比较结果
     */
    equals(word) {
        return this.japanese === word.japanese;
    }
}

export default Word;