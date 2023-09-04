import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import { Route, Routes, Navigate } from 'react-router-dom';
import CurrentUserContext from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import * as MainApi from "../../utils/MainApi";
import { ProtectedRoute } from "../ProtectedRout/ProtectedRoute";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleExit = () => {
        setLoggedIn(false);
    };


    const updateUser = () => {
        MainApi.checkToken()
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const checkToken = () => {
        MainApi.checkToken()
            .then((data) => {
                if (data) {
                    setLoggedIn(true);
                    setCurrentUser(data);
                    const lastRoute = localStorage.getItem('lastRoute');
                    navigate(lastRoute);
                } else {
                    setLoggedIn(false)
                }
            })
            .catch((err) => {
                setLoggedIn(false);
                console.log(err);
            });
    }


    useEffect(() => {
        checkToken();
    }, []);

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Routes>
                    <Route path='/' element={<>
                        <Header loggedIn={loggedIn} />
                        <Main />
                        <Footer />
                    </>} />

                    <Route path='/movies' element={
                        <>
                            <Header loggedIn={loggedIn} />
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                element={Movies}
                                onExit={handleExit} />
                            <Footer />
                        </>
                    } />

                    <Route path='/saved-movies' element={
                        <>
                            <Header loggedIn={loggedIn} />
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                element={SavedMovies}
                                onExit={handleExit} />
                            <Footer />
                        </>
                    }
                    />

                    <Route path='/profile' element={
                        <>
                            <Header loggedIn={loggedIn} />
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                element={Profile}
                                onExit={handleExit}
                                update={updateUser} />
                        </>
                    } />

                    <Route path='/signin' element={
                        loggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
                    } />

                    <Route path='/signup' element={
                        loggedIn ? <Navigate to="/" /> : <Register onLogin={handleLogin} />
                    } />

                    <Route path="/*" element={<NotFound />} />

                </Routes>
            </CurrentUserContext.Provider>
        </>
    )
}

export default App;
