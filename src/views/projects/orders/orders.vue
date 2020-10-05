<template>
    <div>
        <el-button @click="createOrder" type="primary">创建工单</el-button>
        <el-button @click="mergeQueryClick" type="primary">合并查询</el-button>
        <el-table :data="projectList" @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" width="55"/>
            <el-table-column label="工单名" prop="projectOrderName" width="180"/>
            <el-table-column label="工单状态" prop="orderState" width="180">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.orderState=== 2 ? 'success':''">{{
                        scope.row.orderState | filterOrderState }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="工单类型" prop="orderType" width="180">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.orderType | filterOrderType }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="创建人" prop="createUser" width="180"/>
            <el-table-column label="创建时间" prop="createTime" width="180"/>
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
                    <el-input type="textarea" v-model="createOrderParams.content"/>
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
        <el-dialog :visible.sync="showMergeOrderDialog" title="合并查询工单">
            <el-input :rows="10" placeholder="请输入内容" type="textarea" v-model="orderContent"/>
            <el-select placeholder="请选择数据源" v-model="selectedDatabase">
                <el-option :key="item.databaseId" :label="item.databaseName" :value="item.databaseId"
                           v-for="item in projectDatabaseList"/>
            </el-select>
            <span class="dialog-footer" slot="footer">
                <el-button @click="handleCloseMergeOrderDialog">取 消</el-button>
            </span>
            <span class="dialog-footer" slot="footer">
                <el-button @click="handleCloseMergeOrderDialog" type="primary">导 出</el-button>
            </span>
            <span class="dialog-footer" slot="footer">
                <el-button @click="executeSQL" type="primary">执 行</el-button>
            </span>
            <div>
                <div>
                    <div v-if="operationSuccess = true">
                        <span style="text-align: left"><i class="el-icon-success"
                                                          style="color: #42b983"/> success </span>
                    </div>
                    <div v-else-if="operationSuccess = false">
                        <span style="text-align: left"><i class="el-icon-success" style="color: #c23e3e"/> fail </span>
                    </div>
                    <div v-else>
                        <span style="text-align: left"></span>
                    </div>
                </div>

                <!-- 显示操作结果 -->
                <el-tabs @tab-click="handleClickTab" closable type="border-card">
                    <!-- dataResult:{dataList/metaData/sqlType} -->
                    <template v-for="(data,index) in dataList">
                        <!-- 显示 result tab -->
                        <el-tab-pane :key="index"
                                     :label="'result'+index"
                                     :name="index+''"
                                     @click="handleClickTab(data)"
                        />
                    </template>
                    <!-- select 语句显示框 -->
                    <div v-if="isSelect">
                        <el-table :data="currentResultList" border fit stripe style="width: 100%">
                            <el-table-column
                                    :key="metadataItem.name"
                                    :label="metadataItem.name"
                                    :prop="metadataItem.name"
                                    v-for="metadataItem in currentMetadataList"
                            />
                        </el-table>
                    </div>
                    <!-- dml语句执行显示结果 -->
                    <div v-else-if="!isSelect">
                        <div>{{dmlSqlResult}}</div>
                    </div>
                </el-tabs>
            </div>
        </el-dialog>
    </div>


</template>

<script>
    import {
        _createProjectOrder,
        _mergeOrder,
        _queryProjectOrderDetails,
        _queryProjectOrderList
    } from '@views/projects/orders/orders.js'
    import {_executeSQL, _queryProjectDataBaseList} from '@views/projects/database/database.js'
    import {PageParams} from "../../../model/PageParams";

    export default {
        name: "orders",
        mounted() {
            this.queryProjectOrderList();
        },
        data() {
            return {
                projectId: this.$route.params.projectId,
                showCreateOrderDialog: false,
                showSelection: false,
                showOrdersDetailsDialog: false,
                showMergeOrderDialog: false,
                orderContent: '',
                selectedDatabase: '',
                pageParams: new PageParams(),
                projectDatabaseList: [],
                projectList: [],
                orderDetails: {},
                selectedRows: [],
                createOrderParams: {
                    projectOrderName: null,
                    orderType: null,
                    projectOrderDetail: null,
                    content: null,
                    assignedUserList: []
                },
                dataList: [],
                operationSuccess: null,
                isSelect: true,
                currentMetadataList: [],
                currentResultList: []
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
            },
            /**
             * 处理点击合并工单按钮
             * */
            mergeQueryClick() {
                let projectOrderList = [];
                this.selectedRows.forEach(rows => {
                    projectOrderList.push(({projectOrderId: rows.projectOrderId}))
                })
                //调用合并查询工单接口
                _mergeOrder({
                    'projectId': this.projectId,
                    'projectOrderList': projectOrderList
                }).then(({result, message, data}) => {
                    this.showMergeOrderDialog = true;
                    data.forEach(eachOrder => {
                        this.orderContent += eachOrder.content + ';' + '\n\n'
                    })
                })
                this.queryProjectDataBaseList();
            },
            /**
             * 处理工单多选框
             */
            handleSelectionChange(rows) {
                this.selectedRows = rows;
                console.log(this.selectedRows)
            },
            /**
             * 处理关闭合并查询弹窗
             */
            handleCloseMergeOrderDialog() {
                this.orderContent = ''
                this.showMergeOrderDialog = false
            },
            /**
             * 查询项目绑定数据源列表
             */
            queryProjectDataBaseList() {
                _queryProjectDataBaseList({'projectId': this.projectId}).then(({message, result, data}) => {
                    if ('success' === result) {
                        this.projectDatabaseList = data
                    }
                })
            },
            /**
             * 执行sql
             */
            executeSQL() {
                _executeSQL({
                    'databaseId': this.selectedDatabase,
                    'sql': this.orderContent
                }).then(({message, result, data}) => {
                    this.dataList = data;
                    console.log(result + "<----")
                    this.operationSuccess = result === 'success'
                    //默认取第一个数组
                    this.isSelect = data[0].sqlType === 'select'
                    if (this.isSelect) {
                        this.currentResultList = data[0].dataList;
                        this.currentMetadataList = data[0].metaData;
                    } else {
                        this.dmlSqlResult = data[0].result
                    }
                })
            },
            /**
             * 处理点击tab事件
             * @param tab 选中的tab
             * @param event 事件
             */
            handleClickTab(tab, event) {
                if (this.dataList[tab.name].sqlType === 'select') {
                    this.isSelect = true;
                    this.currentResultList = this.dataList[tab.name];
                    this.currentMetadataList = this.dataList[tab.name].metaData;
                    this.currentResultList = this.dataList[tab.name].dataList;
                } else {
                    this.isSelect = false;
                    this.dmlSqlResult = this.dataList[tab.name].result;
                }

            }
        }

    }
</script>

<style scoped>

</style>