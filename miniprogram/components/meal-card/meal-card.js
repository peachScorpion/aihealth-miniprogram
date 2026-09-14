// 餐食卡片组件
Component({
  properties: {
    meal: { type: Object, value: {} },
    mealType: { type: String, value: '' },
    icon: { type: String, value: '' }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { meal: this.properties.meal, mealType: this.properties.mealType })
    }
  }
})