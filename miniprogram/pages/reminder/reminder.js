// 食寐有时 - AI 智能提醒逻辑
Page({
  data: {
    reminders: [
      {
        id: 'morning',
        name: '早安方案推送',
        desc: '每天推送当日饮食方案',
        time: '08:00',
        enabled: true
      },
      {
        id: 'lunch',
        name: '午餐提醒',
        desc: '提醒按时用餐，不错过调理',
        time: '12:00',
        enabled: true
      },
      {
        id: 'bedtime',
        name: '睡前打卡提醒',
        desc: '提醒记录当天饮食睡眠情况',
        time: '21:00',
        enabled: true
      },
      {
        id: 'weekly',
        name: '周报推送',
        desc: '每周一推送改善效果报告',
        time: '09:00',
        enabled: true
      }
    ]
  },

  onLoad() {
    const saved = wx.getStorageSync('reminderSettingsV2')
    if (saved) {
      this.setData({ reminders: saved })
    }
  },

  toggleReminder(e) {
    const id = e.currentTarget.dataset.id
    const reminders = this.data.reminders.map(item => {
      if (item.id === id) {
        item.enabled = !item.enabled
      }
      return item
    })
    this.setData({ reminders })
    this.saveSettings()
  },

  onTimeChange(e) {
    const id = e.currentTarget.dataset.id
    const time = e.detail.value
    const reminders = this.data.reminders.map(item => {
      if (item.id === id) {
        item.time = time
      }
      return item
    })
    this.setData({ reminders })
    this.saveSettings()
  },

  saveSettings() {
    wx.setStorageSync('reminderSettingsV2', this.data.reminders)
  },

  subscribeAll() {
    const enabledList = this.data.reminders.filter(r => r.enabled)
    wx.requestSubscribeMessage({
      tmplIds: [
        'MORNING_PLAN_TMPL_ID',
        'LUNCH_REMINDER_TMPL_ID',
        'EVENING_CHECKIN_TMPL_ID',
        'WEEKLY_REPORT_TMPL_ID'
      ],
      success(res) {
        const accepted = Object.values(res).filter(v => v === 'accept').length
        wx.showToast({
          title: '已订阅 ' + accepted + ' 项提醒',
          icon: 'success'
        })
      },
      fail() {
        wx.showToast({
          title: '订阅失败，请稍后重试',
          icon: 'none'
        })
      }
    })
  }
})