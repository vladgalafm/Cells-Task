jQuery(document).ready(function($) {
  const $table = $('.js-cells-table:first');
  const $shuffleButton = $('.js-shuffle:first');
  const $fieldSizer = $('#field-size');
  const cellsToRepaint = [];

  let $cellsCollection = $('.js-cells-table:first td');
  let size = $fieldSizer.val();

  const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const inputImages = () => {
    $cellsCollection.each(function() {
      const num = generateRandomNumber(1, 4);

      $(this)
        .removeClass(`cells__cell--${$(this).attr('data-image')}`)
        .addClass(`cells__cell--${num} cells__cell--size-${size}`)
        .attr('data-image', num);
    });
  };

  const reflowTable = () => {
    size = $fieldSizer.val();

    if (size < 4 || size > 10) {
      return;
    }

    $table.empty();

    for (let row = 0; row < size; row++) {
      const $newRow = $('<tr></tr>').appendTo($table);

      for (let cell = 0; cell < size; cell++) {
        $('<td class="cells__cell"></td>').appendTo($newRow);
      }
    }

    $cellsCollection = $('.js-cells-table:first td');
    inputImages();
  };

  const repaintCells = (x, y, cell) => {
    if ((x - 1) >= 0) {
      const newCell = $table[0].rows[y].cells[x - 1];

      if (cell.dataset.image === newCell.dataset.image && cellsToRepaint.indexOf(newCell) === -1) {
        cellsToRepaint.push(newCell);
        repaintCells(x - 1, y, newCell);
      }
    }

    if ((y - 1) >= 0) {
      const newCell = $table[0].rows[y - 1].cells[x];

      if (cell.dataset.image === newCell.dataset.image && cellsToRepaint.indexOf(newCell) === -1) {
        cellsToRepaint.push(newCell);
        repaintCells(x, y - 1, newCell);
      }
    }

    if ((x + 1) < size) {
      const newCell = $table[0].rows[y].cells[x + 1];

      if (cell.dataset.image === newCell.dataset.image && cellsToRepaint.indexOf(newCell) === -1) {
        cellsToRepaint.push(newCell);
        repaintCells(x + 1, y, newCell);
      }
    }

    if ((y + 1) < size) {
      const newCell = $table[0].rows[y + 1].cells[x];

      if (cell.dataset.image === newCell.dataset.image && cellsToRepaint.indexOf(newCell) === -1) {
        cellsToRepaint.push(newCell);
        repaintCells(x, y + 1, newCell);
      }
    }
  };

  inputImages();

  $shuffleButton.click(() => inputImages());

  $fieldSizer.keydown((e) => {
    if (e.keyCode === 13) {
      reflowTable();
    }
  });

  $table.mouseover((event) => {
    if (!event.target.hasAttribute('data-image')) {
      return;
    }

    const cell = event.target;

    cellsToRepaint.push(cell);

    const x = cell.cellIndex,
          y = cell.parentNode.rowIndex;

    repaintCells(x, y, cell);

    cellsToRepaint.forEach((item) => {
      item.classList.add('cells__cell--mouseover');
    });
  });

  $table.mouseout((event) => {
    if (!event.target.hasAttribute('data-image')) {
      return;
    }

    cellsToRepaint.forEach((item) => {
      item.classList.remove('cells__cell--mouseover');
    });

    cellsToRepaint.length = 0;
  });
});