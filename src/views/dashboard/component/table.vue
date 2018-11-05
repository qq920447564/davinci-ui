<template>
  <table v-if="s_showByRow" :style="styleObject" class="mailTable">
    <tr v-for="index in rowCount">
      <td class="column">{{ tableData[index*2-2].key }}</td>
      <td>{{ tableData[index*2-2].value }}</td>
      <td class="column">{{ tableData[index*2-1] !== undefined ? tableData[index*2-1].key : '' }}</td>
      <td>{{ tableData[index*2-1] !== undefined ? tableData[index*2-1].value : '' }}</td>
    </tr>
  </table>
  <table v-else :style="styleObject" class="mailTable">
    <tr v-for="index in rowCount">
      <td class="column">{{ tableData[index-1].key }}</td>
      <td>{{ tableData[index-1].value }}</td>
      <td class="column">{{ tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].key : '' }}</td>
      <td>{{ tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : '' }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['tableData', 'tableStyle', 'showByRow'],
  data() {
    return {
      styleObject: {},
      s_showByRow: true
    }
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length / 2)
    }
  },
  created() {
    this.styleObject = this.tableStyle
    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow
    }
  }
}
</script>
