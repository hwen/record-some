<template lang='pug'>
table(class='stat-table')
  tr
    th(
      v-for='(value, key) in thLabels'
      :key='key'
      :class='key'
    ) {{value}}
  tr(
    v-for='item in data'
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
    td {{item['hasCode']}}
    td {{item['hasKindle']}}
    td {{item['fallAsleep']}}
</template>
<script>
import { thLabels, testData } from './testData';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      thLabels: thLabels,
      data: testData
    };
  },
  created() {},
  destroyed() {},
  methods: {}
};
</script>
<style lang="scss">
@import './../../styles/constants';
.stat-table {
  // border: 1px solid $light_purple;
  border-collapse: collapse;
  margin: auto;
  tr {
  }
  .sleepTime {
    background: $them_light_warn;
  }
  .fallAsleep {
    background: $them_light_info;
  }
  th,
  td {
    min-width: 40px;
    min-height: 30px;
    padding: 5px;
    text-align: center;
    border: 1px solid $light_purple;
    border-collapse: collapse;
  }
}
</style>
