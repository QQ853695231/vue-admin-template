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

      <br/>
      <el-form-item label="备注：">
        <el-input
          v-model="form.remark"
          type="textarea"
          resize="both"
          placeholder="备注">
        </el-input>
      </el-form-item>

      <br/>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-loading="loading">账单录入</el-button>
        <el-button type="danger" @click="onCancel">重置</el-button>
      </el-form-item>
      <span style="display: none;">
        {{billTotal}}
      </span>
    </el-form>
  </div>
</template>

<script>
    import {getBankList} from '@/api/Bank'
    import {addBill} from '@/api/Bill'


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
                bankList: []
            }
        },
        beforeMount() {
            getBankList().then(res => {
                this.bankList = res.data
            })
        },
        methods: {
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
                    }
                    this.loading = false;
                }).catch(e => {
                    this.loading = false;
                })
            },
            onCancel() {
                this.$message({
                    message: 'cancel!',
                    type: 'warning'
                })
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

