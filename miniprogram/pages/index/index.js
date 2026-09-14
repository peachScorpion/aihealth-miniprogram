// 食寐有时 - 首页逻辑
const app = getApp()

Page({
  data: {},

  onLoad() {
    // 检查登录状态，已登录则跳转
    if (app.globalData.isLoggedIn && app.globalData.token) {
      this.navigateToNext()
    }
  },

  // 微信授权登录
  handleLogin() {
    wx.showLoading({ title: '登录中...', mask: true })

    wx.login({
      success: (loginRes) => {
        if (!loginRes.code) {
          wx.hideLoading()
          wx.showToast({ title: '登录失败，请重试', icon: 'none' })
          return
        }

        // 获取用户信息
        wx.getUserProfile({
          desc: '用于完善个人资料',
          success: (profileRes) => {
            this.doLogin(loginRes.code, profileRes.userInfo)
          },
          fail: () => {
            // 用户拒绝授权，仅 code 登录
            this.doLogin(loginRes.code, null)
          }
        })
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '网络不可用，请检查网络', icon: 'none' })
      }
    })
  },

  // 执行登录
  doLogin(code, userInfo) {
    wx.cloud.callFunction({
      name: 'login',
      data: { code, userInfo }
    }).then(res => {
      wx.hideLoading()
      if (res.result.success) {
        app.globalData.isLoggedIn = true
        app.globalData.token = res.result.token
        wx.setStorageSync('token', res.result.token)
        this.navigateToNext()
      } else {
        wx.showToast({ title: '登录失败，请重试', icon: 'none' })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({ title: '网络不可用，请检查网络', icon: 'none' })
    })
  },

  // 跳转到下一步
  navigateToNext() {
    if (!app.globalData.hasAgreed) {
      wx.redirectTo({ url: '/pages/disclaimer/disclaimer' })
    } else if (!app.globalData.assessmentCompleted) {
      wx.redirectTo({ url: '/pages/assessment/assessment' })
    } else {
      wx.switchTab({ url: '/pages/plan/plan' })
    }
  },

  showPrivacy() {
    wx.showModal({
      title: '用户协议',
      content: '食寐有时尊重并保护您的隐私...',
      showCancel: false
    })
  }
})