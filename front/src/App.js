import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    {/*<ul>*/}
                    {/*    <li><Link to="/">Home</Link></li>*/}
                    {/*</ul>*/}
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
