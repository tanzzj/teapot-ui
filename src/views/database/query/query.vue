<template>
    <div>
        <div>
            current database: {{selectedDatabase.databaseName}}
        </div>
        <div>
            <!--sql执行框-->
            <el-input :rows="10" placeholder="type something" type="textarea" v-model="querySqlContent"/>
        </div>
        <div>
            <!--执行按钮-->
            <el-button @click="handleExecuteSQL" type="primary">执行</el-button>
        </div>
        <div>
            <!-- 显示操作结果 -->
            <el-tabs @tab-click="handleClickTab" closable type="border-card">
                <!-- dataResult:{dataList/metaData/sqlType} -->
                <template v-for="(data,index) in dataList">
                    <!-- 显示 result tab -->
                    <el-tab-pane :key="index"
                                 :label="'result'+index"
                                 :name="index+''"
                                 @click="handleClickTab(data)"
                    />
                </template>
                <!-- select 语句显示框 -->
                <div v-if="isSelect">
                    <el-table :data="currentResultList" border fit stripe style="width: 100%">
                        <el-table-column
                                :key="metadataItem.name"
                                :label="metadataItem.name"
                                :prop="metadataItem.name"
                                v-for="metadataItem in currentMetadataList"
                        />
                    </el-table>
                </div>
                <!-- dml语句执行显示结果 -->
                <div v-else-if="!isSelect">
                    <div>{{dmlSqlResult}}</div>
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
            this.selectedDatabase = this.$route.params.database
            if (this.selectedDatabase === null) {
                this.router.push({
                    name: 'database'
                })
            }
        },
        data() {
            return {
                router: this.$router,
                selectedDatabase: {},
                querySqlContent: '',
                currentResultList: [],
                currentMetadataList: [],
                currentSqlType: '',
                dmlSqlResult: '',
                dataList: [],
                isSelect: true
            }
        },
        methods: {
            handleExecuteSQL() {
                _executeSQL(({
                    'sql': this.querySqlContent,
                    'databaseId': this.selectedDatabase.databaseId
                })).then(({message, result, data}) => {
                    this.dataList = data;
                    //默认取第一个数组
                    this.isSelect = data[0].sqlType === 'select'
                    if (this.isSelect) {
                        this.currentResultList = data[0].dataList;
                        this.currentMetadataList = data[0].metaData;
                    } else {
                        this.dmlSqlResult = data[0].result
                    }
                })
            },
            /**
             * 处理点击tab事件
             * @param tab 选中的tab
             * @param event 事件
             */
            handleClickTab(tab, event) {
                if (this.dataList[tab.name].sqlType === 'select') {
                    this.isSelect = true;
                    this.currentResultList = this.dataList[tab.name];
                    this.currentMetadataList = this.dataList[tab.name].metaData;
                    this.currentResultList = this.dataList[tab.name].dataList;
                } else {
                    this.isSelect = false;
                    this.dmlSqlResult = this.dataList[tab.name].result;
                }

            }
        }
    }
</script>

<style scoped>

</style>