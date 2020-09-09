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
            <el-table border stripe :data="sqlResult" style="width: 100%">
                <el-table-column
                        :key="metadataItem.name"
                        :label="metadataItem.name"
                        :prop="metadataItem.name"
                        v-for="metadataItem in metadataList"
                />
            </el-table>
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
                metadataList: [],
                selectedDatabase: {}
            }
        },
        methods: {
            handleExecuteSQL() {
                _executeSQL(({
                    'sql': this.sqlContent,
                    'databaseId': this.selectedDatabase.databaseId
                })).then(({message, result, data}) => {
                    console.log(data)
                    this.sqlResult = data[0].dataList;
                    this.metadataList = data[0].metaData;
                    console.log(this.metadataList, this.sqlResult)
                })
            }
        }
    }
</script>

<style scoped>

</style>