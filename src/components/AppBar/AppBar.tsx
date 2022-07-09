import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {NewTitle} from "../ToDoList/NewTitle/NewTitle";
import style from './AppBar.module.css'
import Container from "@mui/material/Container/Container";
import {Grid} from "@mui/material";

type ButtonAppBarPropsType = {
    newTitleCallBack: (title: string) => void
}

export default function ButtonAppBar(props: ButtonAppBarPropsType) {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Container fixed>
                            <Grid container spacing={2}>
                                <Grid item>
                                    New ToDoList
                                </Grid>
                                <Grid item>
                                    <NewTitle
                                        newTitleCallBack={props.newTitleCallBack}
                                        classNameInput={style.input}
                                        classNameButton={style.button}
                                        colorButton={"success"}
                                    />
                                </Grid>


                            </Grid>
                        </Container>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}