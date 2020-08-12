<template>
    <div>
        <el-container>
            <el-aside>
                <el-menu>
                    <template v-for="databaseItem in databaseList">
                        <el-menu-item :index="databaseItem.id">
                            <span slot="title">{{databaseItem.databaseName}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
                <!--分页-->
                <el-pagination
                        layout="prev, jumper, next, slot"
                        :total="databaseTotal"
                        :page-size="15"
                        @current-change="databasePageChange"
                        small
                        background
                        hide-on-single-page
                >
                    <span>共{{ databaseTotal }}页</span>
                </el-pagination>
            </el-aside>
            <el-main>
                this is databse execute page
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {_queryDatabaseList} from '@views/database/database.js'
    import {PageParams} from "@model/PageParams";

    export default {
        name: "database",
        mounted() {
            this.queryDatabaseList(null);
        },
        data() {
            return {
                databaseList: [],
                databaseTotal: 0,
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
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>