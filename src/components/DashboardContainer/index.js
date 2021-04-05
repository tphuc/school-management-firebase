import { useTheme, Text, Button } from '@geist-ui/react';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import Navigation from '../Navigation';

import './index.css'

export default function DashboardContainer({
    header,
    items,
    onLogout = () => {},
    ...props
}) {
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme()
    return <div>
        <div style={{ width: "100%", height: 60,verticalAlign:'middle',   padding:'0px 50px', borderBottom: `1px solid ${theme.palette.accents_2}` }}>
            <div style={{height:"100%",display:"flex", width:'100%', justifyContent:"space-between", flexDirection:"row", alignItems:"center"}}>
                 <span><strong>{header}</strong></span>
                <Button onClick={onLogout} auto size='small'> Logout</Button>
            </div>
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>
            <div className='dashboard-sidebar' style={{ background: theme.palette.accents_1 }}>
                <Navigation items={items} onChange={({ event, item }) => {
                    event?.preventDefault();
                    history.push(item.itemId);
                }} activeItemID={location.pathname}></Navigation>
            </div>
            <div className='dashboard-content' style={{flexGrow:1, padding:20}}>
                {props.children}
            </div>
        </div>
    </div>
}
