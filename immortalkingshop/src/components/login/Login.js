import React, { useState } from 'react';
import { TextField, Paper, Grid, Button, FormLabel } from '@mui/material';
import { useLoginUserMutation } from '../../features/user/userSlice';


function Login(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ helperText, setHelperText ] = useState('');
    const [ error, setError ] = useState(false);
    const [ authUser, result ] = useLoginUserMutation();

    const submit = (e) => {
        let user = {
            email,
            password,
        }
        
        authUser(user).unwrap().then((data) => {
            if (data.loggedIn){
                console.log('success!');
                setHelperText('');
                setError(false);
            }
        }).catch((err) => {
            console.log(err);
            setHelperText('Неверный логин или пароль!');
            setError(true);
        });
    }

    return (
        <>
        <Paper variant='elevation' sx={{
            px: 15,
            py: 10,
        }}>
            <Grid container justify='center' direction='column'>
                <FormLabel>Login</FormLabel>
                <Grid item>
                    <TextField id='email' label='E-mail' defaultValue={email} fullWidth type='email' variant='filled' color='primary' margin='normal' onChange={(e) => setEmail(e.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField id='password' label='Password' defaultValue={password} fullWidth type='password' variant='filled' color='primary' margin='normal' helperText={helperText} onChange={(e) => setPassword(e.target.value)} error={error}/>
                </Grid>
                <Button variant='contained' color='primary' type='submit' onClick={(e) => submit(e)}>
                    Login
                </Button>
            </Grid>
        </Paper>
        </>
    )
}


export default Login;