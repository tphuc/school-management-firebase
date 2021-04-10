import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import DashboardContainer from '../../components/DashboardContainer';
import { auth } from '../../services/firebase';
import CourseDetail from './CourseDetail';
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
                title:"My courses",
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
            <Route exact path='/student-dashboard/courses' component={MyCourses} />
            <Route path='/student-dashboard/enrolment' component={Enrolment} />
            <Route path='/student-dashboard/courses/:id' component={CourseDetail} />
        </Switch>
    </DashboardContainer>
}

