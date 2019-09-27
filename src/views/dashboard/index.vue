<template>
  <div class="preview-container"
       v-infinite-scroll="loadMore"
       :infinite-scroll-disabled="!shouldLoadMore">
    <el-row :gutter="20">
      <el-col :span="12" v-for="(billPreview,index) in searchBillsPreview" :key="index">
          <bill-preview :bill-data="billPreview"></bill-preview>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import { getBillPreviewPageInfo } from '@/api/Bill'
  import BillPreview from './billpreview'

    export default {
        components: {
            BillPreview
        },
        data () {
            return {
                count: 0,
                shouldLoadMore: true,
                queryData: {
                  pageNum: 0,
                  pageSize: 6
                },
                searchBillsPreview: [],
            }
        },
        methods: {
            loadMore () {
                this.queryData.pageNum++;
                getBillPreviewPageInfo(this.queryData).then(res => {
                        this.shouldLoadMore = res.data.isLastPage
                        this.searchBillsPreview.push(...res.data.list);
                })
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
  .preview-container {
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: auto;
    overflow-x: hidden;
  }
</style>
