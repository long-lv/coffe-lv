import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import { privateRoutes } from './routes';
function App() {

  return (
      <BrowserRouter>
        <div className='container-app'>
        <Layout>
          <Routes>
            {
              privateRoutes.map((route,index) =>{
                const Page = route.component;
                return <Route key={index} path={route.path} element={<Page/>}></Route>
              })
            }
          </Routes>
        </Layout>
        </div>
      </BrowserRouter>
  )
}

export default App
