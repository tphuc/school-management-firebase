import React from 'react';
import { Button, Card, Container, Grid, Input, Page, Spacer, Text, useToasts } from '@geist-ui/react'
import { auth, db, storage } from '../../services/firebase';
import { useHistory } from 'react-router';


/*
    Template page
    not used on production
*/
function Home() {
    const history = useHistory()
    return <Page>
        <Container >
            <Grid.Container justify='center' alignItems='center'>
                <Grid direction='column' md={12} xs={20} justify='center' alignItems='stretch'>
                    <Text style={{textAlign:"center"}} h2>Sign in with</Text>
                    <Spacer y={1}/>
                    <Button onClick={() => history.push('/login?role=student')} ghost type="secondary">Student</Button>
                    <Spacer y={0.5}/>
                    <Button onClick={() => history.push('/login?role=teacher')} ghost type="secondary">Teacher</Button>
                    <Spacer y={0.5} />
                    <Button onClick={() => history.push('/login?role=admin')} type="secondary">Admin</Button>
                </Grid>
            </Grid.Container>
        </Container>
    </Page>

}

export default Home;