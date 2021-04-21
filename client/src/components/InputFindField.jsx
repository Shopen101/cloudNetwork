import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function InputFindField({ width, onChange, value }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: width,
            },
        },
    }))

    const classes = useStyles()

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Введите текст запроса" onChange={onChange} value={value} />
        </form>
    );
}


export default InputFindField