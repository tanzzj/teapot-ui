<template>
    <el-table
            :data="databaseList"
            style="width: 100%">
        <el-table-column
                prop="databaseName"
                label="数据库名"
                width="180">
        </el-table-column>
    </el-table>
</template>

<script>

    import {_queryProjectDataBaseList} from '@views/projects/database/database.js'

    export default {
        name: "database",
        mounted() {
            this.queryProjectDataBaseList();
        },
        data() {
            return {
                databaseList: [],
                projectId: this.$route.params.projectId,
            }
        },
        methods: {
            queryProjectDataBaseList() {
                let projectId = this.projectId;
                _queryProjectDataBaseList(({projectId})).then(({result, message, data}) => {
                    if ('success' === result) {
                        this.databaseList = data;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>