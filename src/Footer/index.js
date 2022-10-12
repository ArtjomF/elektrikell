import Low from "./low";
import High from "./high";



function Footer({ radioValue, hourValue, setHourValue }) {
    return (
        <>
        {radioValue === 'low' ? (<Low {...{hourValue, setHourValue}} />): (<High/>)}
        </>
    );
};


export default Footer;