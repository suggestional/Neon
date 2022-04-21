class Exercise {
    /**
     * @function constructor
     * @description 构造函数
     * @param {Word} word - 练习题对应的单词
     * @param {Option} question - 练习题的题面，和选项的结构相同，所以和选项共用一个类
     * @param {Array<Option>} options - 四个选项的数组
     * @param {Number} correctAnswerIndex - 正确答案在 options 中的下标
     */
    constructor(word, question, options, correctAnswerIndex) {
        this.word = word;
        this.question = question;
        this.options = options;
        this.correctAnserIndex = correctAnswerIndex;
    }
}

export default Exercise;