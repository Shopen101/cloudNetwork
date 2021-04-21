import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";

export const CustomRender = ({ id, content, data, inputs, outputs }) => {
    const [timeLeft, setTimeLeft] = useState(0)
    const simular = useSelector(({ schema }) => schema.simular)

    useEffect(() => {
        let timer;
        if (simular) {
            timer = setTimeout(() => {
                setTimeLeft(Math.floor(Math.random() * Math.floor(2)));
            }, 1000);
        } else {
            setTimeLeft(0);
        }
        // return () => clearTimeout(timer);
    });

    const styleBlock = () => {
        let color = "rgba(255,0,0,0.1)";
        if (timeLeft) color = "rgba(0,255,0,0.1)";
        if (!simular) color = "white";
        return {
            background: color,
            borderRadius: 10,
            borderStyle: "solid",
            borderColor: "gray",
            borderWidth: 2,
            transition: "width 2s",
        };
    };

    return (
        <div style={styleBlock()}>
            <div
                style={{
                    paddingLeft: "15px",
                    display: "flex",
                    justifyContent: "space-around",
                    transition: "width 2s",
                }}
            >
                <img src={data.img} alt="alt" width="50" height="50"></img>
                <IconButton aria-label="delete" onClick={() => data.onClick(id)}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <div role="button" style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                <div>{`${content} | ${timeLeft}`}</div>
            </div>
            <div
                style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    transition: "width 2s",
                }}
            >
                {inputs.map((port) =>
                    React.cloneElement(port, {
                        style: {
                            transition: "width 2s",
                            width: "25px",
                            height: "25px",
                            borderRadius: 4,
                            borderStyle: "solid",
                            borderColor: "gray",
                            borderWidth: 2,
                        },
                    })
                )}
                {outputs.map((port) =>
                    React.cloneElement(port, {
                        style: {
                            transition: "width 2s",
                            width: "25px",
                            height: "25px",
                            borderRadius: 4,
                            borderStyle: "solid",
                            borderColor: "gray",
                            borderWidth: 2,
                        },
                    })
                )}
            </div>
        </div>
    );
};
