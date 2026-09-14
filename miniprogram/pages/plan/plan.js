// 食寐有时 - 今日方案页逻辑
const app = getApp()

Page({
  data: {
    userName: '',
    todayDate: '',
    constitution: '',
    currentPlan: null,
    planVersion: 1,
    planLoading: true,
    todayChecked: false
  },

  onShow() {
    this.setData({
      todayDate: this.formatDate(new Date()),
      constitution: this.getConstitutionLabel(app.globalData.constitution),
      userName: app.globalData.userInfo?.nickName || ''
    })

    if (app.globalData.currentPlanId) {
      this.loadPlan()
      this.checkTodayChecked()
    } else if (app.globalData.assessmentCompleted) {
      this.loadPlan()
    } else {
      this.setData({ planLoading: false })
    }
  },

  formatDate(date) {
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const d = date.getDate().toString().padStart(2, '0')
    const week = ['日', '一', '二', '三', '四', '五', '六']
    return `${y}年${m}月${d}日 星期${week[date.getDay()]}`
  },

  getConstitutionLabel(constitution) {
    const map = {
      'qi_deficiency': '气虚质',
      'yin_deficiency': '阴虚质',
      'yang_deficiency': '阳虚质',
      'phlegm_dampness': '痰湿质',
      'qi_stagnation': '气郁质',
      'balanced': '平和质'
    }
    return map[constitution] || ''
  },

  loadPlan() {
    this.setData({ planLoading: true })
    
    const db = wx.cloud.database()
    db.collection('meal_plans')
      .where({ _openid: '{openid}' })
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()
      .then(res => {
        if (res.data.length > 0) {
          const plan = res.data[0]
          this.setData({
            currentPlan: {
              breakfast: plan.meals.breakfast,
              lunch: plan.meals.lunch,
              dinner: plan.meals.dinner,
              bedtime: plan.meals.bedtime,
              tips: plan.tips || []
            },
            planVersion: plan.version || 1,
            planLoading: false
          })
        } else {
          this.setData({ planLoading: false })
        }
      })
      .catch(() => {
        this.setData({ planLoading: false })
      })
  },

  checkTodayChecked() {
    const today = new Date().toISOString().split('T')[0]
    const db = wx.cloud.database()
    db.collection('checkins')
      .where({ _openid: '{openid}', date: today })
      .get()
      .then(res => {
        this.setData({ todayChecked: res.data.length > 0 })
      })
      .catch(() => {})
  },

  goCheckin() {
    wx.navigateTo({ url: '/pages/checkin/checkin' })
  },

  goAssessment() {
    wx.navigateTo({ url: '/pages/assessment/assessment' })
  },

  viewMealDetail(e) {
    const meal = e.detail.meal
    wx.showModal({
      title: meal.name,
      content: `食材：${meal.ingredients.join('、')}\n\n原理：${meal.reason}\n\n做法：${meal.instructions}`,
      showCancel: false
    })
  }
})