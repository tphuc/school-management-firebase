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
        console.log(auth?.currentUser?.uid)
        setData(prev => ({
            ...prev,
            course: res.val(),
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
                <Text>{JsonToList(data.course?.student_enrolment)?.length} students</Text>
                <br/>
                <Text b> References </Text>
                {
                    JsonToList(data.course?.references).map(item => <>
                    <Text>{item?.content}</Text>
                    <br/>
                    </>)
                }
            </Tabs.Item>
            <Tabs.Item label="Students" value="students">
                <Text b>Students</Text>
                {
                    JsonToList(data.course?.student_enrolment).map(item => <>
                    <Text>{item?.code} {item?.name}</Text>
                    {/* <br/> */}
                    </>)
                }
                <hr/>
                <Text b>Lecturer</Text>
                {
                     JsonToList(data.course?.lecturers).map(item => <>
                        <Text>{item?.code} {item?.name}</Text>
                        {/* <br/> */}
                        </>)
                }
            </Tabs.Item>
            <Tabs.Item label="Score" value="2">
                <Text size="2em">{data.course?.student_enrolment?.[auth.currentUser.uid]?.score}</Text>
            </Tabs.Item>
            </Tabs>


        </div>
    )


}

export default CourseDetail;