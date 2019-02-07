;(function() {
  const table = document.querySelector('.js-cells-table'),
        shuffleButton = document.querySelector('.js-shuffle'),
        fieldSizer = document.getElementById('field-size'),
        cellsToRepaint = [];

  let cellsCollection = table.querySelectorAll('td'),
      size = fieldSizer.value;

  let randomNumberGenerator = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let imagesInput = () => {
    cellsCollection.forEach(function(cell) {
      cell.classList.remove(`cells__cell--${cell.dataset.image}`);
      cell.removeAttribute('data-image');

      let num = randomNumberGenerator(1, 4);
      cell.classList.add(`cells__cell--${num}`);
      cell.classList.add(`cells__cell--size-${size}`);
      cell.dataset.image = num;
    });
  };

  let tableReflow = () => {
    size = fieldSizer.value;

    table.innerHTML = '';
    for (let row = 0; row < size; row++) {
      let newRow = document.createElement('tr');
      table.appendChild(newRow);

      for (let cell = 0; cell < size; cell++) {
        let newCell = document.createElement('td');
        newCell.className = 'cells__cell';
        newRow.appendChild(newCell);
      }
    }

    cellsCollection = table.querySelectorAll('td');
    imagesInput();
  };

  function cellsRepaint(x, y, cell) {
    if ((x - 1) >= 0) {
      let newCell = table.rows[y].cells[x - 1];

      if (cell.dataset.image === newCell.dataset.image && cellsToRepaint.indexOf(newCell) === -1) {
        cellsToRepaint.push(newCell);
        cellsRepaint(x - 1, y, newCell);
      }
    }

    if ((y - 1) >= 0) {
      let newCell = table.rows[y - 1].cells[x];

      if (cell.dataset.image === newCell.dataset.image && cellsToRepaint.indexOf(newCell) === -1) {
        cellsToRepaint.push(newCell);
        cellsRepaint(x, y - 1, newCell);
      }
    }

    if ((x + 1) < size) {
      let newCell = table.rows[y].cells[x + 1];

      if (cell.dataset.image === newCell.dataset.image && cellsToRepaint.indexOf(newCell) === -1) {
        cellsToRepaint.push(newCell);
        cellsRepaint(x + 1, y, newCell);
      }
    }

    if ((y + 1) < size) {
      let newCell = table.rows[y + 1].cells[x];

      if (cell.dataset.image === newCell.dataset.image && cellsToRepaint.indexOf(newCell) === -1) {
        cellsToRepaint.push(newCell);
        cellsRepaint(x, y + 1, newCell);
      }
    }
  }

  imagesInput();

  shuffleButton.addEventListener('click', function() {
    imagesInput();
  });

  fieldSizer.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      tableReflow();
    }
  });

  cellsCollection.forEach(function(cell) {
    cell.addEventListener('mouseover', function() {
      cellsToRepaint.push(cell);

      let x = cell.cellIndex,
          y = cell.parentNode.rowIndex;

      cellsRepaint(x, y, cell);

      cellsToRepaint.forEach(function(item) {
        item.classList.add('cells__cell--mouseover');
      });
    });

    cell.addEventListener('mouseout', function() {
      cellsToRepaint.forEach(function(item) {
        item.classList.remove('cells__cell--mouseover');
      });

      cellsToRepaint.length = 0;
    });
  });
}());