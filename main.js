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
  li.innerText = paragraph.innerText;
  li.addEventListener('click', () => {
    const text = paragraph.innerText;

    if (!navigator.clipboard) {
      return;
    }

    navigator.clipboard.writeText(text);
  });
  list.appendChild(li);
});

recognition.addEventListener('end', recognition.start);

recognition.start();
