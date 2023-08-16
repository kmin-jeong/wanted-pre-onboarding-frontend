import React, { useState, useEffect, useRef } from "react";

export const TodoItem = ({ todoItem, todoList, setTodoList }) => {
  const [edited, setEdited] = useState(false); //수정모드 플래그 값
  const [newTodo, setNewTodo] = useState(todoItem.todo); //새로운 아이템 내용

  const editInputRef = useRef(null);

  useEffect(() => {
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onChangeCheckbox = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      isCompleted:
        item.id === todoItem.id ? !item.isCompleted : item.isCompleted,
    }));
    setTodoList(nextTodoList);
  };

  const onClickEditButton = () => {
    setEdited(true);
  };
  const onClickCancelButton = () => {
    setEdited(false);
    setNewTodo(todoList.item.todo);
  };

  const onChangeEditInput = (e) => {
    setNewTodo(e.target.value);
  };

  const onClickSubmitButton = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      todo: item.id === todoItem.id ? newTodo : item.todo,
    }));
    setTodoList(nextTodoList);
    setEdited(false);
  };

  const onClickDeleteButton = () => {
    if (window.confirm("Delete it?")) {
      const nextTodoList = todoList.map((item) => ({
        ...item,
        deleted: item.id === todoItem.id ? true : item.deleted,
      }));
      setTodoList(nextTodoList);
    }
  };

  return (
    <li className="todoapp__item">
      <input
        type="checkbox"
        className="todoapp__item-checkbox"
        checked={todoItem.isCompleted}
        onChange={onChangeCheckbox}
      />

      {edited ? (
        <input
          type="text"
          className="todoapp__item-edit-input"
          value={newTodo}
          ref={editInputRef}
          onChange={onChangeEditInput}
        />
      ) : (
        <span
          className={`todoapp__item-ctx ${
            todoItem.isCompleted ? "todoapp__item-ctx-checked" : ""
          }`}
        >
          {todoItem.todo}
        </span>
      )}

      {!todoItem.isCompleted ? (
        edited ? (
          <>
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickSubmitButton}
            >
              Save
            </button>
            <button
              type="button"
              className="todoapp__item-cancel-btn"
              onClick={onClickCancelButton}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickEditButton}
            >
              Edit
            </button>
            <button
              type="button"
              className="todoapp__item-delete-btn"
              onClick={onClickDeleteButton}
            >
              Delete
            </button>
          </>
        )
      ) : null}
    </li>
  );
};
