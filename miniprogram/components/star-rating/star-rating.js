// 星级评分组件
Component({
  properties: {
    score: { type: Number, value: 0 }
  },

  methods: {
    onTap(e) {
      const score = parseInt(e.currentTarget.dataset.score)
      this.triggerEvent('change', { score })
    }
  }
})