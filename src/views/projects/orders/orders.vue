<template>
    <div>
        <el-button type="primary" @click="createOrder">创建工单</el-button>
        <el-table :data="projectList" style="width: 100%">
            <el-table-column prop="projectOrderName" label="工单名" width="180"/>
            <el-table-column prop="orderState" label="工单状态" width="180"/>
            <el-table-column prop="createUser" label="创建人" width="180"/>
            <el-table-column prop="createTime" label="创建时间" width="180"/>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <span @click="handleClickOrdersDetails(scope.row)">详情</span>
                </template>
            </el-table-column>
        </el-table>
        <!--dialog区-->
        <el-dialog :visible.sync="showOrdersDetailsDialog" title="工单详情">
            <el-form>
                <el-form-item label="工单名">{{ orderDetails.projectOrderName }}</el-form-item>
                <el-form-item label="工单类型">{{ orderDetails.orderType }}</el-form-item>
                <el-form-item label="工单内容">{{ orderDetails.content }}</el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
            <el-button @click="showOrdersDetailsDialog=false">关闭</el-button>
         </span>
        </el-dialog>
        <!--创建工单-->
        <el-dialog :visible.sync="showCreateOrderDialog" title="创建工单">
            <el-form :model="createOrderParams" label-width="120px" ref="createOrdersRef">
                <el-form-item label="工单名" prop="projectOrderName">
                    <el-input v-model="createOrderParams.projectOrderName"/>
                </el-form-item>
                <el-form-item label="工单类型" prop="orderType">
                    <el-input v-model="createOrderParams.orderType"/>
                </el-form-item>
                <el-form-item label="工单详情" prop="projectOrderDetail">
                    <el-input v-model="createOrderParams.projectOrderDetail"/>
                </el-form-item>
                <el-form-item label="工单内容" prop="content">
                    <el-input v-model="createOrderParams.content" type="textarea"/>
                </el-form-item>
                <!--                <el-form-item label="审批人" prop="assignedUserList">-->
                <!--                    <el-input v-model="createOrderParams.assignedUserList"/>-->
                <!--                </el-form-item>-->
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="closeCreateOrderDialog">取 消</el-button>
                <el-button @click="createProjectOrder" type="primary">创 建</el-button>
            </span>
        </el-dialog>
    </div>


</template>

<script>
    import {
        _createProjectOrder,
        _queryProjectOrderDetails,
        _queryProjectOrderList
    } from '@views/projects/orders/orders.js'
    import {PageParams} from "@/model/PageParams";

    export default {
        name: "orders",
        mounted() {
            this.queryProjectOrderList();
        },
        data() {
            return {
                projectId: this.$route.params.projectId,
                showCreateOrderDialog: false,
                showOrdersDetailsDialog: false,
                projectList: [],
                orderDetails: {},
                createOrderParams: {
                    projectOrderName: null,
                    orderType: null,
                    projectOrderDetail: null,
                    content: null,
                    assignedUserList: []
                }
            }
        },
        methods: {
            queryProjectOrderList() {
                let pageParams = new PageParams(1, 15,
                    {
                        "projectId": this.projectId
                    })
                _queryProjectOrderList(pageParams).then(({result, message, data}) => {
                    console.log({result, message, data})
                    if ('success' === result) {
                        this.projectList = data.list;
                    }
                })
            },
            createProjectOrder() {
                let createOrdersParams = this.createOrderParams;
                _createProjectOrder({
                    ...createOrdersParams,
                    projectId: this.projectId
                }).then(({result, message, data}) => {
                    if ('success' === result) {
                        console.log("创建成功")
                        this.closeCreateOrderDialog();
                    }
                })
            },
            handleClickOrdersDetails(row) {
                this.showOrdersDetailsDialog = true;
                _queryProjectOrderDetails({
                    'projectOrderId': row.projectOrderId
                }).then(({result, message, data}) => {
                    if ('success' === result) {
                        this.orderDetails = data;
                    }
                })
            },
            createOrder() {
                this.showCreateOrderDialog = true;
            },
            closeCreateOrderDialog() {
                this.showCreateOrderDialog = false;
                this.$refs['createOrdersRef'].resetFields();
            }
        }

    }
</script>

<style scoped>

</style>