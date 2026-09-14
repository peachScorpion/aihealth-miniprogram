// 食寐有时 - 免责声明页逻辑
const app = getApp()

Page({
  data: {
    hasAgreed: false
  },

  toggleAgree() {
    this.setData({ hasAgreed: !this.data.hasAgreed })
  },

  handleConfirm() {
    if (!this.data.hasAgreed) {
      wx.showToast({ title: '请先阅读并同意声明', icon: 'none' })
      return
    }

    wx.showLoading({ title: '确认中...', mask: true })

    wx.cloud.callFunction({
      name: 'login',
      data: { action: 'agree' }
    }).then(res => {
      wx.hideLoading()
      app.globalData.hasAgreed = true
      wx.redirectTo({ url: '/pages/assessment/assessment' })
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({ title: '请检查网络连接', icon: 'none' })
    })
  }
})