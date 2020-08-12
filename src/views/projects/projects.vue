<template>
    <div>
        <el-container>
            <el-aside>
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
    </div>
</template>

<script>
    import {_queryProjectList} from '@views/projects/projects.js'
    import {PageParams} from "../../model/PageParams";

    export default {
        name: "projects",
        mounted() {
            this.queryProjectList(null)
        },
        data() {
            return {
                projectList: [],
                projectTotal: 0

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
            projectPageChange(page){
                console.log(page)
            }
        }
    }
</script>

<style scoped>

</style>