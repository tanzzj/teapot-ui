<template>
    <div>
        <div>
            {{orderDetails.projectOrderName}}
        </div>
        <div>
            {{orderDetails.createUser}}
        </div>
        <div>
            <span v-for="(tag,index) in orderDetails.tag">
                <el-tag>{{tag.orderTag}}</el-tag>
            </span>
        </div>
        <div>
            <el-button @click="showCreateOrderDialog = true">创建变更</el-button>
            <el-dialog :visible.sync="showCreateOrderDialog" title="创建变更">
                <el-form :model="createOrderLogsParams" label-width="120px" ref="createOrderLogsRef">
                    <el-form-item>
                        <el-input  placeholder="变更描述"  v-model="createOrderLogsParams.description"/>
                    </el-form-item>
                    <el-form-item>
                        <el-input :rows="10" placeholder="变更详情(SQL)" type="textarea" v-model="createOrderLogsParams.details"/>
                    </el-form-item>
                </el-form>
                <span class="dialog-footer" slot="footer">
                <el-button @click="insertProjectOrderLogs">创 建</el-button>
            </span>
            </el-dialog>
        </div>
        <div>
            <el-button @click="showExecuteDialog = true">执行到目标库</el-button>
            <el-dialog :visible.sync="showExecuteDialog" title="执行到目标库">
                <el-form :model="executeOrderParams" label-width="120px" ref="executeOrderParamsRef">
                    <el-form-item>
                        <el-select v-model="databaseId">
                            <el-option v-for="item in projectDatabaseList"
                                       :key="item.databaseId"
                                       :value="item.databaseId"
                                       :label="item.databaseName"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
                <span class="dialog-footer" slot="footer">
                <el-button @click="executeOrder">执 行</el-button>
            </span>
            </el-dialog>
        </div>

        <div>
            <el-table :data="projectOrderLogsList" style="width: 100%">
                <el-table-column type="index" width="50"/>
                <el-table-column prop="description" label="变更描述"/>
                <el-table-column prop="details" label="变更详情" width="200px"/>
                <el-table-column prop="creator" label="创建人"/>
                <el-table-column prop="updater" label="更新人"/>
                <el-table-column prop="createTime" label="创建时间"/>
                <el-table-column prop="updateTime" label="更新时间"/>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {
        _insertProjectOrderLogs,
        _queryProjectOrderDetails,
        _queryProjectOrderLogs,
        _executeOrder
    } from '@views/projects/orders/orders.js'
    import {_queryProjectDataBaseList} from '@views/projects/database/database.js'
    import {PageParams} from "../../../model/PageParams";
    import {Message} from "element-ui";

    export default {
        name: "orderDetails.vue",
        mounted() {
            this.orderDetails = this.router.params;
            this.orderId = this.router.query.orderId;
            this.queryProjectDataBaseList();
            this.queryProjectOrderDetails();
            this.queryProjectOrderLogs();
        },
        data() {
            return {
                router: this.$route,
                projectId: this.$route.params.projectId,
                projectDatabaseList:[],
                orderDetails: {},
                databaseId:null,
                orderId: '',
                projectOrderLogsList:[],
                showExecuteDialog:false,
                showCreateOrderDialog: false,
                createOrderLogsParams: {
                    projectOrderId: null,
                    description: null,
                    details: null
                },
                executeOrderParams: {
                    databaseId: null,
                    projectOrderId: null
                }
            }
        },
        methods: {
            queryProjectOrderDetails() {
                _queryProjectOrderDetails({
                    projectOrderId: this.orderId
                }).then(({result, data, message}) => {
                   this.orderDetails = data;
                })
            },
            queryProjectOrderLogs(){
                let pageParams = new PageParams(1, 15,
                    {
                        "projectOrderId": this.orderId
                    })
                _queryProjectOrderLogs(pageParams).then(({data,result,message})=>{
                    this.projectOrderLogsList = data;
                })
            },
            queryProjectDataBaseList(){
                let projectId = this.projectId;
                _queryProjectDataBaseList(({projectId})).then(({result, message, data}) => {
                    if ('success' === result) {
                        this.projectDatabaseList = data;
                    }
                })
            },
            executeOrder(){
                let projectId = this.projectId;
                _executeOrder(({
                    "projectOrderId":this.orderId,
                    "databaseId": this.databaseId
                })).then(({result,message,data})=>{
                    if ('success'===result){
                        Message({message: message, type: 'success', duration: 2 * 1000});
                        this.closeExecuteOrderDialog();
                    }
                })
            },
            /**
             * 插入项目工单记录
             */
            insertProjectOrderLogs(){
                let createOrderLogsParams = this.createOrderLogsParams;
                createOrderLogsParams.projectOrderId = this.orderId;
                _insertProjectOrderLogs(createOrderLogsParams).then(({data, message, result}) => {
                    this.closeCreateOrderLogsDialog();
                    Message({message: message, type: 'success', duration: 2 * 1000})
                })
            },
            closeCreateOrderLogsDialog(){
                this.showCreateOrderDialog = false;
                this.$refs['createOrderLogsRef'].resetFields();
                this.queryProjectOrderLogs();
            },
            closeExecuteOrderDialog(){
                this.showExecuteDialog = false;
                this.$refs[''].resetFields();
            }

        }
    }
</script>

<style scoped>

</style>