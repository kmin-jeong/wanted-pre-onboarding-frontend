import React, { useRef, useState, useEffect } from "react";

export const TodoInput = ({ todoList, setTodoList }) => {
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setTodo(e.target.value);
  };

  const onClickAddButton = () => {
    const nextTodoList = todoList.concat({
      id: todoList.length,
      todo,
      isCompleted: false,
      deleted: false,
    });
    setTodoList(nextTodoList);

    setTodo("");
    inputRef.current.focus();
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickAddButton();
    }
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    <div className="todoapp__inputbox">
      <input
        type="text"
        name="todoItem"
        value={todo}
        ref={inputRef}
        placeholder="할 일을 입력해주세요"
        className="todoapp__inputbox-inp"
        onChange={onChangeInput}
        onKeyDown={handleOnKeyPress}
      />
      <button
        type="submit"
        className="todoapp__inputbox-add-btn"
        onClick={onClickAddButton}
      >
        추가
      </button>
    </div>
  );
};
