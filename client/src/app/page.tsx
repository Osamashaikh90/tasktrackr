/* eslint-disable react/jsx-key */
'use client'
// import Image from 'next/image';
import React, { useState,useEffect } from 'react';
import { AiOutlinePlus,AiOutlineEdit,AiOutlineCheck,AiOutlineClose } from "react-icons/ai";
import { TodoObject } from '@/types/models';
import { Caveat,Crimson_Text} from 'next/font/google'
import Edit from './components/Edit';

const inter = Caveat({ subsets: ['latin'] })
const pr = Crimson_Text({
  subsets: ['latin'],
  weight: '400'
})


const Home:React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<TodoObject[]>([]);
  
  
  const addTodo = async () => {
    try {
      const response = await fetch("https://tasktrackr-goy7-qa5okt2ih-osamashaikh90.vercel.app/todo/get");
      const jsonData = await response.json();
      console.log(jsonData);
      setTodos(jsonData);
    } catch (err: any) {
      console.error(err.message)
    }
    
  };

  useEffect(() => {
    addTodo();
  }, []);

   const handleDescriptionUpdated = (taskId: any, newDescription: string) => {
        // Update the description for the specific task
        const updatedTodos = todos.map((todo) =>
            todo.server_id === taskId ? { ...todo, description: newDescription } : todo
        );
        setTodos(updatedTodos);
    };
  
  const markTodoDone = (id: any) => {
    setTodos((prevTodos) =>
        prevTodos.map((todo) =>
            todo.server_id === id ? { ...todo, done: !todo.done } : todo
        )
    );
};

  const deleteTodo = async (id: any) => {
    console.log(id)
    try {
      const deleteTodo = await fetch(`https://tasktrackr-goy7-qa5okt2ih-osamashaikh90.vercel.app/delete/${id}`, {
      method:"DELETE"
      })
       setTodos(todos.filter(todo => todo.server_id !== id));
    } catch (error: any) {
      console.log(error.message)
      
    }
  
  };
  
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body =  {description} ;
      console.log(body)
      const response = await fetch("https://tasktrackr-goy7-qa5okt2ih-osamashaikh90.vercel.app/todo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      console.log(response);
      addTodo();
    
  } catch (error:any) {console.error(error.message)
    
  }};
  return (
    
    <>
    <header style={{"backgroundColor":"#0d0c22"}} className='p-4'>
     <div className='hover:transform hover:scale-100 cursor-pointer'>
        <h1 className={`${inter.className} text-3xl inline-block `}
          style={{ "color": "#dbdbde" , 
    "background": "transparent",
            "marginLeft": "50px",}}
        >TaskTrackr</h1></div>
    </header>
    <main className='min-h-screen min-w-full bg-center bg-no-repeat pb-20 bg-cover flex justify-center'>
        <div  className='w-[440px] h-[600px] p-7 rounded-xl shadow-xl mt-4 overflow-y-auto '>
          <h1 className={`text-purple-700 text-center my-5 text-3xl ${pr.className}`}>Keep Track Of Your Daily Task!</h1>
          <form onSubmit={onSubmitForm}>
            <input className='w-[320px] p-3 text-base font-normal mt-2 mr-[10px] text-gray-800 bg-white rounded' type="text" placeholder='Enter Your Task' value={description}
              onChange={(e) => setDescription(e.target.value)} />
            <button className='mt-2 h-12 w-12 rounded bg-slate-100 '  >
              <div className='align-middle mx-[14px]'><AiOutlinePlus /></div>
            </button>
          </form>
          <div className='mt-2 text-center'>
             { 
            todos.map(todo => {
                                return (
            <div className='bg-purple-700 text-gray-100 p-3 mb-2 flex justify-between items-center min-w-[40px] rounded break-words'  key={todo.server_id} >
              <div className='w-[70%] flex item-start px-1 h-auto'><h3 className={`text-lg  cursor-pointer  ${ todo.done ? 'line-through' : 'no-underline'}`}>{todo. description}</h3></div>
              <div className='mr-8 w-1 pr-1 flex justify-around'>
                 <button className='cursor-pointer mx-2' onClick={()=>markTodoDone(todo.server_id)}  >
              <AiOutlineCheck />
            </button>
                                    
                                      <Edit todo={ todo} onDescriptionUpdated={handleDescriptionUpdated} />     
             <button className='cursor-pointer mx-2'  onClick={() => deleteTodo(todo.server_id)}>
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
//  ${ description.done ? 'line-through' : 'no-underline'}
// onClick={() => markTodoDone(description.id)}
// onClick={() => deleteTodo(description.id)}>