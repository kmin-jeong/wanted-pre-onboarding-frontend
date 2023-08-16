// inputbox,todolist,todolist에 있는 항목들 => components로 분리&이동
import React, { useState } from "react";
import { TodoInput } from "../components/todoinput";
import { TodoList } from "../components/todolist";

export const Todo = () => {
  const [todoList, setTodoList] = useState([]); //todoList 배열

  return (
    <div className="homepage__container">
      <h1>Todo List</h1>
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <TodoInput todoList={todoList} setTodoList={setTodoList} />

      {/* 할 일 Item 리스트 */}
      <TodoList
        title={"Todo"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={false}
      />

      {/* 완료한 Item 리스트 */}
      <TodoList
        title={"Done"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={true}
      />
    </div>
  );
};
