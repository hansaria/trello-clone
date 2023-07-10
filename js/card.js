var dragTracker = {
  id: undefined,
  list: undefined
};

//this function will build the card node
function buildCardNode() {
  var node = document.createElement("div");
  node.draggable = true;
  node.innerHTML =
    '<span class="card-title-container">' +
    '<div class="card-title"></div>' +
    '<input class="card-delete-icon-button" type="button" value="X"/>' +
    "</span>" +
    '<div class="card-description"></div>';
  return node;
}

/*
 This function is constructor function for card
 */
function Card(list, title, description, hideDeleteIcon = false) {
  this.id = list.board.getNextId();
  this.list = list;
  this.title = title;
  this.description = description;
  this.node = buildCardNode();
  this.titleNode = this.node.getElementsByClassName("card-title")[0];
  this.descriptionNode = this.node.getElementsByClassName(
    "card-description"
  )[0];
  var deleteIconEle = this.node.getElementsByClassName(
    "card-delete-icon-button"
  )[0];
  deleteIconEle.onclick = function (evt) {
    console.log("Here", evt);
    evt.stopPropagation();
    cardEdit.card = this;
    cardEdit.titleNode.value = this.title;
    cardEdit.descriptionNode.value = this.description;
    return cardDeleteTrello.deleteByIcon(this);
  };
  if (hideDeleteIcon) {
    deleteIconEle.style.display = "none";
  }
  this.node.classList.add("card");
  this.node.setAttribute("card-id", this.id);
  this.titleNode.appendChild(document.createTextNode(this.title));
  this.descriptionNode.appendChild(document.createTextNode(this.description));

  /*
	 These four function will work on drag and drop of the card on another list
	 */
  this.node.ondragstart = (function (id) {
    return function (evt) {
      dragTracker.id = id;
      evt.dataTransfer.effectAllowed = "move";
    };
  })(this.id);

  this.node.ondragover = function (evt) {
    if (dragTracker.id) {
      evt.preventDefault();
    }
  };

  this.node.ondrop = (function (board) {
    return function (evt) {
      var id = dragTracker.id,
        targetId = this.getAttribute("card-id"), // 'this' is target of drop
        source = board.cards[id],
        target = board.cards[targetId];

      if (id === targetId) {
        return;
      }

      source.list.cardsNode.removeChild(source.card.node);
      target.list.cardsNode.insertBefore(source.card.node, target.card.node);

      board.reregisterSubsequent(source.list, source.index + 1, -1);
      source.list.cards.splice(source.index, 1);

      board.reregisterSubsequent(target.list, target.index + 1, 1);
      target.list.cards.splice(target.index + 1, 0, source.card);

      source.card.list = target.list;
      board.registerCard(source.card, target.index + 1);
      evt.preventDefault();
    };
  })(list.board);

  this.node.ondragend = function () {
    dragTracker.id = undefined;
  };

  // this function will be called once you click on the text to edit
  this.node.onclick = (function (card) {
    return function () {
      cardEdit.card = card;
      cardEdit.titleNode.value = card.title;
      cardEdit.descriptionNode.value = card.description;
      cardEdit.show();
    };
  })(this);
}
