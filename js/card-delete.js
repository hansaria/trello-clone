/*
 This function deletes the card
 */
var cardDeleteTrello = {};
var currentBoard;

cardDeleteTrello.delete = function () {
  console.log("After delete click : ", cardEdit);
  var index = currentBoard.cards[cardEdit.card.id].index;

  currentBoard.unregisterCard(cardEdit.card);
  currentBoard.reregisterSubsequent(cardEdit.card.list, index + 1, -1);

  cardEdit.card.list.cardsNode.removeChild(cardEdit.card.node);
  cardEdit.card.list.cards.splice(index, 1);

  cardEdit.close();
  cardEdit.card = undefined;
};

cardDeleteTrello.deleteByIcon = function (card) {
  console.log("current cards : ", currentBoard);
  console.log("After delete click : ", card);
  var index = currentBoard.cards[card.id].index;

  currentBoard.unregisterCard(card);
  currentBoard.reregisterSubsequent(card.list, index + 1, -1);

  card.list.cardsNode.removeChild(card.node);
  card.list.cards.splice(index, 1);
  card = undefined;
};
