// 食寐有时 - 打卡评分页逻辑
Page({
  data: {
    todayDate: '',
    mealList: [
      { type: 'breakfast', label: '早餐', name: '燕麦牛奶粥', checked: false },
      { type: 'lunch', label: '午餐', name: '清蒸鲈鱼配糙米饭', checked: false },
      { type: 'dinner', label: '晚餐', name: '百合莲子汤', checked: false },
      { type: 'bedtime', label: '睡前食疗', name: '温牛奶蜂蜜饮', checked: false }
    ],
    sleepScore: 0,
    note: '',
    canSubmit: false
  },

  onLoad() {
    const d = new Date()
    const y = d.getFullYear()
    const m = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')
    this.setData({ todayDate: `${y}年${m}月${day}日` })
  },

  toggleMeal(e) {
    const type = e.currentTarget.dataset.type
    const mealList = this.data.mealList.map(item => {
      if (item.type === type) item.checked = !item.checked
      return item
    })
    this.setData({ mealList })
    this.checkCanSubmit()
  },

  onScoreChange(e) {
    this.setData({ sleepScore: e.detail.score })
    this.checkCanSubmit()
  },

  onNoteInput(e) {
    this.setData({ note: e.detail.value })
  },

  checkCanSubmit() {
    const hasMeal = this.data.mealList.some(m => m.checked)
    const hasScore = this.data.sleepScore > 0
    this.setData({ canSubmit: hasMeal && hasScore })
  },

  submitCheckin() {
    if (!this.data.canSubmit) return

    const meals = {}
    this.data.mealList.forEach(m => { meals[m.type] = m.checked })

    wx.showLoading({ title: '保存中...', mask: true })

    wx.cloud.callFunction({
      name: 'saveCheckin',
      data: {
        meals,
        sleepScore: this.data.sleepScore,
        note: this.data.note
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result.success) {
        wx.showToast({ title: '打卡成功！', icon: 'success' })
        setTimeout(() => {
          wx.switchTab({ url: '/pages/plan/plan' })
        }, 1500)
      }
    }).catch(() => {
      wx.hideLoading()
      // 本地缓存兜底
      wx.setStorageSync('pendingCheckin', {
        meals,
        sleepScore: this.data.sleepScore,
        note: this.data.note,
        date: new Date().toISOString().split('T')[0]
      })
      wx.showToast({ title: '已暂存，网络恢复后自动提交', icon: 'none' })
    })
  }
})