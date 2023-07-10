/*
 This function will add the Card in the list
 */

function addCardTrello(list) {
  return function () {
    var titleInput = list.titleFormNode.getElementsByClassName(
      "trello-new-card-title-input"
    )[0];
    var descriptionTextarea = list.titleFormNode.getElementsByClassName(
      "trello-new-card-description-input"
    )[0];
    list.titleFormNode.getElementsByClassName(
      "trello-new-card-title-submit"
    )[0].onclick = titleSubmit;
    list.titleFormNode.style.display = "block";
    titleTextarea.focus();

    function titleSubmit(evt) {
      evt.preventDefault();
      var title = titleInput.value.trim();
      var description = descriptionTextarea.value.trim();
      var card;

      list.titleFormNode.style.display = "none";
      titleInput.value = "";
      descriptionTextarea.value = "";
      if (!title || !description) {
        return;
      }

      card = new Card(list, title, description);
      // Attach deleteAction
      var deleteIconEle = card.node.getElementsByClassName(
        "card-delete-icon-button"
      )[0];
      deleteIconEle.onclick = function (evt) {
        console.log("Here", evt);
        evt.stopPropagation();
        return cardDeleteTrello.deleteByIcon(card);
      };

      list.board.registerCard(card, list.cards.length);
      list.cardsNode.insertBefore(
        card.node,
        list.cards[list.cards.length - 1].node
      );
      list.cards.push(card);
    }
  };
}
