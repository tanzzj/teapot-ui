<template>
    <div>
        <el-container>
            <el-aside>
                <div @click="showCreateProjectDialog=true">添加项目</div>
                <el-menu>
                    <template v-for="(projectItem,index) in projectList">
                        <el-menu-item :index="index">
                            <span slot="title">{{projectItem.projectName}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
                <!--分页-->
                <el-pagination
                        :page-size="15"
                        :total="projectTotal"
                        @current-change="projectPageChange"
                        background
                        hide-on-single-page
                        layout="prev, jumper, next, slot"
                        small
                >
                    <span>共{{ projectTotal }}页</span>
                </el-pagination>
            </el-aside>
            <el-main>
                this is project page
            </el-main>
        </el-container>
        <!--dialog区-->
        <el-dialog :visible.sync="showCreateProjectDialog" title="添加项目">
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
    import {_createProject, _queryProjectList} from '@views/projects/projects.js'
    import {PageParams} from "../../model/PageParams";

    export default {
        name: "projects",
        mounted() {
            this.queryProjectList(null)
        },
        data() {
            return {
                projectList: [],
                projectTotal: 0,
                projectName: '',
                showCreateProjectDialog: false
            }
        },
        methods: {
            queryProjectList(data) {
                let pageParams = new PageParams(1, 15, {...data})
                _queryProjectList(pageParams).then(({data, result, message}) => {
                    if ('success' === result) {
                        this.projectList = data.list;
                        this.projectTotal = data.total;
                    }
                })
            },
            projectPageChange(page) {
                console.log(page)
            },
            //添加项目
            createProject() {
                _createProject({
                    projectName: this.projectName
                }).then(({result, message, data}) => {
                    if ('success' === result) {
                        this.showCreateProjectDialog = false
                        this.queryProjectList(null);
                        this.$refs['projectRef'].resetFields();
                    }
                })
            },
            //取消弹窗
            closeCreateProjectDialog() {
                this.showCreateProjectDialog = false;
                this.$refs['projectRef'].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>