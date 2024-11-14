
import React, { useState } from 'react';
import './App.css';
import { InputField } from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
// import { Carlist } from './components/Carlist';
// import { Greet } from './components/Greet';
// import { Person, Person } from './components/Person';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);  //created a type of an array
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    let add,
      active = todos,
      complete = completedTodos;
    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1)
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1)
    }
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>TaskLY</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos} />
        {/* {todos.map((to)=>(
        <li>{to.todo}</li>
      ))} */}
      </div>

    </DragDropContext>

  );
}

export default App;
