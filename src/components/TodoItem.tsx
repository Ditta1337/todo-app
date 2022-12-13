import React, { useEffect, useState } from "react";
import style from "../styles/modules/todoitem.module.css";
import TaskModal from "./TaskModal";
import CheckBox from "./CheckBox";
import { useDispatch } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { Todo } from "../types/todo";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { getClasses } from "../utilities/getCasses";
import { childVariant } from "./AppContent";
import { deleteTodo, editTodo } from "../slices/todoSlice";

function TodoItem({ todo }: { todo: Todo }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Set the checkbox to checked if the todo's status is completed
  useEffect(() => {
    if (todo.status === "completed") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [todo.status]);

  // Action to be dispatched
  const todoAction: Todo = {
    id: todo.id,
    title: todo.title,
    status: todo.status,
    time: todo.time,
  };

  const dispatch = useDispatch();

  // Delete todo
  const handleDelete = () => {
    dispatch(deleteTodo(todoAction));
    toast.success("Task deleted successfully!");
  };

  // Edit todo
  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  // Handle checkbox change
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    dispatch(
      editTodo({
        id: todo.id,
        title: todo.title,
        status: event.target.checked ? "completed" : "uncompleted",
        time: todo.time,
      })
    );
  };
  return (
    <>
      <motion.div className={style.todoItem} variants={childVariant}>
        <div className={style.todoDetails}>
          <CheckBox isChecked={isChecked} handleCheck={handleCheck} />
          <div className={style.texts}>
            <p
              className={getClasses([
                style.todoText,
                todo.status === "completed" ? style.todoTextCompleted : "",
              ])}
            >
              {todo.title}
            </p>
            <p className={style.time}>{new Date(todo.time).toLocaleString()}</p>
          </div>
        </div>
        <div className={style.todoActions}>
          <div
            className={style.icon}
            onClick={handleEdit}
            role="button"
            tabIndex={0}
            onKeyDown={handleEdit}
          >
            <MdEdit />
          </div>
          <div
            className={style.icon}
            onClick={handleDelete}
            role="button"
            tabIndex={0}
            onKeyDown={handleDelete}
          >
            <MdDelete />
          </div>
        </div>
      </motion.div>
      <TaskModal
        type="edit"
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
