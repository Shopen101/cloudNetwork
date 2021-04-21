import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";

import { DangerBtn, SnackBarSuccess, SnackBar } from '../components'
import { SimpleDialog } from '../components/SimpleDialog'
import { CustomRender } from '../components/CustomRender'
import SaveIcon from "@material-ui/icons/Save"
import CloseIcon from "@material-ui/icons/Close"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button"
import { useSnackbar } from 'notistack'

import { api } from '../config/index'

import clientImg from "../assets/client.svg";
import cloudImg from "../assets/cloud.svg";
import routerImg from "../assets/router.svg";
import serverImg from "../assets/server.svg";
import switchImg from "../assets/switch.png";

import {
    fetchSchema,
    saveSchema,
    setSchema,
    setIsAuth,
    updateUser,
    setSimular,
} from "../redux/action";


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

const Chart = React.memo(function Chart() {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const history = useHistory()
    const classes = useStyles()

    const isAuth = useSelector(({ user }) => user.isAuthenticated)
    const logout = useSelector(({ user }) => user.logout)
    const simular = useSelector(({ schema }) => schema.simular)
    const initialSchema = useSelector(({ schema }) => schema)
    const { firstName, lastname, userId } = useSelector(({ user }) => user)
    const [open, setOpen] = useState(false);

    // выбранная схема, её название.
    const [selectedValue, setSelectedValue] = useState(
        localStorage.getItem('selectItem')
    );

    const exit = () => {
        logout()
        history.push('/')
    }

    const getNewSchema = ({ nodes, links }) => {
        if (!nodes) {
            return;
        }
        const newNodes = nodes.map((node) => {
            return {
                ...node,
                render: CustomRender,
            };
        });

        return {
            nodes: newNodes,
            links,
        };
    };

    const deleteNodeFromSchema = (id) => {
        const nodeToRemove = schema.nodes.find((node) => node.id === id);
        removeNode(nodeToRemove);
    };

    const addDeleteForSchema = ({ nodes, links }) => {
        if (!nodes) {
            return;
        }

        const newNodes = nodes.map((node) => {
            return {
                ...node,
                render: CustomRender,
                data: {
                    ...node.data,
                    onClick: deleteNodeFromSchema,
                },
            };
        });

        return {
            nodes: newNodes,
            links,
        };
    };


    const newSchema = createSchema(getNewSchema(initialSchema));

    let formatSchema = addDeleteForSchema(newSchema);

    if (formatSchema.nodes.length == 0) {
        formatSchema = { nodes: [], links: [] };
    }

    const [schema, { onChange, addNode, removeNode }] = useSchema(formatSchema)

    useEffect(() => {
        dispatch(setSchema(JSON.parse(JSON.stringify(schema))));
    }, [schema]);

    useEffect(() => {
        schema.links = formatSchema.links;
        schema.nodes = formatSchema.nodes;
    }, [formatSchema]);


    const addNewNode = ({ name, inputs, img }) => {
        const arr = [];
        for (let i = 0; i < inputs; ++i) {
            arr.push({
                id: `${name}port-${Math.random() + new Date().getTime().toString()}`,
            });
        }

        const nextNode = {
            id: `name-${Math.random()}`,
            content: `${name} ${schema.nodes.length + 1}`,
            coordinates: [50, 50],
            render: CustomRender,
            data: { onClick: deleteNodeFromSchema, img },
            inputs: arr,
            outputs: [
                {
                    id: `${name}port-${Math.random() + new Date().getTime().toString()}`,
                },
            ],
        };

        addNode(nextNode);
    };


    const models = [
        {
            name: "коммутатор",
            inputs: 4,
            img: switchImg,
        },
        {
            name: "интернет",
            inputs: 1,
            img: cloudImg,
        },
        {
            name: "сервер",
            inputs: 3,
            img: serverImg,
        },
        {
            name: "ПК",
            inputs: 1,
            img: clientImg,
        },
        {
            name: "маршрутизатор",
            inputs: 2,
            img: routerImg,
        },
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    localStorage.setItem('selectItem', selectedValue)


    const saveAllSchemaInDB = async () => {
        try {
            initialSchema.nodes.length === 0 ? enqueueSnackbar('Нельзя сохранить пустую схему!', { variant: 'error' }) :
                await api.post('/schema/saveSchemaInDB', { schemaName: selectedValue, schema: schema, userId })
                    .then(response => enqueueSnackbar(response.data.message, { variant: 'success' }))
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: 'error' })
            console.log(`error from save schema - ${error.response.data.message}`)
        }
    }

    const handleRoutingClick = () => {
        (initialSchema.nodes.length === 0 || initialSchema.links.length === 0)
            ? enqueueSnackbar('Нельзя запустить маршрутизацию без устройств или связей!', { variant: 'error' })
            : dispatch(setSimular(!simular))
    }

    // default below
    return (
        <div style={{ height: "100vh", width: "100wh" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                    <Button color="primary" icon="plus" onClick={handleClickOpen}>
                        {`${selectedValue}`}
                    </Button>
                </div>
                <SimpleDialog
                    onClose={handleClose}
                    selectedValue={selectedValue}
                    open={open}
                />
                <div>
                    {models.map((model, key) => (
                        <Button
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => addNewNode(model)}
                            key={`${key}__` + Math.random()}
                        >
                            {model.name}
                        </Button>
                    ))}
                </div>
                <div>
                    <Button
                        color="primary"
                        icon="plus"
                        startIcon={<SaveIcon />}
                        onClick={saveAllSchemaInDB}
                    >
                        Сохранить
                    </Button>
                    <Button
                        style={{ width: '170px' }}
                        color="primary"
                        icon="plus"
                        startIcon={simular ? <PauseIcon /> : <PlayArrowIcon />}
                        onClick={handleRoutingClick}
                    >
                        {!simular ? "Маршрутизация" : "Остановить"}
                    </Button>
                    <Button
                        color="primary"
                        icon="plus"
                        startIcon={<CloseIcon />}
                        onClick={exit}
                    >
                        Выход
                    </Button>
                </div>
            </div>
            <Diagram schema={formatSchema} onChange={onChange} />
        </div>
    )
})

export default Chart
