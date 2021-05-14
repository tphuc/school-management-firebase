import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import DashboardContainer from '../../components/DashboardContainer';
import { auth } from '../../services/firebase';
import CourseDetail from './CourseDetail';
import Enrolment from './Enrolment';
import MyCourses from './MyCourses';




export default function TeacherDashboard(){
    const history = useHistory()
    return <DashboardContainer 
        onLogout={async () => {
            await auth.signOut();
            history.replace('/')
        }}
        header='Teachers'
        items={[
            {
                title:"My courses",
                itemId:"/teacher-dashboard/courses",
                route:"/teacher-dashboard/courses",
            },
            // {
            //     title:"Enrolment",
            //     itemId:"/teacher-dashboard/enrolment",
            //     route:"/teacher-dashboard/enrolment",
            // },
            
        ]}
    >
        <Switch>
            <Route exact path='/teacher-dashboard/courses' component={MyCourses} />
            <Route exact path='/teacher-dashboard/courses/:id' component={CourseDetail} />
        </Switch>
    </DashboardContainer>
}

