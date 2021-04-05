import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import DashboardContainer from '../../components/DashboardContainer';
import { auth } from '../../services/firebase';
import Enrolment from './Enrolment';
import MyCourses from './MyCourses';





export default function StudentDashoard(){
    const history = useHistory()
    return <DashboardContainer 
        onLogout={async () => {
            await auth.signOut();
            history.replace('/')
        }}
        header='Student'
        items={[
            {
                title:"Courses",
                itemId:"/student-dashboard/courses",
                route:"/student-dashboard/courses",
            },
            // {
            //     title:"Enrolment",
            //     itemId:"/student-dashboard/enrolment",
            //     route:"/student-dashboard/enrolment",
            // },
            
        ]}
    >
        <Switch>
            <Route path='/student-dashboard/courses' component={MyCourses} />
            <Route path='/student-dashboard/enrolment' component={Enrolment} />
        </Switch>
    </DashboardContainer>
}

