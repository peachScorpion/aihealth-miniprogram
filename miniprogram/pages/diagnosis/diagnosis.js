// 食寐有时 - AI 智能问诊逻辑
Page({
  data: {
    messages: [],
    inputValue: '',
    analyzing: false,
    hasSymptoms: false,
    diagnosisResult: null,
    symptomTags: [
      { name: '入睡困难', selected: false },
      { name: '多梦易醒', selected: false },
      { name: '胃胀不适', selected: false },
      { name: '疲劳乏力', selected: false },
      { name: '口干口苦', selected: false },
      { name: '手脚冰凉', selected: false },
      { name: '心烦易怒', selected: false },
      { name: '腰膝酸软', selected: false }
    ]
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value })
  },

  toggleTag(e) {
    const index = e.currentTarget.dataset.index
    const tags = this.data.symptomTags
    tags[index].selected = !tags[index].selected
    this.setData({ symptomTags: tags })
    this.checkHasSymptoms()
  },

  sendMessage() {
    const text = this.data.inputValue.trim()
    if (!text) return

    const messages = [...this.data.messages, {
      role: 'user',
      content: text
    }]

    this.setData({
      messages,
      inputValue: '',
      hasSymptoms: true
    })

    // AI 自动回复
    setTimeout(() => {
      this.aiReply(text)
    }, 800)
  },

  aiReply(userText) {
    const replyText = this.generateReply(userText)
    const messages = [...this.data.messages, {
      role: 'ai',
      content: replyText
    }]
    this.setData({ messages })
  },

  generateReply(text) {
    const replies = [
      '了解了，请继续告诉我还有哪些不适症状？',
      '收到，这些症状持续多久了？最近一个月内是否加重？',
      '谢谢你的描述，还有其他想补充的吗？',
      '好的，我已经记录了你的症状信息。'
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  },

  checkHasSymptoms() {
    const hasTag = this.data.symptomTags.some(t => t.selected)
    const hasMsg = this.data.messages.some(m => m.role === 'user')
    this.setData({ hasSymptoms: hasTag || hasMsg })
  },

  startDiagnosis() {
    if (!this.data.hasSymptoms) return

    this.setData({ analyzing: true })

    // 模拟 AI 分析过程
    setTimeout(() => {
      const constitutions = [
        { constitution: '阴虚质', description: '根据你的症状描述，主要表现为口干、心烦、睡眠不安等，符合中医阴虚体质的特征。阴虚则热，虚火上扰心神，导致失眠多梦。', suggestion: '建议多食用滋阴润燥的食物，如百合、银耳、枸杞、桑葚等。避免辛辣燥热食物，晚餐宜清淡，睡前可饮用温牛奶蜂蜜饮。' },
        { constitution: '气虚质', description: '根据你的症状描述，主要表现为疲劳乏力、气短懒言等，符合中医气虚体质的特征。气不足则神不安，导致睡眠质量下降。', suggestion: '建议多食用补气健脾的食物，如山药、红枣、莲子、小米等。适当运动增强体质，避免过度劳累，保持规律作息。' },
        { constitution: '痰湿质', description: '根据你的症状描述，主要表现为身体困重、胃胀不适等，符合中医痰湿体质的特征。痰湿内阻，清阳不升，影响睡眠。', suggestion: '建议多食用健脾祛湿的食物，如薏米、赤小豆、茯苓、冬瓜等。晚餐宜早宜少，避免油腻甜腻食物，适当运动排汗。' }
      ]

      const result = constitutions[Math.floor(Math.random() * constitutions.length)]

      this.setData({
        analyzing: false,
        diagnosisResult: result
      })
    }, 2000)
  }
})