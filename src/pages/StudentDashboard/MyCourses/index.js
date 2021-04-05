import React, { useState } from 'react';
import { Button, Card, Container, Grid, Input, Page, Spacer, Text, Table, useToasts, Modal } from '@geist-ui/react'
import { useHistory, useLocation } from 'react-router';
import { ClassService } from '../../../services';
import { JsonToList, parseTableData } from '../../../utils';
import { CheckInCircleFill, Plus } from '@geist-ui/react-icons';
import DynamicForm from '../../../components/DynamicForm';


function MyCourses() {
    const [, setToast] = useToasts();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [modal, setModals] = useState({
        add: false
    })
    const [data, setData] = useState({
        classes: []
    });
    let query = useQuery();

    const fetchData = async () => {
        let res = await ClassService.getAll();
        console.log(res.val())
        setData(prev => ({
            ...prev,
            classes: JsonToList(res.val())
        }))
    }

    React.useEffect(() => {
        fetchData()
    }, [])


    // actions --------------------------------
    const add = (form) => {
        ClassService.add(form, (err) => {
            if(err){
                setToast({
                    text: 'An error occured',
                    type:"error",
                  })
            }
            else {
                fetchData()
                setModals({...modal, add:false})
            }
        });
    }

    const remove = (data) => {
        ClassService.del(data.id, (err) => {
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
            <Table data={parseTableData(data.classes, (action, data) => {
                if(action == 'remove'){
                    if(window.confirm('Do you want to continue?'))
                    remove(data)
                }
            })}>
                <Table.Column prop="name" label="name" />
                <Table.Column  prop="description" label="description" />
                <Table.Column  prop="operation" label="-" />
            </Table>
            <Modal open={modal.add} onClose={() => setModals({...modal, add: false})}>
                <DynamicForm 
                    onSumit={add}
                    fields={[
                    {
                        name: 'name',
                        placeholder: 'name',
                        kind:"text",
                        required: true
                    },
                    {
                        name: 'description',
                        placeholder: 'description',
                        kind:"text",
                        required: true
                    }
                ]}>

                </DynamicForm>
            </Modal>
        </div>
    )


}

export default MyCourses;