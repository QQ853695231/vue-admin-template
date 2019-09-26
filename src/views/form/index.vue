<template>
  <div class="app-container">
    <el-form ref="form" inline :model="form" label-width="120px">
      <el-form-item label="所属银行：">
          <el-select v-model="form.bankId">
            <el-option v-for="(bank,index) in bankList"
                       :label="bank.name"
                       :value="bank.pkId"
                       :key="index"></el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="账单月份：">
        <el-date-picker
          v-model="form.billMonth"
          type="month"
          value-format="yyyy-MM"
          @change="queryBillListByMonth"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>

      <br/>
      <el-form-item label="账单金额：">
        <el-input-number
          v-model="form.billMoney"
          :min="0"
          @change="caldCommission"
          placeholder="账单金额">
        </el-input-number>
      </el-form-item>

      <el-form-item label="手续费：">
        <el-input-number
          v-model="form.commission"
          :min="0"
          placeholder="手续费">
        </el-input-number>
      </el-form-item>

      <el-form-item label="账单总额：">
        <el-input-number
          v-model="form.total"
          :min="0"
          placeholder="账单总额">
        </el-input-number>
      </el-form-item>

      <br />
      <el-form-item label="备注：">
        <el-input
          v-model="form.remark"
          type="textarea"
          resize="both"
          style="width: 500px;"
          placeholder="备注">
        </el-input>
      </el-form-item>

      <br />

      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-loading="loading">账单录入</el-button>
        <el-button type="danger" @click="onCancel">重置</el-button>
      </el-form-item>
      <span style="display: none;">{{ billTotal }}</span>
    </el-form>
    <div class="current-month-table">
      <el-table :data="currentMonthBillList" border>
        <el-table-column label="账单银行" prop="bankName"></el-table-column>
        <el-table-column label="原始账单金额" prop="originalBillMoney"></el-table-column>
        <el-table-column label="账单手续费" prop="commission"></el-table-column>
        <el-table-column label="账单总额" prop="billMoney"></el-table-column>
        <el-table-column label="最后还款日" prop="lastReturnMoneyDate"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import {getBankList} from '@/api/Bank'
    import {addBill,getBillListByBillMonth} from '@/api/Bill'


    export default {
        data() {
            return {
                form: {
                    billMonth: '',
                    bankId: '',
                    billMoney: 0,
                    commission: 0,
                    total: 0,
                    remark: ''
                },
                loading: false,
                bankList: [],
                currentMonthBillList: []
            }
        },
        beforeMount() {
            getBankList().then(res => {
                this.bankList = res.data
            })
        },
        methods: {
            queryBillListByMonth() {
                if (this.form.billMonth) {
                    getBillListByBillMonth(this.form.billMonth).then(res => {
                        console.log(res)
                        this.currentMonthBillList = res.data
                    })
                } else {
                    this.currentMonthBillList = []
                }
            },
            onSubmit() {
                this.loading = true
                addBill(this.form).then(res => {
                    if (res.data.pkId) {
                        this.$message.success("账单新建成功")

                         this.form.bankId= '',
                         this.form.billMoney= 0,
                         this.form.commission= 0,
                         this.form.total= 0,
                         this.form.remark= ''
                        this.queryBillListByMonth()
                    }
                    this.loading = false;
                }).catch(e => {
                    this.loading = false;
                })
            },
            onCancel() {
                this.form = {
                        billMonth: '',
                        bankId: '',
                        billMoney: 0,
                        commission: 0,
                        total: 0,
                        remark: ''
                }

                this.currentMonthBillList = []
            },
            caldCommission() {
                if (this.form.billMoney === undefined || this.form.billMoney === 0 ) {
                    this.form.commission = 0
                } else {
                    this.form.commission = Math.ceil(this.form.billMoney * (0.1 / 100))
                }
            }
        },
        computed: {
            billTotal() {
                this.form.total = this.form.billMoney + this.form.commission
            }
        }
    }
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

