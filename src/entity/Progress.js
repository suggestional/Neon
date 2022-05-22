import Word from "@/entity/Word";
import Unit from "@/entity/Unit"

class Progress {
    /**
     * @function constructor
     * @description 构造函数
     * @param {Number} bookId - 对应的词书id
     * @param {Number} unitNum - 该词书的单元数量
     */
    constructor(bookId, unitNum) {
        this.bookId = bookId;
        this.learnedWords = new Array();
        for (var i = 0; i < unitNum; ++i) {
            this.learnedWords.push(new Array());
        }
    }

    /**
     * @function learnedWordsAtUnit
     * @description 查看某个单元已学习的单词
     * @param {Number} unitId - 单元号
     * @return {Array<Word>} - 已学习的单词
     */
    learnedWordsAtUnit(unitId) {
        return this.learnedWords[unitId];
    }

    /**
     * @function addWordForUnit
     * @description 为某个单元添加一个已学习的单词，若该单词已存在，则直接返回
     * @param {Number} unitId - 单元号
     * @param {Word} word - 单词
     */
    addWordForUnit(unitId, word) {
        let words = this.learnedWordsAtUnit[unitId];
        let len = words.length;
        for (var i = 0; i < len; ++i) {
            if (words[i].equals(word))
                return;
        }
        words.push(word);
    }

    /**
    * @function progressForUnit
    * @description 计算一个单元的学习进度
    * @param {Number} unitId - 单元号
    * @param {Unit} unit - 单元内容
    * @return {Number} - 学习进度
    */
    progressForUnit(unitId, unit) {
        let total = unit.words.length;
        let leared = this.learnedWords[unitId].length;
        return leared * 100.0 / total;
    }
}

export default Progress;