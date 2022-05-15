class Queue {
    /**
     * @function constructor
     * @description 从数组构造队列
     * @param {Array<Object>} items - 本单元所有的单词数组
     */
    constructor(items) {
        this.items = items;
    }

    /**
     * @function enqueue
     * @description 把元素插入队尾
     * @param {Object} item - 要插入的元素
     * @return {Object} 插入的元素
     */
    enqueue(item) {
        this.items.push(item);
        return item;
    }

    /**
     * @function dequeue
     * @description 把头部元素删除
     * @return {Object} 被删除的头部元素
     */
    dequeue() {
        return this.items.shift();
    }

    /**
     * @function isEmpty
     * @description 判断队列是否为空
     * @return {Boolean} 队列是否为空
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * @function getItems
     * @description 返回items
     * @return {Object[]} items
     */
    getItems() {
        return this.items;
    }

    /**
     * @function size
     * @description 求队列长度
     * @return {Number} 队列长度
     */
    size() {
        return this.items.length;
    }

    /**
     * @function indexOf
     * @description 查询元素下标，如果没有，返回 -1
     * @param {Object} item - 要查询的元素
     * @return {Number} 元素的下标
     */
    indexOf(item) {
        return this.items.indexOf(item);
    }

}

export default Queue;