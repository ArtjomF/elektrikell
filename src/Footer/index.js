import Low from "./low";
import High from "./high";



function Footer(props) {
    return (
        <>
        {props.radioValue === 'low' ? (<Low {...props} />): 
        (<High currentprice={props.currentprice} worstTimeRange={props.worstTimeRange}/>)}
        </>
    );
};


export default Footer;