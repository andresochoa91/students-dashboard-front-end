import React, { useState, useEffect } from "react";
import { Card, Typography, Checkbox } from "antd";
import { CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";

const Todo = ({ todo, completeTodo }) => {
    const boxesStyle = {
        marginRight: 5,
        color: "#0275D8",
        border: "none",
        paddingLeft: 8,
    };
    return (
        <div style={{ textDecoration: todo.Status ? "line-through" : "" }}>
            <div>
                <Checkbox
                    checked={todo.fields.Status ? true : null}
                    onChange={() => completeTodo(todo.id, !todo.fields.Status)}
                />
                {todo.fields.ToDo}
            </div>
        </div>
    );
};

const ToDoList = () => {
    const getToDoData = async () => {
        const response = await fetch(
            process.env.REACT_APP_GET_TODO_LIST
        );
        const todoData = await response.json();
        return todoData;
    };
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getToDoData().then((data) => setTodos(data.records));
    }, []);

    const completeTodo = (id, status) => {
        fetch(process.env.REACT_APP_UPDATE_TODO_LIST, {
            body: JSON.stringify({
                records: [
                    {
                        id: id,
                        fields: {
                            Status: status,
                        },
                    },
                ],
            }),
            headers: {
                Authorization: "Bearer keyclOytaXo7NHQ8M",
                "Content-Type": "application/json",
            },
            method: "PATCH",
        })
            .then(() => {
                getToDoData().then((data) => setTodos(data.records));
            })
            .catch((e) => {
                console.log(e);
                alert("Unable to update to do ");
            });
    };

    return (
        <>
            <Card
                className="shadow center"
                style={{
                    width: 295,
                    padding: 0,
                    border: "1px solid #D3D3D3",
                    borderRadius: 6,
                    background: "#F1F1F2",
                }}
            >
                <Typography.Title level={4}>To Do</Typography.Title>
                {todos &&
                    todos.map((todo, index) => (
                        <Todo
                            key={index}
                            id={todo.id}
                            todo={todo}
                            completeTodo={completeTodo}
                        />
                    ))}
                <br></br>
            </Card>
        </>
    );
};
export default ToDoList;