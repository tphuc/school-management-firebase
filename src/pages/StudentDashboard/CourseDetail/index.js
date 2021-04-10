import React, { useState } from 'react';
import { Button, Card, Container, Link, Grid, Input, Tabs, Page, Spacer, Divider, Text, Table, useToasts, Modal } from '@geist-ui/react'
import { useHistory, useLocation } from 'react-router';
import { ClassService, CourseService, StudentService } from '../../../services';
import { getEndpoint, JsonToList, parseTableData } from '../../../utils';
import { CheckInCircleFill, Plus } from '@geist-ui/react-icons';
import DynamicForm from '../../../components/DynamicForm';
import { auth } from '../../../services/firebase';


function CourseDetail() {
    const [, setToast] = useToasts();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [modal, setModals] = useState({
        add: false
    })
    const [data, setData] = useState({
        course: {}
    });
    let query = useQuery();
    const history = useHistory();

    const fetchData = async () => {
        console.log(getEndpoint(history.location.pathname))
        let res = await CourseService.getById(getEndpoint(history.location.pathname))
        console.log(res.val())
        setData(prev => ({
            ...prev,
            course: res.val()
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
            <Tabs initialValue="1">
            <Tabs.Item label="Overview" value="1">
                <Text h3>{data.course?.name}</Text>
                <Text b>{data.course?.code}</Text>
                <Text>{JsonToList(data.course?.student_enrolment).length} students</Text>
                <br/>
                <Text b> References </Text>
                {
                    JsonToList(data.course?.references).map(item => <Text>{item}</Text>)
                }
            </Tabs.Item>
            <Tabs.Item label="Score" value="2">

            </Tabs.Item>
            </Tabs>


        </div>
    )


}

export default CourseDetail;