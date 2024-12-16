import React, { useState, useEffect } from 'react';
import style from "./Timer.module.css"
import { formatTime, calculateTime} from '../utils/auxiliaryFunctions';

const Timer = () => {
	// States to manage time, initial time, running status, and editing fields with values
	const [time, setTime] = useState(0); // Current time in seconds
	const [initialTime, setInitialTime] = useState(0); // Time initially set by the user
	const [isRunning, setIsRunning] = useState(false); // Tracks if the timer is running or paused
	const [editState, setEditState] = useState({ field: null, value: '' }); // State for editing field and value

	// Effect to update the progress bar as time counts down
	useEffect(()=>{
		const progress = initialTime > 0 ? ((initialTime - Time) / initialTime) * 100 : 0;
		document.documentElement.style.setProperty('--progress', `${progress}%`);
	}, [time, initialTime]);

	// Effect to handle timer countdown when it is running
	useEffect(()=> {
		let interval = null;
		if (isRunning && time > 0) {
			interval = setInterval(()=> {
				setTime((prevTime)=>prevTime-1); // Decrease time by 1 second
			}, 1000);
		}
		else if (time === 0) {
			setIsRunning(false); // Stop the timer when it reaches 0
		}
		return () => {
			if (interval) clearInterval(interval); // Clear interval to prevent memory leaks
		};
	}, [isRunning, time]);

	// Function to handle editing of time fields
	const handleEditField = (field) => {
		if (editState.field === field) {
			// Edit is completed - save new value with padding and update time
			const newTime = {
				...formatTime(time),
				[feild]: editState.value.padStart(2, '0') // Add leading zeros if necessary
			};

			// Use the auxiliary function to calculate the total time in seconds
			const calculateTime = calculateTime(newTime.hours, newTime.minutes, newTime.seconds);

			// Update time and initial time with the new calculated value
			setTime(calculateTime);
			setInitialTime(calculateTime);

			// Reset editing state
			setEditState({ field: null, value: '' });
		}
		else {
			// Start editing - remove leading zeros
			setIsRunning(false); // Pause the timer while editing
			setEditState({ field, value: formatTime(time)[field].replace(/^0+/, '') }); // Set field and remove leading zeros for easier editing
		}
	};

	// Handle input changes for editing time fields (allow only numbers)
	const handleInputChange = (e) => {
		const value = e.target.value.replace(/\D/g, '').slice(0, 2); // Allow only numbers, max 2 digits
		setEditState((prevState) => ({...prevState, value })); // Update only the value in editState
	};

	// Format current time into hours, minutes, and seconds for display
	const { hours, minutes, seconds } = formatTime(time);
  return (
    <div className= {style.timerApp}>
      <div className= {style.timerDisplay}>
        <div className= {style.timerCircle}>
          <div className= {style.timerTime}>
            {editState.feild === 'hours' ? (
              <input className= {style.timeInput} type='text' value={editState.value} onChange={handleInputChange} onBlur={() => handleEditFeild('hours')} autoFocus />
            ):(
              <span className={style.timeUnit} onClick={()=> handleEditFeild('hours')}>{hours}</span>
            )}
            :
            {editState.feild === 'minutes' ? (
              <input className= {style.timerInput} type='text' value={editState.value} onChange={handleInputChange} onBlur={() => handleEditFeild('minutes')} autoFocus />
            ):(
              <span className= {style.timeUnit} onClick={()=> handleEditFeild('hours')}>{minutes}</span>
            )}
            :
            {editState.feild === 'seconds' ? (
              <input className={style.timeInput} type='text' value={editState.value} onChange={handleInputChange} onBlur={() => handleEditFeild('seconds')} autoFocus />
            ):(
              <span className={style.timeUnit} onClick={()=> handleEditFeild('seconds')}>{seconds}</span>
            )}
          </div>
        </div>
      </div>
      <div className={style.actionButtons}>
        <button className={style.actionButton} onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Pause' : 'Start' }</button> {/* Toggle between Start and Pause */}
        <button className={style.actionButton} onClick={()=>{ setTime(0); setInitialTime(0); setIsRunning(false); }}>Reset</button> {/* Reset the timer */}
      </div>
    </div>
  );
};

export default Timer