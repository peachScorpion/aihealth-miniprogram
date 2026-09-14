// 食寐有时 - 体质评估问卷逻辑
const app = getApp()

const QUESTIONS = [
  {
    id: 'Q1', type: 'single',
    text: '您通常需要多长时间才能入睡？',
    options: [
      { value: 'q1_a', label: '< 15分钟', score: 0 },
      { value: 'q1_b', label: '15-30分钟', score: 10 },
      { value: 'q1_c', label: '30-60分钟', score: 20 },
      { value: 'q1_d', label: '> 60分钟', score: 30 }
    ]
  },
  {
    id: 'Q2', type: 'single',
    text: '您每晚的实际睡眠时长约为？',
    options: [
      { value: 'q2_a', label: '> 7小时', score: 0 },
      { value: 'q2_b', label: '5-7小时', score: 10 },
      { value: 'q2_c', label: '3-5小时', score: 20 },
      { value: 'q2_d', label: '< 3小时', score: 30 }
    ]
  },
  {
    id: 'Q3', type: 'single',
    text: '您是否容易在夜间醒来？',
    options: [
      { value: 'q3_a', label: '从不', score: 0 },
      { value: 'q3_b', label: '偶尔（1-2次/周）', score: 10 },
      { value: 'q3_c', label: '经常（3-4次/周）', score: 20 },
      { value: 'q3_d', label: '几乎每晚', score: 30 }
    ]
  },
  {
    id: 'Q4', type: 'single',
    text: '您是否感觉手脚冰凉？',
    options: [
      { value: 'q4_a', label: '从不', score: 0 },
      { value: 'q4_b', label: '偶尔', score: 10 },
      { value: 'q4_c', label: '经常', score: 20 },
      { value: 'q4_d', label: '总是', score: 30 }
    ]
  },
  {
    id: 'Q5', type: 'single',
    text: '您是否容易口干舌燥？',
    options: [
      { value: 'q5_a', label: '从不', score: 0 },
      { value: 'q5_b', label: '偶尔', score: 10 },
      { value: 'q5_c', label: '经常', score: 20 },
      { value: 'q5_d', label: '总是', score: 30 }
    ]
  },
  {
    id: 'Q6', type: 'single',
    text: '您是否感觉身体沉重、困倦？',
    options: [
      { value: 'q6_a', label: '从不', score: 0 },
      { value: 'q6_b', label: '偶尔', score: 10 },
      { value: 'q6_c', label: '经常', score: 20 },
      { value: 'q6_d', label: '总是', score: 30 }
    ]
  },
  {
    id: 'Q7', type: 'single',
    text: '您是否容易情绪低落或烦躁？',
    options: [
      { value: 'q7_a', label: '从不', score: 0 },
      { value: 'q7_b', label: '偶尔', score: 10 },
      { value: 'q7_c', label: '经常', score: 20 },
      { value: 'q7_d', label: '总是', score: 30 }
    ]
  },
  {
    id: 'Q8', type: 'multiple',
    text: '您的饮食习惯是？（可多选）',
    options: [
      { value: 'q8_a', label: '三餐规律', score: 0 },
      { value: 'q8_b', label: '常吃外卖', score: 10 },
      { value: 'q8_c', label: '不吃早餐', score: 10 },
      { value: 'q8_d', label: '夜宵频繁', score: 10 },
      { value: 'q8_e', label: '饮食清淡', score: 0 }
    ]
  },
  {
    id: 'Q9', type: 'multiple',
    text: '您是否有以下消化问题？（可多选）',
    options: [
      { value: 'q9_a', label: '胃胀', score: 10 },
      { value: 'q9_b', label: '便秘', score: 10 },
      { value: 'q9_c', label: '腹泻', score: 10 },
      { value: 'q9_d', label: '嗳气', score: 10 },
      { value: 'q9_e', label: '无', score: 0 }
    ]
  },
  {
    id: 'Q10', type: 'single',
    text: '您目前承受的压力程度？',
    options: [
      { value: 'q10_a', label: '几乎没有', score: 0 },
      { value: 'q10_b', label: '轻微', score: 10 },
      { value: 'q10_c', label: '中等', score: 20 },
      { value: 'q10_d', label: '很大', score: 30 }
    ]
  }
]

Page({
  data: {
    currentIndex: 0,
    totalQuestions: QUESTIONS.length,
    currentQuestion: QUESTIONS[0],
    selectedValues: [],
    answers: [],
    progressPercent: 0
  },

  // WXS 工具方法
  utils: {
    isSelected: function(arr, val) {
      return arr && arr.indexOf(val) > -1
    }
  },

  // 选择选项
  selectOption(e) {
    const value = e.currentTarget.dataset.value
    const question = this.data.currentQuestion
    let selectedValues = [...this.data.selectedValues]

    if (question.type === 'single') {
      selectedValues = [value]
    } else {
      const idx = selectedValues.indexOf(value)
      if (idx > -1) {
        selectedValues.splice(idx, 1)
      } else {
        selectedValues.push(value)
      }
    }

    this.setData({ selectedValues })
  },

  // 下一题
  nextQuestion() {
    if (!this.data.selectedValues.length) return
    this.saveAnswer()
    const nextIndex = this.data.currentIndex + 1
    this.setData({
      currentIndex: nextIndex,
      currentQuestion: QUESTIONS[nextIndex],
      selectedValues: [],
      progressPercent: ((nextIndex) / QUESTIONS.length) * 100
    })
  },

  // 上一题
  prevQuestion() {
    const prevIndex = this.data.currentIndex - 1
    this.setData({
      currentIndex: prevIndex,
      currentQuestion: QUESTIONS[prevIndex],
      selectedValues: this.data.answers[prevIndex]?.values || [],
      progressPercent: ((prevIndex) / QUESTIONS.length) * 100
    })
  },

  // 保存答案
  saveAnswer() {
    const answers = [...this.data.answers]
    answers[this.data.currentIndex] = {
      questionId: this.data.currentQuestion.id,
      values: this.data.selectedValues
    }
    this.setData({ answers })
  },

  // 提交评估
  submitAssessment() {
    if (!this.data.selectedValues.length) return
    this.saveAnswer()

    wx.showLoading({ title: '正在生成体质报告...', mask: true })

    wx.cloud.callFunction({
      name: 'generatePlan',
      data: { answers: this.data.answers }
    }).then(res => {
      wx.hideLoading()
      if (res.result.success) {
        app.globalData.assessmentCompleted = true
        app.globalData.constitution = res.result.constitution
        app.globalData.currentPlanId = res.result.planId
        
        // 检查是否有严重症状
        if (res.result.symptomScore > 80) {
          wx.showModal({
            title: '温馨提示',
            content: '您的睡眠问题较为严重，建议同时咨询专业医生。食寐有时将为您生成饮食调理方案作为辅助。',
            showCancel: false,
            success: () => {
              wx.switchTab({ url: '/pages/plan/plan' })
            }
          })
        } else {
          wx.switchTab({ url: '/pages/plan/plan' })
        }
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({ title: '网络异常，请重试', icon: 'none' })
    })
  }
})