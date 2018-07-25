<template lang='pug'>
.month-container
  .summray
    span {{summary['date']}}
    span {{summary['mark']}}
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
      @click="handleDetail(idx)"
    )
      span {{item['date']}}
      span {{item['mark']}}
      span {{item['serious']}}
      span {{item['hunger']}}
      span {{item['san']}}
      span {{item['hp']}}
      span {{item['freeTime']}}
      span {{item['sleepTime']}}
      span {{item['hasImportantThing']}}
      span {{item['hasSport']}}
      span {{item['hasRead']}}
      span {{item['hasKindle']}}
      span {{item['fallAsleep']}}
</template>
<script>
import { thLabels, ths } from './testData';
import { listSleep } from 'src/api';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      thLabels: ths,
      data: [],
      summary: []
    };
  },
  async created() {
    const resp = await listSleep();
    ilog(resp);
    if (resp.isOk) {
      ilog('ok...');
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
    getSummary(data = []) {
      const sumMethod = {
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
</style>
