import React, {useState} from "react";

// function FComponent(){
//     return (
//         <div>Privet ot Component</div>
//     )
// }

const SComponent = (props)  => {
    const [count, setCount] = useState(0);
    return ( 
        <div>
            Privet ot {props.firstName} {props.lastName} {count}
            <button onClick={() => setCount(count+1)}>+</button>
            <button onClick={() => setCount(0)}>Null</button>
            <button onClick={() => setCount(count-1)}>-</button>
        </div>
    )
}

// class CComponent extends React.Component {                 // CLASSOVYI RECT, MENSHE ISPOLZUETSJA, NA4ALO REACT
//     render() {
//         return (
//             <div>Privet ot Class Component</div>
//         )
//     }
// }


export default SComponent;