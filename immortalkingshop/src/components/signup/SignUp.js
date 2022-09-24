import React from 'react';
import {TextField, FormGroup, OutlinedInput, Paper, Grid, Button, FormLabel} from '@mui/material';
import { Box } from '@mui/system';


class SignUp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            "repeat-password": "",
            helperText: "",
            error: false,
        };
    }

    handleChange(e){
        if (e.target.id === "password" || e.target.id === "repeat-password"){
            console.log(this.state.password);
            console.log(this.state["repeat-password"]);

            if (this.state.password !== this.state["repeat-password"]){
                this.setState({
                    helperText: "Passwords does not match",
                    error: true,
                })
            }
            else {
                this.setState({
                    helperText: "",
                    error: false,
                })
            }
        }

        
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    render() {
        return (
            <>
            <Paper variant="elevation" sx={{
                px: 15,
                py: 10,
            }}>
                <Grid container justify="center" direction="column">
                    <FormLabel>SignUp</FormLabel>
                    <Grid item>
                        <TextField id="email" label="E-mail" fullWidth type="email" variant="filled" color="primary" margin='normal' onChange={(e) => this.handleChange(e)}/>
                    </Grid>
                    <Grid item>
                        <TextField id="password" label="Password" defaultValue={this.state.password} fullWidth type="password" variant="filled" color="primary" margin='normal' helperText={this.state.helperText} onChange={(e) => this.handleChange(e)} error={this.state.error}/>
                    </Grid>
                    <Grid item>
                        <TextField id="repeat-password" defaultValue={this.state["repeat-password"]} label="Repeat password" fullWidth type="password" variant="filled" color="primary" margin='normal' helperText={this.state.helperText} onChange={(e) => this.handleChange(e)} error={this.state.error}/>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Paper>
            </>
        )
    }
}


export default SignUp;