import High from './high';
import Low from './low';
import './footer.scss';
import { useSelector } from 'react-redux';


function Footer(props) {
    const radioValue = useSelector ((state) => state.radioValue);
    return (
        <div id="footer">
        {radioValue === 'low' ? (<Low {...props} />) : 
        (<High />)}
        </div>
    );
};


export default Footer;