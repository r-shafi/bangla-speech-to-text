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
      <button class="copy" title="Copy to Clipboard">
        <img src="assets/copy.svg" alt="copy" />
      </button>
      <button class="bookmark" title="Bookmark for Later">
        <img src="assets/bookmark.svg" alt="" />
      </button>
      <button class="delete" title="Delete from List">
        <img src="assets/trash.svg" alt="delete" />
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
  } else if (e.target.classList.contains('bookmark')) {
    const text =
      e.target.parentElement.parentElement.querySelector('span').innerText;

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    bookmarks.push(text);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

  bookmarks.forEach((bookmark) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <span>${bookmark}</span>
      <div>
        <button class="copy" title="Copy to Clipboard">
          <img src="assets/copy.svg" alt="copy" />
        </button>
        <button class="bookmark" title="Bookmark for Later">
          <img src="assets/bookmark.svg" alt="" />
        </button>
        <button class="delete" title="Delete from List">
          <img src="assets/trash.svg" alt="delete" />
        </button>
      </div>
    `;

    list.appendChild(li);
  });
});
