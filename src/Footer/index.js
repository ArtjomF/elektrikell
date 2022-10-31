import High from './high';
import Low from './low';
import './footer.scss';
import { Route, Routes } from 'react-router-dom';


function Footer(props) {
    
    return (
        <div id="footer">
            <Routes>
                <Route path="/" element={<Low {...props} />} />
                <Route path="/low" element={<Low {...props} />} />
                <Route path="/low/:hours" element={<Low {...props} />} />
                <Route path="/high/:hours" element={<High />} />
            </Routes>
        </div>
    );
};


export default Footer;