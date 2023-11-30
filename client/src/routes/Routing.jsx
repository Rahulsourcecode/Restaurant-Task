import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const Routing = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route index element={<Home />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Routing