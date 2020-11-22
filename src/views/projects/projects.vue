<template>
    <div>
        <el-container>
            <el-aside>
                <div @click="showCreateProjectDialog=true">添加项目</div>
                <el-menu>
                    <template v-for="(projectItem,index) in projectList">
                        <el-menu-item :index="index.toString()" @click="currentProject=projectItem">
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
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick"
                         v-if="currentProject!=null">
                    <el-tab-pane label="数据源" name="projectDatabase"/>
                    <el-tab-pane label="配置中心" name="projectConfiguration">配置中心</el-tab-pane>
                    <el-tab-pane label="工单" name="projectOrders"/>
                    <el-tab-pane label="变量" name="projectParams"/>
                    <el-tab-pane label="命名空间" name="projectNamespace">命名空间</el-tab-pane>
                    <router-view/>
                </el-tabs>
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
            this.router.push({
                name: 'projectDatabase',
                params: {
                    projectId: this.currentProject.projectId
                }
            })
        },
        data() {
            return {
                router: this.$router,
                projectList: [],
                projectTotal: 0,
                projectName: '',
                showCreateProjectDialog: false,
                activeName: 'projectDatabase',
                currentProject: null,
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
            },
            handleTabClick({name}) {
                this.router.push({
                    name: name,
                    params: {
                        projectId: this.currentProject.projectId
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>