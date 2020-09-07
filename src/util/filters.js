const filters = {
    filterOrderState(orderState) {
        const orderStateList = {
            0: '未审核',
            1: '等待作者',
            2: '已通过',
            3: '已拒绝'
        }
        return orderStateList[orderState]
    },
    filterOrderType(orderType) {
        const orderTypeList = {
            0: '其他工单',
            1: 'sql工单',
            2: 'config工单'
        }
        return orderTypeList[orderType]
    }
}

export default filters