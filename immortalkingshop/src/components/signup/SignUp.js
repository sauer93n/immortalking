import React, { useEffect, useState } from 'react';
import { TextField, Paper, Grid, Button, FormLabel } from '@mui/material';
import { useRegisterUserMutation } from '../../features/user/userSlice';


function SignUp(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ helperText, setHelperText ] = useState('');
    const [ error, setError ] = useState(false);
    const [ registerUser, result ] = useRegisterUserMutation();
    
    useEffect(() => {
        if (password !== repeatPassword){
            setHelperText('Passwords does not match!');
            setError(true);
        }
        else{
            setHelperText('');
            setError(false);
        }
    })

    const submit = (e) => {
        let user = {
            email,
            password,
        }

        
        registerUser(user);
    }

    return (
        <>
        <Paper variant='elevation' sx={{
            px: 15,
            py: 10,
        }}>
            <Grid container justify='center' direction='column'>
                <FormLabel>SignUp</FormLabel>
                <Grid item>
                    <TextField id='email' label='E-mail' defaultValue={email} fullWidth type='email' variant='filled' color='primary' margin='normal' onChange={(e) => setEmail(e.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField id='password' label='Password' defaultValue={password} fullWidth type='password' variant='filled' color='primary' margin='normal' helperText={helperText} onChange={(e) => setPassword(e.target.value)} error={error}/>
                </Grid>
                <Grid item>
                    <TextField id='repeatPassword' defaultValue={repeatPassword} label='Repeat password' fullWidth type='password' variant='filled' color='primary' margin='normal' helperText={helperText} onChange={(e) => setRepeatPassword(e.target.value)} error={error}/>
                </Grid>
                <Button variant='contained' color='primary' type='submit' onClick={(e) => submit(e)}>
                    Submit
                </Button>
            </Grid>
        </Paper>
        </>
    )
}


export default SignUp;