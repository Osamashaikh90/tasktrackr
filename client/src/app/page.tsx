/* eslint-disable react/jsx-key */
// import Image from 'next/image'
'use client'
import React, { useState } from 'react';
import { AiOutlinePlus,AiOutlineCheck,AiOutlineClose } from "react-icons/ai";
import { TodoObject } from '@/types/models';
import { v4 as uuid } from "uuid";
const Home:React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoObject[]>([]);
   const addTodo = () => {
    setTodos([ ...todos,{ id: uuid(), value: todo, done: false }]);
    setTodo('');
   }
  const markTodoDone = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)); 
  }

  const deleteTodo = (id: string) => {
    // Filter out the todo with the given id
    setTodos(todos.filter(todo => todo.id !== id));
  ;
};
  return (
    
    
    <>
    <header style={{"backgroundColor":"#0d0c22"}} className='p-4'>
      <h1 className='text-xl' style={{"color":"#dbdbde"}}>TaskTrackr</h1>
    </header>
    <main className='min-h-screen min-w-full bg-center bg-no-repeat bg-cover flex justify-center'>
        <div className='w-[440px] h-[650px] min-h-[650px] p-7 rounded-xl shadow-xl mt-7'>
          <h1 className='text-purple-700 text-center my-5 text-2xl'>Keep Track Of Your Daily Task!</h1>
          <div>
            <input className='w-[320px] p-3 text-base font-normal mt-1 mr-4 text-gray-800 bg-white rounded' type="text" placeholder='Enter Your Task' value={todo}
              onChange={(e) => setTodo(e.target.value)} />
            <button className='mt-2 h-12 w-12 rounded bg-slate-100 '  onClick={() => addTodo()}>
              <div className='align-middle mx-[14px]'><AiOutlinePlus /></div>
            </button>
          </div>
          <div className='mt-2 text-center'>
             { 
            todos.map(todo => {
                                return (
            <div className='bg-purple-700 text-gray-100 p-3 mb-2 flex justify-between items-center min-w-[40px] rounded break-words'  key={todo.id} >
              <h3 className={`text-lg ml-5 cursor-pointer ${ todo.done ? 'line-through' : 'no-underline'}`}>{todo.value}</h3>
              <div className='mr-8 w-1 flex justify-around'>
                 <button className='cursor-pointer mx-[14px]'  onClick={() => markTodoDone(todo.id)}>
              <AiOutlineCheck />
            </button>
             <button className='cursor-pointer mx-[14px]'  onClick={() => deleteTodo(todo.id)}>
              <AiOutlineClose />
            </button>
              </div>
              </div>
              )
                            })
                        }
          </div>
        </div>
      </main>
      </>
  )
}

export default Home;
