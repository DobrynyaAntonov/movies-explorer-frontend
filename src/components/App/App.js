import React, { useState, useEffect } from "react";
import Main from '../Main/Main';
import { Route, Routes } from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";





function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [savedMovies, setSavedMovies] = useState(true)


    return (
        <>
            <Routes>
                <Route path='/' element={<>
                    <Header loggedIn={loggedIn} />
                    <Main />
                    <Footer />
                </>} />
                <Route path='/movies' element={<>
                    <Header loggedIn={loggedIn} />
                    <Movies save={savedMovies}/>
                    <Footer />
                </>} />

                <Route path='/saved-movies' element={<>
                    <Header loggedIn={loggedIn} />
                    <SavedMovies/>
                    <Footer />
                </>} />

                <Route path='/profile' element={<>
                    <Header loggedIn={loggedIn} />
                    <Profile/>
                </>} />

                <Route path='/signin' element={<>
                    <Login  />
                </>} />

                
                <Route path='/signup' element={<>
                    <Register  />
                </>} />
                <Route path="/*" element={<NotFound/>}/>

            </Routes>



        </>
    )
}

export default App;