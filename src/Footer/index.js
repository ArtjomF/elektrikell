import High from './high';
import Low from './low';
import './footer.scss';
// biblioteka kotoraja nam pomogaet pokazyvat kotoryje byli zaprosheny 4erez url.
import { Route, Routes } from 'react-router-dom';


function Footer(props) {
    
    // Routes eto wrapper nashih marshrutov
    // Rout eto marshrut v kotorom perdajom komponent 4erez props
    // path sovpodajet s nashim url i Rout renderit ego polu4ennyj komponent
    // v path 4erez : my mozem perdat komonent parametry url
    return (
        <div id="footer">
            <Routes>
                <Route path="/" element={<Low {...props} />} />
                <Route path="/low" element={<Low {...props} />} />
                <Route path="/low/:hours" element={<Low {...props} />} />
                <Route path="/high" element={<High />} />
            </Routes>
        </div>
    );
};


export default Footer;