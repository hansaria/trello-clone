/** @format */

//This function will called on adding the list on the board
function addListTrello(board) {
  return function () {
    let titleInput = document.getElementById('trello-list-title-input');

    document.getElementById('trello-list-title-submit').onclick = titleButtonClick;
    board.titleFormNode.style.display = 'block';
    titleInput.focus();

    function titleButtonClick(evt) {
      evt.preventDefault();
      let title = titleInput.value.trim(),
        index = board.lists.length - 1,
        list;

      board.titleFormNode.style.display = 'none';
      titleInput.value = '';
      if (!title) {
        return;
      }

      list = new List(board, title, index);

      // Attach delete action with the delete icon
      let deleteIconEle = list.node.getElementsByClassName('list-delete-icon-button')[0];
      deleteIconEle.onclick = function (evt) {
        evt.stopPropagation();
        return listDeleteTrello.deleteByIcon(list);
      };

      board.lists.splice(index, 0, list);
      board.listsNode.insertBefore(list.node, board.lists[index + 1].node);
      board.lists[index + 1].titleNode.setAttribute('list-index', index + 1);
    }
  };
}
