<template lang='pug'>
.main-stat-container
  .header
    .add-btn(@click='handleAdd') 添加
  table(class='stat-table')
    tr
      th(
        v-for='(value, key) in thLabels'
        :key='key'
        :class='key'
      ) {{value}}
    tr(
      v-for='(item,idx) in data'
      @click="handleEdit(item._id)"
    )
      td {{item['date']}}
      td {{item['mark']}}
      td {{item['serious']}}
      td {{item['hunger']}}
      td {{item['san']}}
      td {{item['hp']}}
      td {{item['freeTime']}}
      td {{item['sleepTime']}}
      td {{item['hasImportantThing']}}
      td {{item['hasSport']}}
      td {{item['hasRead']}}
      td {{item['hasKindle']}}
      td {{item['fallAsleep']}}
    tr.summary
      td {{summary['date']}}
      td {{summary['mark']}}
      td {{summary['serious']}}
      td {{summary['hunger']}}
      td {{summary['san']}}
      td {{summary['hp']}}
      td {{summary['freeTime']}}
      td {{summary['sleepTime']}}
      td {{summary['hasImportantThing']}}
      td {{summary['hasSport']}}
      td {{summary['hasRead']}}
      td {{summary['hasKindle']}}
      td {{summary['fallAsleep']}}
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
    ilog.info('list:', resp);
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
          summary[key] = (summary[key] / data.length).toFixed(1);
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
.header {
  .add-btn {
    @include btn();
    background: $purple;
  }
}
.stat-table {
  // border: 1px solid $light_purple;
  border-collapse: collapse;
  margin: auto;
  font-size: 12px;
  .summary {
    background: $them_light_normal;
  }
  .sleepTime {
    background: $them_light_warn;
  }
  .fallAsleep {
    background: $them_light_info;
  }
  .hasRead {
    background: $them_light_warn;
  }
  th,
  td {
    min-height: 30px;
    padding: 5px;
    text-align: center;
    border: 1px solid $light_purple;
    border-collapse: collapse;
  }
}
</style>
