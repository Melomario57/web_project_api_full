import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import EditBtn from "../images/edit.png";
import Addbtn from "../images/add.png";
export default function Main({
  cards,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onClose,
  selectedCard,
  onCardLike,
  onCardDelete,
}) {
  const CurrentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <section className="profile">
        <div className="profile__column">
          <div className="profile__image-wrapper">
            <img
              className="profile__image"
              src={CurrentUser?.avatar}
              alt="foto de perfil del usuario"
            />
            <button
              className="profile__image-switch-button"
              onClick={onEditAvatarClick}
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{CurrentUser?.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfileClick}
            >
              <img
                src={EditBtn}
                alt="Botón para editar"
                className="profile__edit-button-image"
              />
            </button>
            <h2 className="profile__subtitle">{CurrentUser?.about}</h2>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlaceClick}
        >
          <img
            src={Addbtn}
            alt="Botón para editar"
            className="profile__add-button-image"
          />
        </button>
      </section>
      {selectedCard && (
        <ImagePopup selectedCard={selectedCard} onClose={onClose} />
      )}
      <section className="cards">
        <ul className="cards__content">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                ImagePopup={selectedCard}
                onCardClick={onCardClick}
                onClose={onClose}
                key={card._id}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              ></Card>
            );
          })}
        </ul>
      </section>
    </>
  );
}
