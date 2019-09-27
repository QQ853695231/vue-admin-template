<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{billData['billMonth']}}</span>
        </div>
        <div>
          <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
        </div>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "bill-preview",
        props: {
            billData: {
                type: Object,
                required: true
            }
        },
        data() {

            return  {
                chartSettings: {
                    labelMap: {
                        'billMoney': '账单总额'
                    }
                },
                chartData: {
                    columns: ['bankName', 'billMoney'],
                    rows: []
                }
            }
        },
        watch: {
            billData: {
                handler: function () {
                    this.chartData.rows = this.billData.billBankList
                },
                immediate: true
            }
        }

    }
</script>

<style scoped>

</style>
