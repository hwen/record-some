<template lang='pug'>
.month-container
  .summray.article
    span {{summary['serious']}}
    span {{summary['hunger']}}
    span {{summary['san']}}
    span {{summary['hp']}}
    span {{summary['freeTime']}}
    span {{summary['sleepTime']}}
    span {{summary['hasImportantThing']}}
    span {{summary['hasSport']}}
    span {{summary['hasRead']}}
    span {{summary['hasKindle']}}
    span {{summary['fallAsleep']}}
  .day-container
    .day(
      v-for='(item,idx) in data'
      :key='item._id'
    )
      .title(@click='handleExpandCol(idx)')
        span {{item['date']}}
      div(:class='["content", activeCol[idx] ? "active" : ""]')
        div.item(v-for='key in itemList' :key='key')
          label {{thLabels[key]}}
          div(:class='[key, "value"]') {{item[key]}}
</template>
<script>
import { thLabels, ths, rs } from './testData';
import { listSleep } from 'src/api';

const itemList = [
  'mark',
  'serious',
  'hunger',
  'san',
  'hp',
  'freeTime',
  'sleepTime',
  'hasImportantThing',
  'hasSport',
  'hasRead',
  'hasKindle',
  'fallAsleep'
];

export default {
  name: 'home',
  components: {},
  data() {
    return {
      thLabels: ths,
      data: [],
      itemList: itemList,
      activeCol: {},
      summary: []
    };
  },
  async created() {
    let resp = await listSleep();
    ilog(resp);
    // resp = rs;
    if (resp.isOk) {
      this.data = resp.data;
      this.summary = this.getSummary(resp.data);
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
      this.$set(this.activeCol, idx, !this.activeCol[idx]);
    },
    getSummary(data = []) {
      const sumMethod = {
        serious: 'average',
        san: 'average',
        hunger: 'average',
        hp: 'average',
        freeTime: 'average',
        sleepTime: 'timeCount',
        hasImportantThing: 'count',
        hasSport: 'count',
        hasRead: 'count',
        hasKindle: 'count',
        fallAsleep: 'percent'
      };

      const getSumResult = (sum, value, method) => {
        switch (method) {
          case 'average': // 内部只做加法
          case 'count':
            sum += ~~value;
            return sum;
          case 'percent':
            sum += /容易/.test(value.slice(0, 2)) ? 1 : 0;
            return sum;
          default:
            sum += /^2[0-3]$/.test(value.slice(0, 2)) ? 1 : 0;
            return sum;
        }
      };

      const summary = data.reduce((smry, item) => {
        for (let key in item) {
          if (sumMethod[key]) {
            smry[key] = getSumResult(smry[key] || 0, item[key], sumMethod[key]);
          }
        }
        return smry;
      }, {});

      for (let key in sumMethod) {
        if (/(average|percent)/.test(sumMethod[key])) {
          summary[key] = summary[key] / data.length;
        }
      }
      return summary;
    }
  }
};
</script>
<style lang="scss">
@import './../../styles/constants';
@import './../../styles/mixins';

.month-container {
  font-size: 0.5rem;
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
