import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
//import * as auth from "../utils/auth";
import auth from "../utils/auth";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip";

import Footer from "./Footer";
import api from "../utils/Api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [deletedCard, setDeletedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" && closeAllPopups();
    });
    const handleClickOutside = (evt) => {
      if (evt.target === document.querySelector(".popup__overlay")) {
        closeAllPopups();
      }
    };
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeStatus({ id: card._id, isLiked: !isLiked })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
  };
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCard(card) {
    setDeletedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((info) => setCurrentUser(info))
        .catch((error) => {
          console.error("Invalid", error);
        });

      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((error) => {
          console.error("Invalid", error);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkUserInfo();
    } else {
      navigate("/login");
    }
  }, []);

  const handleUpdateAvatar = (avatar) => {
    return api
      .updateAvatar(avatar)
      .then((updateUser) => {
        setCurrentUser(updateUser);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    return api
      .updateUser({ name, about })
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name,
          about,
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Invalid", error);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Invalid", error);
      });
  };

  const handleSubmitConfirmation = () => {
    if (deletedCard) {
      api.deleteCard(deletedCard._id).then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      });
    }
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(false);
  };

  function handleRegister(email, password) {
    auth.register(email, password).then(() => {});
  }

  function handleLogin(email, password) {
    auth.register(email, password).then((token) => {
      if (token) {
        localStorage.setItem("jwt", token);
      }
    });
  }

  const checkUserInfo = () => {
    auth.getUserInfo().then(({ data }) => {
      if (data) {
        setEmail(data.email);
        setLoggedIn(true);
        navigate("/home");
      }
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser();
    setLoggedIn(false);
    navigate("/login");
  };

  const onLogin = (email, password) => {
    return auth.login(email, password).then(({ token }) => {
      if (token) {
        localStorage.setItem("jwt", token);
        checkUserInfo();
      } else {
      }
    });
  };

  const onRegister = (email, password) => {
    return auth
      .register(email, password)
      .then(({ data }) => {
        console.log("onRegister", data);
        if (data && data._id) {
          setIsRegistered(true);
        } else {
          setIsRegistered(false);
        }
        setOpen(true);
      })
      .catch((error) => {
        setOpen(true);
        setIsRegistered(false);
        console.log("error register", error);
      });
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header handleLogout={handleLogOut} email={email} />
                <Outlet />
                <Footer />
              </>
            }
          >
            {true && (
              <Route
                path="/home"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <>
                      <Main
                        onEditAvatarClick={handleEditAvatarClick}
                        onEditProfileClick={handleEditProfileClick}
                        onAddPlaceClick={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onClose={closeAllPopups}
                        selectedCard={selectedCard}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCard}
                      />
                      {isEditProfilePopupOpen && (
                        <EditProfilePopup
                          isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                        />
                      )}
                      {isAddPlacePopupOpen && (
                        <AddPlacePopup
                          isOpen={isAddPlacePopupOpen}
                          onClose={closeAllPopups}
                          onAddPlaceSubmit={handleAddPlaceSubmit}
                        />
                      )}
                      {isEditAvatarPopupOpen && (
                        <EditAvatarPopup
                          isOpen={isEditAvatarPopupOpen}
                          onClose={closeAllPopups}
                          onUpdateAvatar={handleUpdateAvatar}
                        />
                      )}

                      {isConfirmationPopupOpen && (
                        <ConfirmationPopup
                          isOpen={isConfirmationPopupOpen}
                          onClose={closeAllPopups}
                          onCardDelete={handleSubmitConfirmation}
                          card={selectedCard}
                        />
                      )}
                    </>
                  </ProtectedRoute>
                }
              />
            )}
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route
              path="/register"
              element={<Register onRegister={onRegister} />}
            />
          </Route>
        </Routes>
        <InfoToolTip
          open={open}
          isRegistered={isRegistered}
          handleClose={handleClose}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
