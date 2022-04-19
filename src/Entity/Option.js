class Option {
    /**
     * @function constructor
     * @description 构造函数
     * @param {Word} word - 选项对应的单词
     * @param {String} text - 该选项展示的文本
     * @param {Number} type - 该选项展示的文本，是对应单词的哪一个属性
     */
    constructor(word, text, type) {
        this.word = word;
        this.text = text;
        this.type = type;
    }

    // todo: 暂时没想好怎么在类中存常量表示 type 类型
    // const JAPANESE = 1;
    // const CHINESE = 2;
    // const KANA = 3;

}

export default Option;