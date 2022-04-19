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

        this.words.forEach(function(word) {
           exercises.push(word.generateExercise());
        });

        // todo: shuffle(exercises)

        return exercises;
    }
}

export default Unit;