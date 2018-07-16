<template lang='pug'>
.slide-container
  swipe.card(ref='swipe' v-model='swipeIndex')
    swipe-item(
      v-for='item in list'
      :key='item._id'
    )
      .date {{item.date}}
      .data-box
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
        .data-item
          .item-field
            .label hasImportantThing
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
</template>
<script>
import { sleepDetail, updateSleep, addSleep, listSleep } from 'src/api';
import { testData } from './testData';
export default {
  name: 'detail',
  components: {},
  data() {
    return {
      swipeIndex: 0,
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
      list: testData
    };
  },
  async created() {
    const resp = await listSleep();
    ilog(resp);
    // this.list = resp;
    this.list = testData;
  },
  destroyed() {},
  methods: {
    handleSubmit() {}
  }
};
</script>
<style lang="scss">
@import './../../styles/constants';
@import './../../styles/mixins';
.slide-container {
  .date {
    text-align: center;
  }
  .card {
    width: 80%;
    margin: 26px auto;
  }
  .data-item {
    display: inline-block;
    padding: 36px;
    text-align: center;
    .label {
      font-size: 12px;
      color: #dcdcdc;
    }
    .data {
      font-weight: bold;
      color: white;
    }
  }
}
</style>
