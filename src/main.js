// json 파일 읽어오는 함수
function loadItems() {
  return fetch('./data/data.json')
  .then(response => response.json())
  .then(json => json.items);
}

// index.html items 요소 안에 가져온 리스트를 하나의 문자열로 넣기 위한 함수
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// index.html items 요소에 데이터들을 넣는 함수
function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
  `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
 
  if (key == null || value == null) {
    return;
  } 

  displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');

  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);

