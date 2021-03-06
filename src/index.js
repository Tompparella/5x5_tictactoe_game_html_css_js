/* 5x5 TicTacToe Game - Tommi Kunnari - 0543382 - 19.9.2020 */

import "./styles.css";

var board = document.getElementById("board");
var boxes = document.getElementsByClassName("box");
var playerTurn = document.getElementById("playerTurn");
var table;
var gameOver = false;
var h = " ";

document.getElementById("reset").addEventListener("click", reset_game);

var turn = 1;

function create_table() {
  table = new Array(5);

  for (var i = 0; i < table.length; i++) {
    table[i] = new Array(5);
  }
  var count = 0;

  for (i = 0; i < 5; i++) {
    var newrow = board.insertRow(i);
    newrow.id = i;
    for (var j = 0; j < 5; j++) {
      table[i][j] = h;
      var newbox = newrow.insertCell(j);
      newbox.innerHTML = h;
      newbox.id = count;
      newbox.setAttribute("class", "box");
      count++;
    }
    set_click_listeners();
  }
}
function set_click_listeners() {
  boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
      mark_box(this.id);
    });
  }
}
function mark_box(id) {
  if (!gameOver) {
    var curr_row = boxes[id].parentNode.id;
    var curr_col = id - curr_row * 5;
    if (boxes[id].textContent.includes(" ")) {
      if (turn % 2 !== 0) {
        boxes[id].innerHTML = "X";
        table[curr_row][curr_col] = "X";
        playerTurn.textContent = "Turn: Player 2";
      } else {
        boxes[id].innerHTML = "O";
        table[curr_row][curr_col] = "O";
        playerTurn.textContent = "Turn: Player 1";
      }
      check_win(boxes[id]);
    }
  }
}
function reset_game() {
  playerTurn.textContent = "Turn: Player 1";
  var table_length = table[0].length;
  for (var i = 0; i < table_length; i++) {
    for (var j = 0; j < table_length; j++) {
      table[i][j] = h;
    }
  }
  turn = 1;
  gameOver = false;
  for (i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = " ";
  }
}
function check_win(box) {
  var player;
  if (turn % 2 !== 0) {
    player = "X";
  } else {
    player = "O";
  }
  turn++;
  var row_count = 0;
  var curr_row = box.parentNode.id;
  var curr_col = box.id - curr_row * 5;

  /* Checking vertical victory */
  for (var i = 0; i < table[curr_row].length; i++) {
    if (table[curr_row][i] === player) {
      row_count++;
    } else {
      row_count = 0;
      break;
    }
  }

  /* Checking horizontal win */
  if (row_count === 0) {
    for (i = 0; i < table[curr_row].length; i++) {
      if (table[i][curr_col] === player) {
        row_count++;
      } else {
        row_count = 0;
        break;
      }
    }
  }

  /* Checking siagonal win */
  if (row_count === 0) {
    for (i = 0; i < table[curr_row].length; i++) {
      if (table[i][i] === player) {
        row_count++;
      } else {
        row_count = 0;
        break;
      }
    }
    if (row_count === 0) {
      var j = 0;
      for (i = table[curr_row].length - 1; i >= 0; i--) {
        if (table[j][i] === player) {
          row_count++;
          j++;
        } else {
          row_count = 0;
          break;
        }
      }
    }
  }

  if (row_count === 5) {
    playerTurn.textContent = "Game Over!";
    var p_no;
    if (player === "X") {
      p_no = "1";
    } else {
      p_no = "2";
    }
    alert("Player " + p_no + " won!");
    gameOver = true;
    return;
  }
  if (turn === 26) {
    alert("The board is full, it's a tie!");
    gameOver = true;
  }
}
create_table();
