import { compareNestedStructures } from './functions/compare'

export const recordEvent = async (data) => {
    let oldData = data.oldData
    let newData = data.newData
    let action = data.action
    let performedBy = data.performedBy
    let module = data.module

    const diffrence = compareNestedStructures(oldData, newData)


}