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
    export default {
        name: "database"
    }
</script>

<style scoped>

</style>