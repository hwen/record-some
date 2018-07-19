<template lang='pug'>
.slide-container(:style='{"height": containerHeight}')
  swipe.card(v-if='list && list.length > 0' ref='swipe' v-model='swipeIndex' :pagination='false')
    swipe-item(
      v-for='(item,key) in list'
      :key='item._id'
    )
      .date {{item.date}}
      .data-box(@click='handleEdit(item._id)')
        .row
          .data-item
            .item-field
              .label mark
              .data {{item.mark}}
          .data-item
            .item-field
              .label sleepTime
              .data {{item.sleepTime}}
            .item-field
              .label freeTime
              .data {{item.freeTime}}
            .item-field
              .label fallAsleep
              .data {{item.fallAsleep}}
        .row
          .data-item
            .item-field
              .label serious
              .data {{item.serious}}
            .item-field
              .label hunger
              .data {{item.hunger}}
          .data-item
            .item-field
              .label san
              .data {{item.san}}
            .item-field
              .label hp
              .data {{item.hp}}
        .row
          .data-item
            .item-field
              .label hasImportant
              .data {{item.hasImportantThing}}
            .item-field
              .label hasSport
              .data {{item.hasSport}}
          .data-item
            .item-field
              .label hasRead
              .data {{item.hasRead}}
            .item-field
              .label hasKindle
              .data {{item.hasKindle}}
  .add-btn(@click='handleAdd') 添加
</template>
<script>
import { sleepDetail, updateSleep, addSleep, listSleep } from 'src/api';
import { testData, ths } from './testData';

export default {
  name: 'detail',
  components: {},
  data() {
    return {
      swipeIndex: 0,
      containerHeight: '100%',
      form: {
        author_name: '',
        date: '',
        mark: '',
        serious: '',
        hunger: '',
        san: '',
        hp: '',
        freeTime: '',
        sleepTime: '',
        hasImportantThing: '',
        hasSport: '',
        hasRead: '',
        hasKindle: '',
        fallAsleep: ''
      },
      list: [],
      th: ths
    };
  },
  async created() {
    const { idx } = this.$route.params;
    const resp = await listSleep();
    ilog(resp);
    this.list = resp.data;
    // this.list = [];
  },
  mounted() {
    this.containerHeight = window.screen.availHeight + 'px';
  },
  destroyed() {},
  methods: {
    handleAdd() {
      this.$router.push('/detail');
    },
    handleEdit(id) {
      this.$router.push(`/detail/${id}`);
    }
  }
};
</script>
<style lang="scss">
@import './../../styles/constants';
@import './../../styles/mixins';
.slide-container {
  text-align: center;
  // width: 100%;
  height: 100%;
  background: linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%);
  .add-btn {
    @include btn();
    background: $purple;
    position: fixed;
    bottom: 30px;
    width: 85%;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .card {
    // width: 100%;
    padding: 50px 0;
    margin: 0 auto;
  }
  .data-box {
    margin: 26px auto;
    width: 85%;
    border-radius: 10px;
    background: white;
    -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  .item-field {
    padding: 5px 0;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .data-item {
    display: inline-block;
    padding: 16px 0;
    text-align: center;
    width: 40%;
    .label {
      font-size: 12px;
      color: $dark_gray;
    }
    .data {
      font-weight: bold;
      color: $black;
      font-size: 20px;
    }
  }
}
</style>
