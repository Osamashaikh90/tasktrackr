import React, { useState } from 'react'
import {AiOutlineEdit } from "react-icons/ai";
import Modal from './Modal';
import { TodoObject } from '@/types/models';
interface TaskProps {
    todo: TodoObject;
     onDescriptionUpdated: (taskId: number, newDescription: string) => void;
}
const Edit: React.FC<TaskProps> = ({todo , onDescriptionUpdated}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(todo.description);

     const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = {description: taskToEdit };
      const response = await fetch(
        `https://tasktrackr-goy7-qa5okt2ih-osamashaikh90.vercel.app/update/${todo.server_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
        );
        //  setTaskToEdit(todo.description); 
        setModalOpen(false); // Close the modal
        onDescriptionUpdated(todo.server_id, taskToEdit);
     
    } catch (err:any) {
      console.error(err.message);
    }
  };
  return (
      <>
            <button onClick={() =>  setModalOpen(true) } className='cursor-pointer mx-2'  >
              <AiOutlineEdit />
            </button>
      <Modal  modalOpen={modalOpen} setModalOpen={setModalOpen} >
    <form onSubmit={updateDescription}>
          <h3 className='font-bold text-lg'>Edit task</h3>
          <div className='modal-action'>
            <input
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
            />
                      <button type='submit' className='btn' >
              Submit
            </button>
          </div>
        </form>     
        </Modal></>
  )
}

export default Edit