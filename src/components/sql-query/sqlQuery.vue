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
    export default {
        name: "sqlQuery",
        data() {
            return {}
        },
        props: {

        }
    }
</script>

<style scoped>

</style>