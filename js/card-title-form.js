/*
 This function is called to build the card form
 */
function buildCardTitleForm() {
  var node = document.createElement("form");
  node.innerHTML =
    '<div class="newitem-title-wrapper">' +
    '<input class="trello-new-card-title-input" type="text" placeholder="Title"></input>' +
    '<textarea class="trello-new-card-description-input" type="text" placeholder="Description"></textarea>' +
    '<input class="trello-new-card-title-submit" type="submit" value="Add">' +
    "</div>";
  node.style.display = "none";
  return node;
}
