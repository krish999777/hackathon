import './App.css';
import Navbar from './content/Navbar';
import Footer from './content/Footer';
import HomePage from './content/HomePage';
import Donation from './Pages/Donation';
import BrowseDonations from './content/BrowseDonations';
import PageNotFound from './content/PageNotFound';

// Imports are consolidated into one line for cleanliness
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // Using a React Fragment <> to avoid an unnecessary div in the DOM
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Use the "element" prop for components in v6 */}
          <Route path='/' element={<HomePage />} />
          <Route path='/postdonation' element={<Donation />} />
          <Route path='/browsedonation' element={<BrowseDonations />} />
          
          {/* This "catch-all" route should be last */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;