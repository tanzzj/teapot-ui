<template>
    <div>
        <el-container>
            <el-aside>
                <div @click="showAddDataSourceDialog=true">添加数据源</div>
                <el-tree :data="databaseList" :load="loadNode" :props="defaultProps" @node-click="handleClickDatabase"
                         lazy>
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span><i :class="data.icon" style="padding-right:10px "/>{{ node.label}}</span>
                        </span>
                </el-tree>
                <!--分页-->
                <el-pagination
                        :page-size="15"
                        :total="databaseTotal"
                        @current-change="databasePageChange"
                        background
                        hide-on-single-page
                        layout="prev, jumper, next, slot"
                        small
                >
                    <span>共{{ databaseTotal }}页</span>
                </el-pagination>
            </el-aside>
            <el-main>
                <router-view :key="routerKey"/>
            </el-main>
        </el-container>
        <el-dialog :visible.sync="showAddDataSourceDialog" title="添加数据源">
            <el-form :model="dataSourceParams" label-width="120px" ref="dataSourceRef">
                <el-form-item label="数据源名称" prop="databaseName">
                    <el-input v-model="dataSourceParams.databaseName"/>
                </el-form-item>
                <el-form-item label="数据源链接" prop="databaseConnection">
                    <el-input v-model="dataSourceParams.databaseConnection"/>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="dataSourceParams.username"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="dataSourceParams.password"/>
                </el-form-item>
                <el-form-item label="数据源类型" prop="databaseType">
                    <el-input v-model="dataSourceParams.databaseType"/>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
            <el-button @click="closeAddDatabaseDialog">取 消</el-button>
            <el-button @click="addDatabase" type="primary">确 定</el-button>
         </span>
        </el-dialog>
    </div>

</template>

<script>
    import {_addDatabase, _queryDatabaseList} from '@views/database/database.js'
    import {PageParams} from "@model/PageParams";
    import {_executeSQL} from '@views/database/query/query.js'

    export default {
        name: "database",
        mounted() {
            this.queryDatabaseList(null);
        },
        computed: {
            routerKey() {
                return this.$route.name ? this.$route.name + +new Date() : this.$route.name + +new Date()
            }
        },
        data() {
            return {
                router: this.$router,
                databaseList: [],
                databaseTotal: 0,
                showAddDataSourceDialog: false,
                dataSourceParams: {
                    databaseName: '',
                    databaseConnection: '',
                    username: '',
                    password: '',
                    databaseType: ''
                },
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    isLeaf: 'leaf'
                }
            }
        },
        methods: {
            queryDatabaseList({...params}) {
                let pageParams = new PageParams(1, 15, params);
                _queryDatabaseList(pageParams)
                    .then(({data, result, message}) => {
                        if ('success' === result) {
                            this.databaseList = data.list
                            this.databaseTotal = data.total;
                            //过滤得到组件需要的参数
                            this.databaseList.forEach(databaseItem => {
                                databaseItem.name = databaseItem.databaseName;
                                databaseItem.nodeType = 'db';
                                databaseItem.icon = 'el-icon-coin'
                            })
                        }
                    })
            },
            // 菜单分页
            databasePageChange(page) {
                console.log(page)
            },
            //添加数据源
            addDatabase() {
                _addDatabase({
                    databaseName: this.dataSourceParams.databaseName,
                    databaseConnection: this.dataSourceParams.databaseConnection,
                    username: this.dataSourceParams.username,
                    password: this.dataSourceParams.password,
                    databaseType: this.dataSourceParams.databaseType
                }).then(({result, message, data}) => {
                    if ('success' === result) {
                        this.showAddDataSourceDialog = false
                        this.queryDatabaseList(null);
                        this.$refs['dataSourceRef'].resetFields();
                    }
                })
            },
            //取消弹窗
            closeAddDatabaseDialog() {
                this.showAddDataSourceDialog = false;
                this.$refs['dataSourceRef'].resetFields();
            },
            handleClickDatabase(database) {
                //需点击database才进行路由跳转，否则仅展开
                if (database.databaseId !== undefined) {
                    this.router.push({
                        name: 'query',
                        query: {
                            databaseId: database.databaseId
                        },
                        params: {
                            database: database,
                        }
                    })
                }
            },
            handleNodeClick() {
                console.log('click!')
            },
            loadNode(node, resolve) {
                if ('db' === node.data.nodeType) {
                    _executeSQL({
                        'sql': 'show tables',
                        'databaseId': node.data.databaseId
                    }).then(({result, data, message}) => {
                        let children = [];
                        let dataList = data[0].dataList
                        for (let i = 0; i < dataList.length; i++) {
                            //统一名称
                            children.push(({
                                'name': dataList[i].TABLE_NAME,
                                'nodeType': 'table',
                                'databaseId': node.data.databaseId,
                                'icon': 'el-icon-date',
                            }))
                        }
                        resolve(children)
                    })
                } else if ('table' === node.data.nodeType) {
                    _executeSQL({
                        'sql': 'select COLUMN_NAME from information_schema.COLUMNS where table_name =' + "'" + node.data.name + "'",
                        'databaseId': node.data.databaseId
                    }).then(({result, data, message}) => {
                        let children = [];
                        let dataList = data[0].dataList
                        for (let i = 0; i < dataList.length; i++) {
                            //统一名称
                            children.push(({
                                'name': dataList[i].COLUMN_NAME,
                                'nodeType': 'field',
                                'icon': 'el-icon-collection-tag',
                                leaf: true
                            }))
                        }
                        resolve(children)
                    })
                }
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>