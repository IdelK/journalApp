import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../R_actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../R_actions/notes";



export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //para mantener la informacion del estado usuario cada vez que se recarga la app indepedientemente que firebase conserve ese estado
  //se usa un /OBSERVER firebase.unsusbscribe/  firebase.auth().onAuthStateChanged((user) que se dispara mas de una vez y cada vez que
  //el usuario realiza un sing in o  sing out o un cambio del token uid

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {

      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
       
       dispatch(startLoadingNotes(user.uid));

      } else {
        setIsLoggedIn(false); 
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, isLoggedIn]);

  //****!!!!cdo recargo el navegador muestro el cartel espere en vez de LoginScreen!!!***
  if (checking) {
    return <h1>wait...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA ANIDADA */}

        {/* RUTA PUBLICA:no requiere usuario autenticado */}
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              {" "}
              <AuthRouter />{" "}
            </PublicRoute>
          }
        />

        {/* RUTA PRIVADA:requiere usuario autenticado*/}
        <Route
          exact
          path="/*"
          element={
            <PrivateRoute>
              {" "}
              <JournalScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
