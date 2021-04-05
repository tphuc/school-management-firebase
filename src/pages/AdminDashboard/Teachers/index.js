import React, { useState } from 'react';
import { Button, Card, Container, Grid, Badge, Input, Page, Description, Spacer, Text, Table, useToasts, Modal } from '@geist-ui/react'
import { useHistory, useLocation } from 'react-router';
import { ClassService, StudentService, TeacherService, UserService } from '../../../services';
import { JsonToList, parseTableData } from '../../../utils';
import { CheckInCircleFill, Plus } from '@geist-ui/react-icons';
import DynamicForm from '../../../components/DynamicForm';
import _ from 'lodash';
import { DEFAULT_PASSWORD } from '../../../configs';


function Teachers() {
    const [, setToast] = useToasts();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [modal, setModals] = useState({
        add: false
    })
    const [data, setData] = useState({
        teachers: [],
        json_classes: {},
        json_students: {},
        classes: [],
        selected: null,
    });

    let query = useQuery();

    const fetchData = async () => {
        let res = await TeacherService.getAll();

        let res2 = await ClassService.getAll();
        setData(prev => ({
            ...prev,
            json_teachers: res.val(),
            json_classes: res2.val(), 
            teachers: JsonToList(res.val()),
            classes: JsonToList(res2.val())
        }))
    }

    React.useEffect(() => {
        fetchData()
    }, [])


    // actions --------------------------------
    const add = async (form) => {
        let res = await UserService.add(form.email, DEFAULT_PASSWORD).catch(err => {
            setToast({
                text: err?.message,
                type:"error",
              })
        });
        if(res?.user){
            TeacherService.add({
                user_id: res.user.uid,
                phone_number: res.user.phoneNumber,
                email: res.user.email,
                name: form.name,
                code: form.code,
            }, (err) => {
                if(err){
                    setToast({
                        text: 'An error occured',
                        type:"error",
                      })
                }
                else {
                    setModals({...modal, add: false})
                    fetchData()
                }
            })
        }

    
    }

    const remove = (data) => {
        TeacherService.del(data.id, (err) => {
            if(err){
                setToast({
                    text: 'An error occured',
                    type:"error",
                  })
            }
            else {
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
                }} data={parseTableData(data.teachers, (action, data) => {
                    if(action == 'remove'){
                        if(window.confirm('Do you want to continue?'))
                        remove(data)
                    }
                })}>
                    <Table.Column prop="code" label="code" />
                    <Table.Column prop="name" label="name" />
                    <Table.Column prop="email" label="email" />
                    <Table.Column  prop="operation" label="-" />
                </Table>
            </Grid>
            <Grid xs={24} md={8}>
                <Card style={{minHeight:"500px"}}>
                    <Text h5>INFORMATION</Text>
                    <Description title='Name' content={data?.selected?.name} />
                    <Spacer y={1}/>
                    <Description title='Email' content={data?.selected?.email} />
                    <Spacer y={1}/>
                    <Description title='ID' content={data?.selected?.code} />
                    <Spacer y={1}/>
                    {/* <Description title='Class' content={_.get(data?.json_classes[_.get(data?.selected, 'class')], 'name')} /> */}
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
                    {
                        name: 'email',
                        placeholder: 'email',
                        kind:"text",
                        required: true
                    },
                    // {
                    //     name: 'password',
                    //     placeholder: 'password',
                    //     kind:"text",
                    //     required: true,
                    //     additions: {
                    //         type:"password"
                    //     }
                    // },
                ]}>

                </DynamicForm>
            </Modal>
        </div>
    )


}

export default Teachers;