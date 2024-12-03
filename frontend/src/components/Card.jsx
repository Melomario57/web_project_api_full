import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import TrashBtn from "../images/trash.svg";
export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser && card.owner._id === currentUser._id;
  const likesCounter = card.likes.length;

  const isLiked = card.likes.some(
    (i) => currentUser && i._id === currentUser._id
  );
  const cardLikeButtonClassName = `cards__hearth-button ${
    isLiked ? "cards__hearth-button_active" : ""
  }`;
  const cardDeleteButtonClassName = `cards__trash-button ${
    isOwn ? "cards__trash-button_visible" : "card__trash-button_hidden"
  }`;
  return (
    <li className="cards__item" key={card._id}>
      <img
        src={card.link}
        alt={card.name}
        className="cards__image"
        onClick={handleClick}
      />
      <button className="cards__trash-button">
        <img
          src={TrashBtn}
          alt="trash picture"
          className={cardDeleteButtonClassName}
          onClick={() => onCardDelete(card)}
        />
      </button>
      <div className="cards__image-info">
        <p className="cards__image-text">{card.name}</p>

        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <span className="cards__hearth-counter">{likesCounter}</span>
      </div>
    </li>
  );
}
