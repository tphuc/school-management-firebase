import React from 'react';
import { Text, useTheme } from '@geist-ui/react'
import './index.css'


function NavItem({
    item = {
        title:'',
        itemId:"",
        route:'',

    },
    activeItemID,
    onChange,
}){
    const theme = useTheme();
    
    return <div  onClick={(e) => onChange({ event: e, item: item })} className='nav-item' style={{ background: activeItemID == item?.itemId ? theme.palette.accents_2 : "transparent", cursor:"pointer" }}>
        <Text span>{item.title}</Text>
    </div>
}


function Navigation({
    items,
    activeItemID,
    onChange
}){
    const theme = useTheme();
    return (
        <div >
            {items.map((item, id) => <NavItem key={id} item={item} onChange={onChange} activeItemID={activeItemID}/>)}
        </div>
    )
}

export default Navigation;