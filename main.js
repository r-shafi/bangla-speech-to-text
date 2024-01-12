const paragraph = document.querySelector('.speech');
const list = document.querySelector('ul');

const createListItem = (text, bookmarked = false) => `
  <span>${text}</span>
  <div>
    <button class="copy" title="Copy to Clipboard">
      <img src="assets/copy.svg" alt="copy" />
    </button>
    <button class="bookmark ${
      bookmarked ? 'bookmarked' : ''
    }" title="Bookmark for Later">
      <img src="assets/bookmark.svg" alt="bookmark" />
    </button>
    <button class="delete" title="Delete from List">
      <img src="assets/trash.svg" alt="delete" />
    </button>
  </div>
`;

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'bn-BD';
recognition.interimResults = false;

recognition.addEventListener('result', (e) => {
  paragraph.innerText = e.results[0][0].transcript;

  const li = document.createElement('li');

  li.setAttribute('data-id', Date.now());

  li.innerHTML = createListItem(paragraph.innerText);

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
    const { id } = e.target.parentElement.parentElement.dataset;
    const text =
      e.target.parentElement.parentElement.querySelector('span').innerText;

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    const bookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.id === id);

    if (bookmarkIndex === -1) {
      bookmarks.push({
        id,
        text,
      });
    } else {
      bookmarks.splice(bookmarkIndex, 1);
    }

    e.target.classList.toggle('bookmarked');
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

  bookmarks.forEach((bookmark) => {
    const li = document.createElement('li');

    li.setAttribute('data-id', bookmark.id);

    li.innerHTML = createListItem(bookmark.text, true);

    list.appendChild(li);
  });
});
