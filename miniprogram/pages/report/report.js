// 食寐有时 - 效果追踪页逻辑
Page({
  data: {
    loading: true,
    report: null,
    checkinDays: 0
  },

  onShow() {
    this.loadReport()
  },

  loadReport() {
    this.setData({ loading: true })

    wx.cloud.callFunction({
      name: 'generateReport',
      data: {}
    }).then(res => {
      this.setData({ loading: false })
      if (res.result.success && res.result.report) {
        this.setData({ report: res.result.report })
      } else {
        this.setData({ checkinDays: res.result.checkinDays || 0 })
      }
    }).catch(() => {
      this.setData({ loading: false })
    })
  },

  shareReport() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }
})