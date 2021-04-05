import React from 'react';
import { Button } from '@geist-ui/react'
import { Crosshair, Trash2 } from '@geist-ui/react-icons';
function JsonToList(json){
    if(json)
        return Object.keys(json).map(key => ({
            id: key,
            ...json[key]
        }))
    else {
        return []
    }

}


// function operation(actions, row){
//     return <Button type="error" auto size="mini" onClick={onClick} >Remove</Button>
// }

function parseTableData(data, action = (type, data) => {}){
    return data.map(item => ({
        ...item, 
        operation: (actions, row) => <Button type='error-light' auto size='small' onClick={() => action('remove', row?.rowValue)} icon={<Trash2/>}></Button>
    }))
}



export {JsonToList, parseTableData}