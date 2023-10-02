               


import React, { useContext, useState,useEffect } from 'react';
import { TodoContext } from '../context/TodoContextProvider';
// import { io } from 'socket.io-client';


export default function Card({ TODO, ID }) {


  // const socket = io(`${process.env.REACT_APP_HOST_URI}`); // Adjust the URL to your server's address





  const { deleteTodo, updateTodo } = useContext(TodoContext);
  const [updateText, setUpdateText] = useState('');
  // const [reminderText, setReminderText] = useState('');
  // const [time, setTime] = useState('');

  const handleUpdate = async (TodoId, content) => {
   const data= await updateTodo(TodoId, content);
if(data){
alert("Todo updated")
  setUpdateText("")
}
  };

  const handleDelete = async (TodoId) => {
   const data= await deleteTodo(TodoId);
   if(data){
    alert("todo deleted")
   }
  };


// const handleReminderSubmit = () => {
 
//   const timeParts = time.split(":");
//   const hours = parseInt(timeParts[0], 10);
//   const minutes = parseInt(timeParts[1], 10);


//   const currentDate = new Date();
//   const currentHours = currentDate.getHours();
//   const currentMinutes = currentDate.getMinutes();


//   const hoursDifference = hours - currentHours;
//   const minutesDifference = minutes - currentMinutes;
//   const timeDifference = (hoursDifference * 60 + minutesDifference) * 60 * 1000;

  
//   if (timeDifference < 0) {
      
//       timeDifference += 24 * 60 * 60 * 1000; 
//   }

//   console.log("current time", currentDate);
//   console.log("end time", time);

//   console.log("time diff set", timeDifference);

//   setTimeout(() => {
//       alert(`Reminder: ${reminderText}`);
//   }, timeDifference);
// };



// const [reminder, setReminder] = useState(null);

// useEffect(() => {
//   // Listen for the reminder event from the server
//   socket.on('reminder', (data) => {
//     setReminder(data.message);
//   });

//   return () => {
//     // Clean up the socket connection when the component unmounts
//     socket.disconnect();
//   };
// }, []);

  return (
    <div className="flex w-full h-full md:flex-col p-2 ml-2">
      <div className="flex items-center justify-around text-center shadow-xl p-2 flex-col md:flex-row">
        <h1 className="text-xl w-[40%]">{TODO}</h1>
        <button className="bg-black text-red-500 rounded-md p-2 m-3" onClick={() => handleDelete(ID)}>
          Delete
        </button>
        <input
          type="text"
          name="content"
          value={updateText}
          required
          placeholder="TODO UPDATE"
          className="w-[30%] text-center m-2 focus:outline-none shadow-md"
          onChange={(e) => {
            setUpdateText(e.target.value);
          }}
        />
        <button className="bg-black text-white rounded-md p-2 m-3" onClick={() => handleUpdate(ID, updateText)}>
          Update
        </button>
      </div>
      {/* <input
        type="text"
        placeholder="Enter reminder text"
        value={reminderText}
        onChange={(e) => setReminderText(e.target.value)}
      />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={handleReminderSubmit}>Set Reminder</button> */}
    </div>
  );
}
