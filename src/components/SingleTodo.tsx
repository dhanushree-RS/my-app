import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { MdEdit, MdDelete, MdOutlineDoneAll } from "react-icons/md";
import './styles.css';
import { Draggable } from '@hello-pangea/dnd';

type Props = {
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    index: number
}

const SingleTodo = ({ todo, setTodos, todos, index }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)



    const handleDone = (id: number) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        ));
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((t) => t.id !== id));
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        )
        setEdit(false)
    }
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])





    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form className='todos_single' onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {edit ? (
                            <input value={editTodo}
                                ref={inputRef}
                                onChange={(e) => setEditTodo(e.target.value)}
                                className='todo_single_text' />

                        ) :
                            todo.isDone ? (
                                <s className="todos_single_text">{todo.todo}</s>
                            ) : (
                                <span className="todos_single_text"> {todo.todo} </span>
                            )}

                        <div>
                            <span className="icon" onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit)
                                }
                            }}>
                                <MdEdit />
                            </span>
                            <span className="icon" onClick={() => handleDelete(todo.id)}>
                                <MdDelete />
                            </span>
                            <span className="icon" onClick={() => handleDone(todo.id)}>
                                <MdOutlineDoneAll />
                            </span>
                        </div>

                    </form>

                )
            }


        </Draggable>


    )
}

export default SingleTodo