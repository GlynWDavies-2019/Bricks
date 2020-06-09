const rulesButton = document.getElementById('rules-btn');
const closeButton = document.getElementById('close-btn');
const rulesPanel = document.getElementById('rules');

rulesButton.addEventListener('click',() => rulesPanel.classList.add('show'));
closeButton.addEventListener('click',() => rulesPanel.classList.remove('show'));