import React, { useState } from 'react';
import { Button, Card, Container, Grid, Description, Spacer, Text, Table, useToasts, Modal } from '@geist-ui/react'
import { useHistory, useLocation } from 'react-router';
import { ClassService, StudentService, UserService } from '../../../services';
import { JsonToList, parseTableData } from '../../../utils';
import { CheckInCircleFill, Plus } from '@geist-ui/react-icons';
import DynamicForm from '../../../components/DynamicForm';
import _ from 'lodash';

/*
this is template component 
do nnot use this on production
*/

function Template() {
    const [, setToast] = useToasts();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [modal, setModals] = useState({
        add: false
    })
    const [data, setData] = useState({

    });
    let query = useQuery();

    const fetchData = async () => {
        
    }

    React.useEffect(() => {
        fetchData()
    }, [])


    // actions --------------------------------
    const add = async (form) => {
        

    
    }

    const remove = (data) => {

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
                }} data={parseTableData([], (action, data) => {
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
            <Grid xs={24} md={6}>
                <Card style={{minHeight:"500px"}}>
                    <Text h5>INFORMATION</Text>

                    <Description title='Name' content={''} />
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
                    {
                        name: 'password',
                        placeholder: 'password',
                        kind:"text",
                        required: true,
                        additions: {
                            type:"password"
                        }
                    },
                    {
                        name: 'class_name',
                        placeholder: 'class_name',
                        kind:"select",
                        options: data.classes || [],
                        getValue: (item) => item.id,
                        getLabel: (item) => item.name,
                        required: true
                    }
                ]}>

                </DynamicForm>
            </Modal>
        </div>
    )


}

export default Template;