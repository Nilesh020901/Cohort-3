import React from 'react'

const Timer = () => {
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