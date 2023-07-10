/**
 * This function deletes a list and all its cards
 *
 * @format
 */

let listDeleteTrello = {};
let currentBoard;

listDeleteTrello.deleteByIcon = function (list) {
  // Remove from list arr
  currentBoard.lists.splice(list.index, 1);
  // Remove list node
  currentBoard.listsNode.removeChild(list.node);
  // Remove associated cards;
  list.cards.forEach((card) => {
    currentBoard.unregisterCard(card);
  });
};
