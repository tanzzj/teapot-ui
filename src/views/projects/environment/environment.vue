<template>
    <div>
        <el-button @click="handleClickAddProjectEnvironment" type="primary">添加环境</el-button>
        <el-table :data="projectEnvironmentList">
            <el-table-column label="环境名" prop="environmentName"/>
            <el-table-column label="环境id" prop="environmentId"/>
            <!--  <el-table-column label="" prop="execute">
                  <template slot-scope="scope">
                      <div @click="handleClickQueryButton(scope.row)">查询</div>
                  </template>
              </el-table-column>-->
        </el-table>
        <el-dialog :visible.sync="showAddProjectDatabaseInstanceDialog" title="添加环境">
            <el-form label-width="120px" ref="environmentRef">
                <el-form-item label="环境名" prop="environmentName">
                    <el-input v-model="environmentName"/>
                </el-form-item>
                <el-form-item label="host" prop="environmentHost">
                    <el-input v-model="environmentHost"/>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="closeAddEnvironmentDialog">取 消</el-button>
                <el-button @click="addProjectEnvironment" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>


</template>

<script>

    import {_addProjectEnvironment, _queryProjectEnvironmentList} from '@views/projects/environment/environment.js'
    import PageParams from "../../../model/PageParams";

    export default {
        name: "environment.vue",
        mounted() {
            this.queryProjectEnvironmentList();
        },
        data() {
            return {
                showAddProjectDatabaseInstanceDialog: false,
                environmentName: '',
                environmentHost: '',
                projectEnvironmentList: [],
                projectId: this.$route.params.projectId,
                selectEnvironmentName: null
            }
        },
        methods: {
            handleClickAddProjectEnvironment() {
                this.showAddProjectDatabaseInstanceDialog = true;
            },
            closeAddEnvironmentDialog() {
                this.showAddProjectDatabaseInstanceDialog = false
            },
            addProjectEnvironment() {
                _addProjectEnvironment({
                    'environmentName': this.environmentName,
                    'environmentHost': this.environmentHost,
                    'projectId': this.projectId
                }).then(({result, message, data}) => {
                    this.showAddProjectDatabaseInstanceDialog = false
                })
            },
            queryProjectEnvironmentList() {
                let pageParams = new PageParams(1, 15,
                    {
                        "projectId": this.projectId,
                        "environmentName": this.selectEnvironmentName === null ? null : this.selectEnvironmentName
                    })
                _queryProjectEnvironmentList({...pageParams}).then(({result, message, data}) => {
                    if ('success' === result) {
                        this.projectEnvironmentList = data.list;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>