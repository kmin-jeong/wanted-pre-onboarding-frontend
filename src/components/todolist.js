import React from "react";
import { TodoItem } from "./todoitem";

export const TodoList = ({ title, todoList, setTodoList, checkedList }) => (
  <div className="todoapp__list">
    <p className="todoapp__list-tit">{title}</p>

    <ul className="todoapp__list-ul">
      {todoList &&
        todoList.map((todoItem) => {
          if (todoItem.deleted) return null;

          if (checkedList !== todoItem.isCompleted) return null;

          return (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          );
        })}
    </ul>
  </div>
);
