<template lang='pug'>
.month-selector-container(:class='[isExpend && "active"]')
  .mask(@click='onMenuClick')
  div(:class='["month-list", isExpend && "active"]')
    .month-item(
      v-for='item in months'
      :class='[currentMonth === item && "active"]'
      @click='onSelectMonth(item)'
    ) {{item}}月
    .month-item
      a(@click='onMenuClick') 关闭
  .month-btn
    button.btn-small(@click='onMenuClick')
      i.iconfont.icon-menu
</template>
<script>
export default {
  props: {
    months: {
      types: Array,
      default: () => [7, 8, 9]
    }
  },
  data() {
    return {
      isExpend: false,
      currentMonth: new Date().getMonth() + 1
    };
  },
  methods: {
    onMenuClick() {
      this.isExpend = !this.isExpend;
    },
    onSelectMonth(month) {
      this.$emit('select', month);
      this.onMenuClick();
    }
  }
};
</script>
<style lang="scss" scoped>
@import './../../styles/constants';

.month-selector-container {
  &.active {
    .mask {
      background: transparent;
      display: block;
    }
    .month-list {
      margin-right: 0;
    }
  }
  .mask {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 777;
  }
  .month-list {
    width: 4.5rem;
    margin-right: -4.5rem;
    position: absolute;
    z-index: 888;
    right: 0;
    top: 0;
    bottom: 0;
    background: $light_purple;
    transition-property: margin;
    transition-duration: 1s;
    transition-delay: 0;
    transition-timing-function: ease;
  }
  .month-item {
    text-align: center;
    padding: 10px;
    border: 1px dashed #dcdcdc;
  }
  .month-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
    .btn-small {
      padding: 2px 10px;
      margin-bottom: 0;
    }
  }
}
</style>


