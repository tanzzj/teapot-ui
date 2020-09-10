<template>
    <div>
        <div>
            <!--sql执行框-->
            <el-input :rows="10" placeholder="type something" type="textarea" v-model="sqlContent"/>
        </div>
        <div>
            <el-button @click="handleExecuteSQL" type="primary">执行</el-button>
        </div>
        <div>
            <el-tabs @tab-click="handleClickTab" closable type="border-card">
                <!-- dataResult:{dataList/metaData/sqlType} -->
                <template v-for="(dataResult,index) in dataList">
                    <el-tab-pane :key="index" :label="'result'+index" :name="index+''"
                                 @click="handleClickTab(dataResult)"/>
                </template>
                <el-table :data="sqlResult" border fit stripe style="width: 100%" v-if="currentSqlType=='select'">
                    <el-table-column
                            :key="metadataItem.name"
                            :label="metadataItem.name"
                            :prop="metadataItem.name"
                            v-for="metadataItem in metadataList"
                    />
                </el-table>
                <div v-else>
                    {{dmlSqlResult}}
                </div>
            </el-tabs>

        </div>
    </div>
</template>

<script>
    import {_executeSQL} from '@views/database/query/query.js'

    export default {
        name: "query",
        mounted() {
            console.log(this.selectedDatabase)
            this.selectedDatabase = this.$route.params.database
        },
        data() {
            return {
                router: this.$router,
                sqlContent: '',
                sqlResult: [],
                dmlSqlResult: '',
                metadataList: [],
                selectedDatabase: {},
                dataList: [],
                currentSqlType: ''
            }
        },
        methods: {
            handleExecuteSQL() {
                _executeSQL(({
                    'sql': this.sqlContent,
                    'databaseId': this.selectedDatabase.databaseId
                })).then(({message, result, data}) => {
                    //默认取第一个数组
                    this.sqlResult = data[0].dataList;
                    this.metadataList = data[0].metaData;
                    this.dataList = data;
                })
            },
            /**
             * 处理点击tab事件
             * @param tab
             * @param event
             */
            handleClickTab(tab, event) {
                this.sqlResult = this.dataList[tab.name]
                this.metadataList = this.dataList[tab.name].metaData;
                this.sqlResult = this.dataList[tab.name].dataList;
            }
        }
    }
</script>

<style scoped>

</style>