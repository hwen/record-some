<template lang='pug'>
.month-container
  AddBtn
  .summary.article
    span {{summary['serious']}}
    span {{summary['hunger']}}
    span {{summary['san']}}
    span {{summary['hp']}}
    // span {{summary['freeTime']}}
    // span {{summary['sleepTime']}}
    // span {{summary['hasSport']}}
    // span {{summary['hasRead']}}
    // span {{summary['hasKindle']}}
    // span {{summary['fallAsleep']}}
  .day-container
    .day(
      v-for='(item,idx) in data'
      :key='item._id'
    )
      .title(@click='handleExpandCol(idx)')
        span {{item['date']}}
      div(:class='["content", activeIdx === idx ? "active" : ""]')
        div.item(v-for='key in itemList' :key='key')
          label {{thLabels[key]}}
          div(:class='[key, "value"]') {{item[key]}}
</template>
<script>
import { thLabels, ths, rs } from './testData';
import { listSleep } from 'src/api';
import { getSummary } from 'src/utils';

import AddBtn from 'src/components/add-btn';

const itemList = [
  'mark',
  'serious',
  'hunger',
  'san',
  'hp',
  'freeTime',
  'sleepTime',
  // 'hasImportantThing',
  'hasSport',
  'hasRead',
  'hasKindle',
  'fallAsleep'
];

export default {
  name: 'home',
  components: {
    AddBtn
  },
  data() {
    return {
      activeIdx: null,
      currentMonth: null,
      thLabels: ths,
      data: [],
      itemList: itemList,
      activeCol: {},
      summary: []
    };
  },
  async created() {
    const { month } = this.$route.params;
    this.currentMonth = month;
    let resp = await listSleep();
    ilog(resp);
    // resp = rs;
    if (resp.isOk) {
      this.data = resp.data;
      this.summary = getSummary(resp.data);
    }
  },
  methods: {
    handleAdd() {
      this.$router.push('/detail');
    },
    handleEdit(id) {
      this.$router.push(`/detail/${id}`);
    },
    handleDetail(idx) {
      this.$router.push(`/slide/${idx}`);
    },
    handleExpandCol(idx) {
      this.activeIdx = this.activeIdx === idx ? null : idx;
      // this.$set(this.activeCol, idx, !this.activeCol[idx]);
    }
  }
};
</script>
<style lang="scss">
@import './../../styles/constants';
@import './../../styles/mixins';

.month-container {
  font-size: 0.5rem;
  .summary {
    background: $blue;
    padding: 0.3rem;
    text-align: center;
    color: white;
  }
  .day-container {
    .day {
    }
  }
  .title {
    background: #dcdcdc;
    padding: 4px;
  }
  .content {
    height: 0;
    transition-timing-function: ease;
    transition-property: all;
    transition-duration: 1s;
    transition-delay: 0;
    overflow: hidden;
    &.active {
      height: 300px;
    }
    .item {
      display: inline-block;
      height: 100px;
      width: 25%;
      line-height: 1;
      text-align: center;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      position: relative;
      vertical-align: top; // 解决个别格子 font-size 导致的对齐问题
      overflow: hidden;
      &:nth-child(4n + 0) {
        border-right: none;
      }
      label {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        font-size: 10px;
        margin-top: -25px;
      }
      .value {
        position: relative;
        width: 90%;
        margin: auto;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .mark,
    .fallAsleep {
      font-size: 12px;
    }
  }
}
</style>
