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
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>