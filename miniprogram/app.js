// 食寐有时 · 小程序入口
// 本地优先（Local-First MVP），无云开发依赖
App({
  globalData: {
    isLoggedIn: false,
    userInfo: null,
    token: '',
    constitution: '',
    currentPlanId: '',
    assessmentCompleted: false,
    hasAgreed: false
  },

  onLaunch() {
    // 本地优先：从本地存储恢复用户状态
    const token = wx.getStorageSync('token')
    const hasAgreed = wx.getStorageSync('hasAgreed')
    const constitution = wx.getStorageSync('constitution')
    const assessmentCompleted = wx.getStorageSync('assessmentCompleted')
    const userInfo = wx.getStorageSync('userInfo')

    if (token) {
      this.globalData.token = token
      this.globalData.isLoggedIn = true
    }
    if (hasAgreed !== '') {
      this.globalData.hasAgreed = hasAgreed
    }
    if (constitution) {
      this.globalData.constitution = constitution
      this.globalData.assessmentCompleted = true
    }
    if (assessmentCompleted !== '') {
      this.globalData.assessmentCompleted = assessmentCompleted
    }
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
  },

  // 请求订阅消息授权
  requestSubscribeMessage() {
    wx.requestSubscribeMessage({
      tmplIds: [
        'MORNING_PLAN_TMPL_ID',    // 每日方案提醒
        'EVENING_CHECKIN_TMPL_ID', // 睡前打卡提醒
        'WEEKLY_REPORT_TMPL_ID'    // 7天报告提醒
      ],
      success(res) {
        console.log('订阅消息授权结果:', res)
      },
      fail(err) {
        console.log('订阅消息授权失败:', err)
      }
    })
  }
})