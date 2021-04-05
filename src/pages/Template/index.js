import React from 'react';
import { Button, Card, Container, Grid, Input, Page, Spacer, Text, useToasts } from '@geist-ui/react'
import { auth, db, storage } from '../../services/firebase';
import { useHistory, useLocation } from 'react-router';


/*
    Template page
    not used on production
*/
function Template() {
    const [, setToast] = useToasts();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    return <Page>
        <Container >
            <Grid.Container justify='center' alignItems='center'>
                <Grid direction='column' md={12} xs={20} justify='center' alignItems='stretch'>
                    <Text style={{ textAlign: "center" }} h2> Student login </Text>

                    <Input width='100%'>Email</Input>
                    <Spacer y={1} />
                    <Input width='100%'>Password</Input>
                    <Spacer y={2} />
                    <Button type="secondary">Template</Button>
                </Grid>
            </Grid.Container>
        </Container>
    </Page>

}

export default Template;