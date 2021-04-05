import React, { useState } from 'react';
import { Button, Card, Container, Grid, Description, Spacer, Text, Table, useToasts, Modal } from '@geist-ui/react'
import { useHistory, useLocation } from 'react-router';
import { ClassService, CourseService, StudentService, UserService } from '../../../services';
import { JsonToList, parseTableData } from '../../../utils';
import { CheckInCircleFill, Plus } from '@geist-ui/react-icons';
import DynamicForm from '../../../components/DynamicForm';
import _ from 'lodash';


function Courses() {
    const [, setToast] = useToasts();
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
        let res = await CourseService.getAll();
        setData(prev => ({
            ...prev,
            courses: JsonToList(res.val())
        }))
        
    }

    React.useEffect(() => {
        fetchData()
    }, [])


    // actions --------------------------------
    const add = async (form) => {
        let res = await CourseService.add({
            ...form
        }, (err) => {
            console.log(err)
            if(err){
                setToast({
                    text:'Add new course failed!',
                    type:"error"
                })
            }
            else{
                setModals({...modal, add:false})
                fetchData()
            }
        })
    }

    const remove = async (data) => {
        let res = await CourseService.del(data.id, (err) => {
            if(err){
                setToast({
                    text:'Remove course failed!',
                    type:"error"
                })
                
            }
            else{
                fetchData()
            }
        })
            
    }

    return (
        <div >
            <Button onClick={() => setModals({...modal, add: true})} size='small' auto iconRight={<Plus/>} type="secondary"></Button>
            <br/>
            <Spacer y={1}/>
            <Grid.Container gap={2}>
            <Grid xs={24} md={16}>
                <Table onRow={(row) => {
                    setData(prev => ({...prev, selected: row}));
                }} data={parseTableData(data.courses, (action, data) => {
                    if(action == 'remove'){
                        if(window.confirm('Do you want to continue?'))
                        remove(data)
                    }
                })}>
                    <Table.Column prop="code" label="code" />
                    <Table.Column prop="name" label="name" />
                    <Table.Column  prop="operation" label="-" />
                </Table>
            </Grid>
            <Grid xs={24} md={6}>
                <Card style={{minHeight:"500px"}}>
                    <Text h5>INFORMATION</Text>
                    <Description title='Name' content={data.selected?.name} />
                    <br/>
                    <Description title='Code' content={data.selected?.code} />
                    <br/>
                    

                </Card>
            </Grid>
            </Grid.Container>
            <Modal open={modal.add} onClose={() => setModals({...modal, add: false})}>
                <DynamicForm 
                    onSumit={add}
                    fields={[
                    {
                        name: 'code',
                        placeholder: 'ID',
                        kind:"number",
                        required: true
                    },
                    {
                        name: 'name',
                        placeholder: 'name',
                        kind:"text",
                        required: true
                    },

                ]}>

                </DynamicForm>
            </Modal>
        </div>
    )


}

export default Courses;