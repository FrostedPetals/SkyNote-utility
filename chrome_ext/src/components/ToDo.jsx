import React,{useState,useContext,useEffect} from 'react'

import { Themecontext } from './Themeprovider';
function ToDo() {
  
  
  const stored = JSON.parse(localStorage.getItem("tsks"))||[];
  let [tasks,setTasks]=useState(stored);
  let [newTask,setNewTask]=useState("");
  
  const {theme}=useContext(Themecontext);



useEffect(()=>{

    localStorage.setItem("tsks", JSON.stringify(tasks));
},[tasks])


  function addTask(){
    newTask=newTask.trim();
    if (newTask==='') return;
    const newTaskobj={
      id:Date.now(),
      todo:newTask,
      completed:false
    }
    setTasks([...tasks,newTaskobj])
    
    {/*localStorage.setItem("tsks", JSON.stringify(tasks));*/}
    setNewTask('')
  }

  function delTask(objid) {
    // Create a new array excluding the deleted task
    setTasks(prevTasks => prevTasks.filter(task => task.id !== objid));
  }
  return (
    <div className="border-2 p-5 max-w-[95%] mx-auto sm:mt-4 sm:p-6">

    <>
    <h2 className={(theme==='light'?'widget-light':'widget-dark')}>
      ╰┈➤ ❝ [TO-DO] ❞
      </h2>
    <input type="text" placeholder="Type here..." className='border-2 m-2 p-3 rounded-lg'
    value={newTask} onChange={(e)=>{setNewTask(e.target.value)}} />

    <button  onClick={addTask}
  className={`px-5 py-2 rounded-lg font-bold transition-all duration-300
    ${theme === "light"
      ? "bg-white text-blue-600 border border-blue-400 hover:shadow-[0_0_15px_#60a5fa] hover:scale-105"
      : "bg-gray-900 text-cyan-400 border border-cyan-500 hover:shadow-[0_0_20px_#06b6d4] hover:scale-105"
    }`}
>
  Add task
</button>

    </>
    <ul className= {"mt-3  list-inside"}>
    {tasks.length>=1 && tasks.map((task)=>{
      return(
      <li
  key={task.id}
  className={`${theme === 'light'
    ? 'bg-white text-gray-800 hover:shadow-[0_0_10px_#60a5fa]'
    : 'bg-gray-900 text-cyan-300 hover:shadow-[0_0_10px_#06b6d4]'}
    flex justify-between items-center mb-2 p-3 rounded-lg transition-all duration-300`}
>
 <input
            type="checkbox"
            checked={task.completed}
            onChange={() => //see this 
              setTasks(prevTasks =>
                prevTasks.map(t =>
                  t.id === task.id ? { ...t, completed: !t.completed } : t
                )
              )
            }
            className="checkbox checkbox-lg checkbox-accent"
          />
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.todo}
        </span>
        <button
          onClick={() => delTask(task.id)}
          className="text-red-500 ml-2"
        >
          ❌
        </button>

      </li>)
    })}
    </ul>
    </div>
  )
}

export default ToDo