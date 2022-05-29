class ReviewTask {
  /**
   * @function constructor
   * @description 构造函数
   * @param {String} fullUnitId - 复习任务对应单元ID
   * @param {String} reviewId - 复习任务对应记忆曲线的复习次数
   * @param {Date} learnedDate - 复习任务对应单元的学习时间
   */
  constructor(fullUnitId, reviewId, learnedDate) {
    this.fullUnitId = fullUnitId;
    this.reviewId = reviewId;
    this.learnedDate = learnedDate;
    this.isCompleted = false;
  }
}

export default ReviewTask;
