// 食寐有时 - 我的页面逻辑
const app = getApp()

Page({
  data: {
    userInfo: {},
    constitution: '',
    totalCheckins: 0,
    consecutiveDays: 0,
    planVersion: 1,
    reminders: {
      morning: true,
      evening: true,
      weekly: true
    }
  },

  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo || {},
      constitution: this.getConstitutionLabel(app.globalData.constitution)
    })
    this.loadStats()
    this.loadReminderSettings()
  },

  getConstitutionLabel(c) {
    const map = {
      'qi_deficiency': '气虚质', 'yin_deficiency': '阴虚质',
      'yang_deficiency': '阳虚质', 'phlegm_dampness': '痰湿质',
      'qi_stagnation': '气郁质', 'balanced': '平和质'
    }
    return map[c] || ''
  },

  loadStats() {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('checkins')
      .where({ _openid: '{openid}' })
      .count()
      .then(res => this.setData({ totalCheckins: res.total }))
      .catch(() => {})
  },

  loadReminderSettings() {
    const settings = wx.getStorageSync('reminderSettings')
    if (settings) this.setData({ reminders: settings })
  },

  // 切换提醒开关
  toggleReminder(e) {
    const type = e.currentTarget.dataset.type
    const reminders = { ...this.data.reminders }
    reminders[type] = !reminders[type]
    this.setData({ reminders })
    wx.setStorageSync('reminderSettings', reminders)

    // 如果开启提醒，请求订阅消息授权
    if (reminders[type]) {
      this.requestSubscribe(type)
    }
  },

  // 请求订阅消息授权
  requestSubscribe(type) {
    const templateIds = {
      morning: 'MORNING_PLAN_TMPL_ID',
      evening: 'EVENING_CHECKIN_TMPL_ID',
      weekly: 'WEEKLY_REPORT_TMPL_ID'
    }

    wx.requestSubscribeMessage({
      tmplIds: [templateIds[type]],
      success(res) {
        console.log('订阅结果:', res)
      },
      fail() {
        wx.showToast({ title: '订阅失败，可在设置中重试', icon: 'none' })
      }
    })
  },

  // 一键订阅所有消息
  subscribeAll() {
    wx.requestSubscribeMessage({
      tmplIds: [
        'MORNING_PLAN_TMPL_ID',
        'EVENING_CHECKIN_TMPL_ID',
        'WEEKLY_REPORT_TMPL_ID'
      ],
      success(res) {
        const accepted = Object.values(res).filter(v => v === 'accept').length
        wx.showToast({
          title: `已订阅 ${accepted} 项提醒`,
          icon: 'success'
        })
        if (accepted === 3) {
          this.setData({
            reminders: { morning: true, evening: true, weekly: true }
          })
          wx.setStorageSync('reminderSettings', this.data.reminders)
        }
      },
      fail() {
        wx.showToast({ title: '订阅失败，请稍后重试', icon: 'none' })
      }
    })
  },

  // 重新评估
  reAssessment() {
    wx.showModal({
      title: '重新评估',
      content: '重新评估将生成新的体质报告和饮食方案，确认继续？',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({ url: '/pages/assessment/assessment' })
        }
      }
    })
  },

  viewHistory() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  showDisclaimer() {
    wx.navigateTo({ url: '/pages/disclaimer/disclaimer' })
  }
})