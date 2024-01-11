const paragraph = document.querySelector('.speech');
const list = document.querySelector('ul');

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'bn-BD';
recognition.interimResults = false;

recognition.addEventListener('result', (e) => {
  paragraph.innerText = e.results[0][0].transcript;

  const li = document.createElement('li');

  li.innerHTML = `
    <span>${paragraph.innerText}</span>
    <div>
      <button class="copy">
        <img src="assets/copy.svg" alt="" />
      </button>
      <button class="delete">
        <img src="assets/trash.svg" alt="" />
      </button>
    </div>
  `;

  list.appendChild(li);
});

recognition.addEventListener('end', recognition.start);

recognition.start();

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('copy')) {
    const text =
      e.target.parentElement.parentElement.querySelector('span').innerText;

    if (!navigator.clipboard) {
      return;
    }

    navigator.clipboard.writeText(text);
  } else if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
  }
});
