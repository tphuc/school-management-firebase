import React from 'react';
import { Button, Card, Container, Grid, Input, Page, Spacer, Text, useToasts } from '@geist-ui/react'
import { auth, db, storage, admin } from '../../services/firebase';
import { useHistory, useLocation } from 'react-router';
import TokenService from '../../services/token';

function Login() {
    const history = useHistory();
    const[_, toast] = useToasts()
    const [form, setForm] = React.useState({
        email:"",
        password:""
    })

    const [loading, setLoading] = React.useState(false);


    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();

    const onFieldChange = (e, field) => {
        setForm(prev => ({
            ...prev,
            [field]: e.target.value
        }))
    }

    const login = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        let res = await auth.signInWithEmailAndPassword(form.email, form.password).catch(err => {
            toast({
                text: err.message,
                type:'error'
            })
            setLoading(false);
        })
        console.log(35, JSON.stringify(res))

        if(res){
            let role = query.get('role')
            
           
            
            switch(role){
                case 'student':
                    TokenService.setAcessToken(res?.user?.refreshToken);
                    history.push(`/${role}-dashboard`)
                    break;
                case 'teacher':
                    TokenService.setAcessToken(res?.user?.refreshToken);
                    history.push(`/${role}-dashboard`)
                    break;
                case 'admin':
                    let user = await db.ref().child('admins').child(res.user.uid).get()
                    if(user.exists()){
                        if(user.val().role == 'admin'){
                            TokenService.setAcessToken(res?.user?.refreshToken);
                            history.push(`/${role}-dashboard`)
                        }
                    }
                    
                    break
            }
            setLoading(false);
        }
        setLoading(false);
    }

    

    
    return <Page>
        <Container >
            <Grid.Container justify='center' alignItems='center'>
                <Grid direction='column' md={12} xs={20} justify='center' alignItems='stretch'>
                    <Text style={{ textAlign: "center" }} h2> {query.get('role')} login </Text>
                    <form onSubmit={login}>
                    <Input value={form.email} onChange={(e) => onFieldChange(e, 'email')} type='email' name='email' width='100%'>Email</Input>
                    <Spacer y={1} />
                    <Input type='password'  onChange={(e) => onFieldChange(e, 'password')}  type='password' width='100%'>Password</Input>
                    <Spacer y={2} />
                    <Button loading={loading} style={{width:"100%"}} htmlType='submit' type="secondary">Login</Button>
                    </form>
                </Grid>
            </Grid.Container>
        </Container>
    </Page>

}

export default Login;