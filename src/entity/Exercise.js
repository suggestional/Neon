class Exercise {
    /**
     * @function constructor
     * @description 构造函数
     * @param {Number} id - 练习题对应单词在 Unit 中的下标
     * @param {Word} word - 练习题对应的单词
     * @param {Option} question - 练习题的题面，和选项的结构相同，所以和选项共用一个类
     * @param {Array<Option>} options - 四个选项的数组
     * @param {Number} correctAnswerIndex - 正确答案在 options 中的下标
     */
    constructor(id, word, question, options, correctAnswerIndex) {
        this.id = id;
        this.word = word;
        this.question = question;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

export default Exercise;