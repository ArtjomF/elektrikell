import { useState } from 'react';

const TimerComponent = () => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  function handelStart() {
    let _time = 0;
    const id =
      setInterval(() => {

        if (_time === 60) {
          _time= 0;
          setTime(0);
        } else {
          setTime(function (count) {
            _time = count + 1;
            return _time;
          })
        }

      }, 1000);
      setIntervalId(id);
  }
  function handelStop() {
    clearInterval(intervalId);
  }
  return (
    <div>
      <h2>{time}</h2>
      <button onClick={handelStart}>Start</button>
      <button onClick={handelStop}>Stop</button>
    </div>

  )
};

export default TimerComponent;