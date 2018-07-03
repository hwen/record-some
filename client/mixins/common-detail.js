
class Mixin {
  constructor (prop) {
    this.data = function () {
      return {
        itemId: null,
        section: '',
        loading: false,
        // 防止一瞬间多次点击提交按钮
        submiting: false
      }
    }
    this.methods = {
      async initData () {
      }
    }
    this.created = function () {
      const { query } = this.$route
      Object.assign(this, query)
      this.initData()
    }
    this.computed = {

    }
  }
}

export default type => new Mixin({type})
