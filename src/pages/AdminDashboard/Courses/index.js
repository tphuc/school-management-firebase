import React, { useState } from 'react';
import { Button, Card, Container, Select, Grid, Description, Spacer, Text, Table, useToasts, Modal } from '@geist-ui/react'
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

    const [form, setForm] = useState({
        students: []
    })

    const [data, setData] = useState({
        selected:null,
        courses: [],
        students: []
    });
    let query = useQuery();

    const fetchData = async () => {
        let res = await CourseService.getAll();
        setData(prev => ({
            ...prev,
            courses: JsonToList(res.val())
        }))

    }

    const fetchStudents = async () => {
        let res = await StudentService.getAll();
        setData(prev => ({
            ...prev,
            students: JsonToList(res.val())
        }))
    }



    React.useEffect(() => {
        fetchData();
        fetchStudents();
    }, [])


    // actions --------------------------------
    const add = async (form) => {
        let res = await CourseService.add({
            ...form
        }, (err) => {
            console.log(err)
            if (err) {
                setToast({
                    text: 'Add new course failed!',
                    type: "error"
                })
            }
            else {
                setModals({ ...modal, add: false })
                fetchData()
            }
        })
    }

    const remove = async (data) => {
        let res = await CourseService.del(data.id, (err) => {
            if (err) {
                setToast({
                    text: 'Remove course failed!',
                    type: "error"
                })

            }
            else {
                fetchData()
            }
        })
    }

    // ----- Course Info -----
    const addStudents = async () => {
        let students = [...form.students];
        const res = await Promise.all(students.map(async (student) => {
            let courseRes = await CourseService.addStudent(data?.selected?.id, student?.id, student, err => {
                if(err){
                    return;
                }
                else{
                    let { operation, ...others} = data.selected;
                    // console.log(student.id, data?.selected?.id, data?.selected);
                    StudentService.addEnrolCourse(student.id, data?.selected?.id, others,  err => console.log(err?.message))
                }
            })
           

        }))
        fetchData();
        setForm({
            students: []
        })
    }

    return (
        <div >
            <Button onClick={() => setModals({ ...modal, add: true })} size='small' auto iconRight={<Plus />} type="secondary"></Button>
            <br />
            <Spacer y={1} />
            <Grid.Container gap={2}>
                <Grid xs={24} md={12}>
                    <Table onRow={(row) => {
                        console.log(row)
                        setData(prev => ({ ...prev, selected: row }));
                    }} data={parseTableData(data.courses, (action, data) => {
                        if (action == 'remove') {
                            if (window.confirm('Do you want to continue?'))
                                remove(data)
                        }
                    })}>
                        <Table.Column prop="code" label="code" />
                        <Table.Column prop="name" label="name" />
                        <Table.Column prop="operation" label="-" />
                    </Table>
                </Grid>
                <Grid xs={24} md={12}>
                    <Card style={{ minHeight: "500px" }}>
                        <Text h5>INFORMATION</Text>
                        <Description title='Name' content={data.selected?.name} />
                        <br />
                        <Description title='Code' content={data.selected?.code} />
                        <br />
                        <span>Students</span>
                        <div style={{display:"flex", justifyContent:"space-between", flexDirection:"row"}}>
                        <Select multiple clearable width='100%' size='small'  placeholder={'Add students'}
                        value={form.students}
                        onChange={(val) => setForm({
                            students: val
                        })}
                        >
                            {data?.students?.map((item, id) => <Select.Option key={id} value={item}>{item.code} - {item.name} </Select.Option>)}
                        </Select>
                        <Button disabled={!data?.selected} onClick={addStudents} type='secondary-light' iconRight={<Plus/>} auto style={{float:"right", marginLeft:5}}>Add</Button>
                        </div>
                        <Spacer y={0.4} />
                        <Table data={parseTableData(JsonToList(data?.selected?.student_enrolment), (action, data) => {
                            if (action == 'remove') {

                        }})} onRow={(row) => { }}>
                            <Table.Column prop="code" label="code" />
                            <Table.Column prop="name" label="name" />
                            <Table.Column prop="operation" label="-" />
                        </Table>


                    </Card>
                </Grid>
            </Grid.Container>
            <Modal open={modal.add} onClose={() => setModals({ ...modal, add: false })}>
                <DynamicForm
                    onSumit={add}
                    fields={[
                        {
                            name: 'code',
                            placeholder: 'ID',
                            kind: "number",
                            required: true
                        },
                        {
                            name: 'name',
                            placeholder: 'name',
                            kind: "text",
                            required: true
                        },

                    ]}>

                </DynamicForm>
            </Modal>
        </div>
    )


}

export default Courses;