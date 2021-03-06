
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import DashboardContainer from '../../components/DashboardContainer';
import { db, auth } from '../../services/firebase';
import Classes from './Classes';
import Courses from './Courses';
import Students from './Students';
import Teachers from './Teachers';





export default function AdminDashboard(){
    const history = useHistory();
    return <DashboardContainer 
        onLogout={async () => {
            await auth.signOut();
            history.replace('/')
        }}
        header='Admin'
        items={[
            {
                title:"Classes",
                itemId:"/admin-dashboard/classes",
                route:"/admin-dashboard/classes",
            },
            {
                title:"Students",
                itemId:"/admin-dashboard/students",
                route:"/admin-dashboard/students",
            },
            {
                title:"Teachers",
                itemId:"/admin-dashboard/teachers",
                route:"/admin-dashboard/teachers",
            },
            {
                title:"Courses",
                itemId:"/admin-dashboard/courses",
                route:"/admin-dashboard/courses",
            },
            
        ]}
    >
        <Switch>
            <Route  path='/admin-dashboard/classes' component={Classes} />
            <Route  path='/admin-dashboard/students' component={Students} />
            <Route  path='/admin-dashboard/courses' component={Courses} />
            <Route  path='/admin-dashboard/teachers' component={Teachers} />
        </Switch>
    </DashboardContainer>
}

