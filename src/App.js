import { Route, Routes } from 'react-router-dom';
import Error from './pages/Error/Error';
import Results from './pages/Results/Results';
import Header from './pages/Header/Header';
import GetId from './pages/BookCard/GetId';

const App = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Routes>
        <Route path='/results' element={<Results />} />
        <Route path='/bookCard/:id' element={<GetId />} />
        <Route path='/error' element={<Error />} />
      </Routes>
    </div>

  );
}

export default App;
