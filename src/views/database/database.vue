<template>
    <div>
        <el-container>
            <el-aside>
                <div @click="showAddDataSourceDialog=true">添加数据源</div>
                <el-menu>
                    <template v-for="databaseItem in databaseList">
                        <el-menu-item :index="databaseItem.id" @click="handleClickDatabase(databaseItem)"
                                      style="text-align: left">
                            <span slot="title">{{databaseItem.databaseName}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
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
                <router-view/>
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

    export default {
        name: "database",
        mounted() {
            this.queryDatabaseList(null);
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
                }
            }
        },
        methods: {
            queryDatabaseList({...params}) {
                let pageParams = new PageParams(1, 15, params);
                _queryDatabaseList(pageParams)
                    .then(({data, result, message}) => {
                        console.log(data);
                        if ('success' === result) {
                            this.databaseList = data.list
                            this.databaseTotal = data.total;
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
                console.log(database)
                this.router.push({
                    name: 'query',
                    params: {
                        database: database
                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>