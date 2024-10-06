const generateNpo = () => {
  const limit_1 = 77;
  const limit_2 = 90;
  const NpoRoster = [
    { name: 'Brawler Trooper', wnds: 7 },
    { name: 'Brawler Tough', wnds: 10 },
    { name: 'Brawler Heavy', wnds: 14 },
    { name: 'Marksman Trooper', wnds: 7 },
    { name: 'Marksman Warrior', wnds: 8 },
    { name: 'Marksman Heavy', wnds: 14 },
  ];

  const npoOperatives = [];

  const getCurrentWndsTotal = (npoOperatives) => {
    return npoOperatives.reduce((acc, operative) => acc + operative.wnds, 0);
  };

  const getLowestWnds = (NpoRoster) => {
    return Math.min(...NpoRoster.map((u) => u.wnds));
  };

  //choose game type
  //random number between 1 and 3
  const gameType = Math.floor(Math.random() * 3) + 1;
  const limit = gameType == 1 ? limit_1 : limit_2;

  while (
    getCurrentWndsTotal(npoOperatives) <
    limit - getLowestWnds(NpoRoster)
  ) {
    const unit = NpoRoster[Math.floor(Math.random() * NpoRoster.length)];
    if (getCurrentWndsTotal(npoOperatives) + unit.wnds < limit) {
      npoOperatives.push(unit);
    }
  }

  return npoOperatives;
};
const submit = document.getElementById('genbtn');
const npodiv = document.getElementById('npo');

function jsonToTable(json) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Create table header
  const headerRow = document.createElement('tr');
  Object.keys(json[0]).forEach((key) => {
    const th = document.createElement('th');
    th.textContent = key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Create table body
  json.forEach((obj) => {
    const row = document.createElement('tr');
    Object.values(obj).forEach((value) => {
      const td = document.createElement('td');
      td.textContent = value.toLocaleString();
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const npo = generateNpo();

  npodiv.innerHTML = '';
  npodiv.appendChild(jsonToTable(npo));
});
