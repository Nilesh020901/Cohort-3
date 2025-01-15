import { useState } from "react";

const FilterMenu = () => {
  const [open, setOpen] = useState(false);

  const handleButton = () => {
    setOpen((prev) => !prev)
  };

  return (
    <div className="mb-3 relative">
      <button onClick={handleButton} className="bg-neutral-100 flex justify-center items-center rounded-3xl px-3 py-[2px] gap-2">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clip-rule="evenodd" />
          </svg>
        </span>
        <span className="font-medium">Filter</span>
      </button>
      {open && (
        <div className="absolute mt-2 w-72 h-72 bg-black-700 rounded-xl text-neutral-100 border border-gray-700 shadow-lg">
          <div className="p-4">
            <h3 className="font-semibold text-base">Status</h3>
            <div className="flex justify-between items-center">
              <label className="flex items-center mt-4">
                <input type="checkbox" className="mr-2 text-black-700 border border-neutral-100 appearance-none w-4 h-4 rounded" />
                <span className="font-medium">Todo</span>
              </label>
              <label className="flex items-center pt-4">
                <input type="checkbox" className="mr-2 text-black-700 border border-neutral-100 appearance-none w-4 h-4 rounded" />
                <span className="font-medium">Solved</span>
              </label>
              <label className="flex items-center pt-4">
                <input type="checkbox" className="mr-2 text-black-700 border border-neutral-100 appearance-none w-4 h-4 rounded" />
                <span className="font-medium">Attempted</span>
              </label>
            </div>
            <h3 className="font-semibold text-bold">Difficulty</h3>
            {['Easy', 'Medium', 'Hard'].map((difficulty) => (
              <label key={difficulty} className="flex items-center mt-4">
                <input type="checkbox"
                  name="difficulty"
                  value={difficulty}
                  checked={selectedDifficulty === difficulty}
                  onChange={() => handleDifficultyChange(difficulty)} />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterMenu;

// import React, { useState } from 'react';  

// const FilterMenu = () => {  
//   const [isOpen, setIsOpen] = useState(false);  
//   const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');  

//   const handleToggle = () => {  
//     setIsOpen((prev) => !prev);  
//   };  

//   const handleDifficultyChange = (difficulty) => {
//     setSelectedDifficulty(difficulty);  
//   };  

//   const handleReset = () => {  
//     setSelectedDifficulty('Easy');  
//     // Reset other filters here if necessary  
//   };  

//   return (  
//     <div className="relative">  
//       <button  
//         onClick={handleToggle}  
//         className="bg-gray-800 text-white px-4 py-2 rounded"  
//       >  
//         Filter {selectedDifficulty}  
//       </button>  

//       {isOpen && (  
//         <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg z-10">  
//           <div className="p-4">  
//             <h3 className="font-bold">Status</h3>  
//             <label className="block">  
//               <input type="checkbox" className="mr-2" /> Todo  
//             </label>  
//             <label className="block">  
//               <input type="checkbox" className="mr-2" /> Solved  
//             </label>  
//             <label className="block">  
//               <input type="checkbox" className="mr-2" /> Attempted  
//             </label>  
//             <h3 className="font-bold mt-4">Difficulty</h3>  
//             {['Easy', 'Medium', 'Hard'].map((difficulty) => (  
//               <label key={difficulty} className="block">  
//                 <input  
//                   type="radio"  
//                   name="difficulty"  
//                   value={difficulty}  
//                   checked={selectedDifficulty === difficulty}  
//                   onChange={() => handleDifficultyChange(difficulty)}  
//                   className="mr-2"  
//                 />  
//                 <span className={difficulty === 'Easy' ? 'text-teal-400' : (difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-600')}>  
//                   {difficulty}  
//                 </span>  
//               </label>  
//             ))}  
//             <label className="block mt-2">  
//               <input type="checkbox" className="mr-2" /> Show tags  
//             </label>  
//             <button  
//               onClick={handleReset}  
//               className="mt-4 w-full bg-gray-700 py-2 rounded hover:bg-gray-600"  
//             >  
//               Reset  
//             </button>  
//           </div>  
//         </div>  
//       )}  
//     </div>  
//   );  
// };  

// export default FilterMenu;


// {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
//   <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clip-rule="evenodd" />
// </svg>
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/></svg> */}