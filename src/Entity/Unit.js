class Unit {
    /**
     * @function constructor
     * @description 构造函数
     * @param {Array<Word>} words - 本单元所有的单词数组
     */
    constructor(words) {
        this.words = words;
    }

    /**
     * @function generateExercises
     * @description 生成本单元对应的练习题组，并随机打乱
     * @return {Array<Exercise>} 练习题组
     */
    generateExercises() {
        let exercises = [];

        let wordsLen = this.words.length;
        for(var i = 0; i < wordsLen; ++i) {
            exercises.push(this.words[i].generateExercise(this));
        }

        // Fisher-Yates shuffle
        let l = exercises.length;
        while (l > 0) {
            let index = Math.floor(Math.random() * l);
            let tmp = exercises[l - 1];
            exercises[l - 1] = exercises[index];
            exercises[index] = tmp;
            l--;
        }

        return exercises;
    }

    /**
     * @function chooseWordForOptions
     * @description 为一个单词在本单元内生成练习题的3个其他单词作为错误选项
     * @return {Array<Word>} 单词组
     */
    chooseWordForOptions(word) {
        let results = [];
        let totalLength = this.words.length;
        while (results.length < 3) {
            let chosen = this.words[Math.floor(Math.random() * totalLength)];
            if (!chosen.equals(word))
                results.push(chosen)
        }
        return results;
    }
}

export default Unit;