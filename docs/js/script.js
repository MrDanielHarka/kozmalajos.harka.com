// Load images from JavaScript
import { images as imageData, videos as videoData } from '/js/media.js';
const photoGrid = document.getElementById('paginated-list');
const videoGrid = document.getElementById('paginated-list2');
let images = '';
let videos = '';

for (let i = 0; i < imageData.length; i++) {
  images += `
  <img
  src="images/${imageData[i][0]}"
  alt="${imageData[i][1]}"
  class="portfolio-image w3-third"
  ${i > 8 ? "loading = 'lazy'" : ''}
  />
  `;
}
photoGrid.innerHTML = images;

for (let i = 0; i < videoData.length; i++) {
  if (i < 6) {
    videos += `
  <a
    href="${videoData[i][1]}"
    class="portfolio-video w3-third"
    target="_blank"
    rel="noreferrer noopener nofollow"
  >
    <img
      src="images/${videoData[i][0]}"
      alt="Kozma Lajos, Lajos Kozma ${i}"
    />
    <img src="play-overlay.png" alt="Kozma Lajos, Lajos Kozma ${i}" class="play-overlay" />
  </a>
  `;
  }
}
videoGrid.innerHTML = videos;

// Pagination

const paginationNumbers = document.getElementById('pagination-numbers');
const paginatedList = document.getElementById('paginated-list');
const listItems = paginatedList.querySelectorAll('.w3-third');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

const paginationLimit = 9;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.remove('visible');
    if (index >= prevRange && index < currRange) {
      item.classList.add('visible');
    }
  });
  window.location.href = '#';
};

const disableButton = (button) => {
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
};

const enableButton = (button) => {
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll('.pagination-number').forEach((button) => {
    button.classList.remove('active');
    const pageIndex = Number(button.getAttribute('page-index'));
    if (pageIndex == currentPage) {
      button.classList.add('active');
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement('button');
  pageNumber.className = 'pagination-number';
  pageNumber.innerHTML = index;
  pageNumber.setAttribute('page-index', index);
  pageNumber.setAttribute('aria-label', 'Page ' + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

window.addEventListener('load', () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll('.pagination-number').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page-index'));

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});

// Hide loader
setTimeout(() => {
  document.getElementsByClassName('loader-background')[0].style.display =
    'none';
  document.getElementsByTagName('html')[0].style.overflow = 'visible';
}, 750);

// Script to open and close sidebar
function w3_open() {
  document.getElementById('mySidebar').style.display = 'block';
  document.getElementById('myOverlay').style.display = 'block';
}

document
  .querySelector('.w3-right.w3-button.w3-white')
  .addEventListener('click', w3_open);

function w3_close() {
  document.getElementById('mySidebar').style.display = 'none';
  document.getElementById('myOverlay').style.display = 'none';
}

document.querySelectorAll('.close-sidebar').forEach((link) => {
  link.addEventListener('click', w3_close);
});

document.querySelectorAll('.portfolio-image').forEach((image) => {
  image.addEventListener('click', (e) => {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-img').src = e.target.src;
    document.getElementById('caption').innerHTML = e.target.alt;
  });
});

// Hide modal on Escape keypress
document.addEventListener(
  'keyup',
  function (e) {
    if (e.key == 'Escape' || e.key == 'Esc') {
      document.querySelectorAll('.w3-modal').forEach((modal) => {
        modal.style.display = 'none';
      });
    }
  },
  true
);
