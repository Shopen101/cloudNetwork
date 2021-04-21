import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import TextField from "@material-ui/core/TextField"

import { useSnackbar } from 'notistack'

import { api } from '../config/index'

import {
    loadSelectedSchema,
    setAllSchemes,
    clearCurrentSchema
} from "../redux/action"

export const SimpleDialog = React.memo(function SimpleDialog({ onClose, selectedValue, open }) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const allUserSchemes = useSelector(({ allUserSchemes }) => allUserSchemes.schemesArr)

    React.useEffect(() => {
        open && getAllUsersSchemas()
    }, [open])

    const getAllUsersSchemas = async () => {
        try {
            await api.get(`/schema/getSchema/getAllUsersSchemes/${user.userId}`)
                .then(response => dispatch(setAllSchemes(response.data.message)))
        } catch (error) {
            console.log(`error from view all user's schemas ${error}`)
        }
    }

    const user = useSelector(({ user }) => user)

    const handleClose = () => {
        onClose(selectedValue)
    }

    // сменить схему
    const handleListItemClick = async (schemaId, schemaName) => {
        try {
            await api.post('/schema/getSchema/getSchemaFromName', { schemaId, userId: user.userId })
                .then(response => dispatch(loadSelectedSchema(response.data.message)))
            localStorage.setItem('selectItem', selectedValue)
            onClose(schemaName)
        } catch (error) {
            console.log(`error from open user schema ${error}`)
        }
    }

    const changeSchema = (schemaName) => {
        if (schemaName === '') {
            enqueueSnackbar('Имя должно обязательно содержать хотя бы один символ!', { variant: 'warning' })
        } else {
            const candidate = allUserSchemes.find(schema => schema.name === schemaName)
            if (candidate) {
                enqueueSnackbar('Схема с таким именем уже существует!', { variant: 'warning' })
            } else {
                onClose(schemaName)
                setNameOfNewSchema('')
                dispatch(clearCurrentSchema())
            }
        }
    }

    const [nameOfNewSchema, setNameOfNewSchema] = useState('')

    const schemesArray = allUserSchemes?.map((schema) => (
        <ListItem
            button
            onClick={() => handleListItemClick(schema._id, schema.name)}
            key={schema._id}
        >
            <ListItemText primary={schema.name} />
        </ListItem>
    ))

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title" style={{ width: '500px', textAlign: 'center' }}>{`${user.firstName} ${user.lastname}`}</DialogTitle>
            <List style={{ textAlign: 'center' }}>
                {schemesArray}
                <TextField
                    label="Название"
                    value={nameOfNewSchema}
                    onInput={(e) => setNameOfNewSchema(e.target.value)}
                    variant="filled"
                    style={{ width: '100%' }}
                />
                <ListItem autoFocus button onClick={() => changeSchema(nameOfNewSchema)}>
                    <ListItemText primary="Создать новую схему" style={{ textAlign: 'center' }} />
                </ListItem>
            </List>
        </Dialog>
    )
})
