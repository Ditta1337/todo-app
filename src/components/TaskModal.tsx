import React, { useEffect, useState } from "react";
import style from "../styles/modules/modal.module.css";
import Button from "./Button";
import todoSlice, { addTodo, editTodo } from "../slices/todoSlice";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../types/todo";
import { AnimatePresence, motion } from "framer-motion";

// Animation variants
const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.8)",
  },
  visible: {
    opacity: 1,
    transform: "scale(1)",
    transition: {
      duration: 0.3,
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    transform: "scale(0.8)",
    transition: {
      duration: 0.3,
      damping: 20,
      stiffness: 300,
    },
  },
};

function TaskModal({
  type,
  isModalOpen,
  setIsModalOpen,
  todo = undefined,
}: {
  type?: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo?: Todo;
}) {
  
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("uncompleted");

  const dispatch = useDispatch();
  // Set the title and status to the todo's title and status
  useEffect(() => {
    if (type === "edit" && todo != undefined) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("uncompleted");
    }
  }, [type, todo, isModalOpen]);

  // Handle form submit (add and edit)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the page from refreshing
    e.preventDefault();

    if (title === "") {
      toast.error("Please fill in all the fields!");
      return;
    }
    if (title && status) {
      if (type !== "edit") {
        dispatch(
          addTodo({
            id: uuidv4(),
            title: title,
            status: status,
            // Get the current time
            // (for some reason has to be in en-US format,
            // otherwise chrome return invalid date)
            time: new Date().toLocaleString("en-US"),
          })
        );
        toast.success("Task added successfully!");
        setIsModalOpen(false);
      }
      // If the type is edit, check if the title or status is different
      if (todo != undefined) {
        if (
          (type === "edit" && todo?.title !== title) ||
          todo?.status !== status
        ) {
          // If the title or status is different, dispatch the editTodo action
          dispatch(
            editTodo({
              id: todo?.id,
              title: title,
              status: status,
              time: todo?.time,
            })
          );
          // Close the modal and show a success toast
          toast.success("Task edited successfully!");
          setIsModalOpen(false);
          return;
        } else {
          // If the title and status is the same, close the modal and show an error toast
          toast.error("No changes submitted.");
        }
      }
    }
  };
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className={style.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={style.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={style.closeButton}
              onClick={() => setIsModalOpen(false)}
              onKeyDown={() => setIsModalOpen(false)}
              tabIndex={0}
              role="button"
            >
              <MdOutlineClose />
            </div>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={style.formTitle}>
                <div>{type === "edit" ? "Edit" : "Add"} Task</div>
              </h1>
              <label htmlFor="taskName" id="title">
                Task Name
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="uncompleted">Uncompleted</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              <div className={style.buttonContainer}>
                <Button type="submit">
                  {type === "edit" ? "Edit" : "Add"} Task
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  onKeyDown={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskModal;
