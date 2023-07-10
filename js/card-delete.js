/**
 * This function deletes the card
 *
 * @format
 */

let cardDeleteTrello = {};

cardDeleteTrello.delete = function () {
  let index = currentBoard.cards[cardEdit.card.id].index;

  currentBoard.unregisterCard(cardEdit.card);
  currentBoard.reregisterSubsequent(cardEdit.card.list, index + 1, -1);

  cardEdit.card.list.cardsNode.removeChild(cardEdit.card.node);
  cardEdit.card.list.cards.splice(index, 1);

  cardEdit.close();
  cardEdit.card = undefined;
};

cardDeleteTrello.deleteByIcon = function (card) {
  let index = currentBoard.cards[card.id].index;

  currentBoard.unregisterCard(card);
  currentBoard.reregisterSubsequent(card.list, index + 1, -1);

  card.list.cardsNode.removeChild(card.node);
  card.list.cards.splice(index, 1);
  card = undefined;
};
