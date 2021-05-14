import React, { useState } from 'react';
import { Button, Card, Container, Link, Grid, Input, Page, Spacer, Text, Table, useToasts, Modal } from '@geist-ui/react'
import { useHistory, useLocation } from 'react-router';
import { ClassService, StudentService, TeacherService } from '../../../services';
import { JsonToList, parseTableData } from '../../../utils';
import { CheckInCircleFill, Plus } from '@geist-ui/react-icons';
import DynamicForm from '../../../components/DynamicForm';
import { auth } from '../../../services/firebase';


function MyCourses() {
    const [, setToast] = useToasts();
    const history = useHistory();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [modal, setModals] = useState({
        add: false
    })
    const [data, setData] = useState({
        courses: []
    });
    let query = useQuery();

    const fetchData = async () => {
        console.log(26, auth?.currentUser?.uid)
        if(!auth?.currentUser?.uid){
            return
        }
        let res = await TeacherService.getEnrolCourse(auth?.currentUser?.uid);
        setData(prev => ({
            ...prev,
            courses: JsonToList(res.val())
        }))
    }

    React.useEffect(() => {
        fetchData()
    }, [])


    // actions --------------------------------


    return (
        <div >
            <br />
            <Spacer y={1} />
            {data.courses.map(item => <Card style={{marginBottom:10}}>
                <Card.Content>
                    <Text b>{item.name}</Text>
                    <br/>
                    <Text >{item.code}</Text>
                    <br/>
                    <Button size='small'  type='secondary-light' block onClick={() => history.push(`/teacher-dashboard/courses/${item.id}`)}>View</Button>
                </Card.Content>
            </Card>)}


        </div>
    )


}

export default MyCourses;