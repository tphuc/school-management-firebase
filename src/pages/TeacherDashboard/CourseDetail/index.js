import React, { useState } from 'react';
import { Button, Card, Container, Link, Grid, Input, Tabs, Page, ButtonGroup, Spacer, Divider, Text, Table, useToasts, Modal, Textarea } from '@geist-ui/react'
import { useHistory, useLocation } from 'react-router';
import { ClassService, CourseService, StudentService } from '../../../services';
import { getEndpoint, JsonToList, parseTableData } from '../../../utils';
import { CheckInCircleFill, Edit, Plus, Trash } from '@geist-ui/react-icons';
import DynamicForm from '../../../components/DynamicForm';
import { auth } from '../../../services/firebase';


function ReferenceItem({ initialValue, item, onSave = () => {}, onDelete = () => {} }){
    const [form, setForm] = React.useState({
        content: initialValue
    });

    React.useEffect(() => {
        setForm({...form, content: initialValue})
    }, [initialValue])

    return <div>
        <Textarea value={form.content} onChange={(e) => setForm({
            ...form,
            content: e.target.value 
        })} width='100%'/>
        <br/>
        <ButtonGroup>
        <Button onClick={() => onSave(form)} style={{float:"right"}} size='mini' auto type='secondary' iconRight={<CheckInCircleFill/>}></Button>
        <Button onClick={() => onDelete(item)} style={{float:"right"}} size='mini' auto type='error' iconRight={<Trash/>}></Button>
        </ButtonGroup>
        
    </div> 
}

function CourseDetail() {
    const [, setToast] = useToasts();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [modal, setModals] = useState({
        add: false
    });

    const [form, setForm] = React.useState({
        content: ''
    })

    const [data, setData] = useState({
        course: {}
    });
    let query = useQuery();
    const history = useHistory();

    const fetchData = async () => {
        let res = await CourseService.getById(getEndpoint(history.location.pathname));
        setData(prev => ({
            ...prev,
            course: res.val()
        }))
    }

    React.useEffect(() => {
        fetchData();
    }, [])


    // actions --------------------------------
    const add = async () => {
        let res = await CourseService.addReference(getEndpoint(history.location.pathname), form, e => console.warn(e));

        fetchData();
        
    }

    const update = async (id, form) => {
        let res = await CourseService.updateReference(getEndpoint(history.location.pathname), id, form, e => console.warn(e) );
    
        await fetchData();
        
    }

    const remove = async (id) => {
        let res = await CourseService.removeReference(getEndpoint(history.location.pathname), id, e => console.warn(e) );
        
        await fetchData();
        
    }


    return (
        <div >

            <br />
            <Spacer y={1} />
            <Tabs initialValue="1">
            <Tabs.Item label="Overview" value="1">
                <Text h3>{data.course?.name}</Text>
                <Text b>{data.course?.code}</Text>
                {/* <Text>{JsonToList(data.course?.student_enrolment).length} students</Text>
                <br/>
                <Text b> References </Text>
                {
                    JsonToList(data.course?.references).map(item => <Text>{item}</Text>)
                } */}
            </Tabs.Item>
            <Tabs.Item label="References" value="2">
                <Textarea onChange={(e) => setForm({...form, content: e.target.value})}  width="100%" placeholder="Add reference..." />
                <Spacer y={0.5} />
                <Button onClick={add} auto size='small' type='secondary-light'>Add</Button>
                <Divider/>
                {
                    JsonToList(data?.course?.references).map(item => <ReferenceItem onDelete={() => remove(item.id)} onSave={(form) => {update(item.id, form)}} item={item} initialValue={item?.content} onSubmit={(value) => console.log(value)}/>)
                }
                
                
            </Tabs.Item>
            <Tabs.Item label="Score" value="3">

            </Tabs.Item>
            </Tabs>


        </div>
    )


}

export default CourseDetail;