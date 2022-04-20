class Option {
    /**
     * @function constructor
     * @description 构造函数
     * @param {Word} word - 选项对应的单词
     * @param {String} text - 该选项展示的文本
     * @param {Number} type - 该选项展示的文本，是对应单词的哪一个属性，为 Option.JAPANESE, Option.CHINESE, Option.KANA
     */
    constructor(word, text, type) {
        this.word = word;
        this.text = text;
        this.type = type;
    }
}

Option.JAPANESE = 1;
Option.CHINESE = 2;
Option.KANA = 3;

export default Option;