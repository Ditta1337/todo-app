import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import TaskModal from "./TaskModal";
import { useDispatch } from "react-redux";
import { updateFilterStatus } from "../slices/todoSlice";
import style from "../styles/modules/app.module.css";

function AppHeader(this: any) {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Filter state
  const [filterStatus, setFilterStatus] = useState("all");

  const dispatch = useDispatch();

  // Update the filter status
  const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value as "all" | "completed" | "uncompleted";
    setFilterStatus(filterValue);
    dispatch(updateFilterStatus(filterValue));
  };

  return (
    <div className={style.appHeader}>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </SelectButton>
      <TaskModal
        type="add"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default AppHeader;
