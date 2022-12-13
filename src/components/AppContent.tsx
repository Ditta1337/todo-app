import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";
import style from "../styles/modules/app.module.css";

// Animation variants
const containerVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
};
export const childVariant = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  // Get the todo list from the store
  const todoList = useSelector<any, Todo[]>((state) => state.todo.todoList);
  // Sort the todo list by time (ascending)
  const sortedTodoList = [...todoList].sort((a, b) => {
    return new Date(a.time).getTime() - new Date(b.time).getTime();
  });
  // Get the filter status from the store
  const filterStatus = useSelector<any, string>(
    (state) => state.todo.filterStatus
  );
  // Filter the todo list based on the filter status (first sort, then filter)
  const filteredTodoList = sortedTodoList.filter((todo) => {
    if (filterStatus === "all") {
      return true;
    }
    return todo.status === filterStatus;
  });

  return (
    <motion.div
      className={style.contentWrapper}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <motion.p className={style.emptyText} variants={childVariant}>
            No tasks found.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
