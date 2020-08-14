<template>
    <div>
        <el-button type="primary" @click="handleClickAddProjectDatabase">关联数据源</el-button>
        <el-table
                :data="databaseList"
                style="width: 100%">
            <el-table-column
                    prop="databaseName"
                    label="数据库名">
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="showAddProjectDatabaseInstanceDialog" title="关联数据源">
            <el-form label-width="120px" ref="projectRef">
                <el-form-item label="项目名" prop="projectName">
                    <el-input v-model="projectName"/>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="closeCreateProjectDialog">取 消</el-button>
                <el-button @click="createProject" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
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
                showAddProjectDatabaseInstanceDialog: false,
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
            },
            handleClickAddProjectDatabase() {
                this.showAddProjectDatabaseInstanceDialog = true
            }

        }
    }
</script>

<style scoped>

</style>