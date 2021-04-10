import React from 'react';
import { Button, Spacer } from '@geist-ui/react'
import { Crosshair, Trash2, CheckCircle } from '@geist-ui/react-icons';
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

function parseTableData(data, action = (type, data) => {}, operation = {
    remove: true,
    confirm: false
}){
    if(data)
    return data?.map(item => ({
        ...item, 
        operation: (actions, row) => <>
            {operation.remove && <Button style={{marginLeft:5}} type='error-light' auto size='small' onClick={() => action('remove', row?.rowValue)} icon={<Trash2/>}></Button>}
            
            {operation.confirm && <Button style={{marginLeft:5}} type='success-light' auto size='small' onClick={() => action('aprrove', row?.rowValue)} icon={<CheckCircle/>}></Button>}
        </>
    }))
    else {
        return []
    }
}


function getEndpoint(url){
    let parts = url.split('/');
    if(parts.length){
        return parts[parts.length - 1]
    }
    return null
}



export {
    JsonToList, 
    parseTableData, 
    getEndpoint
}