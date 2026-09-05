const filterButtons = document.querySelectorAll(".filter");
const unitLinks = document.querySelectorAll(".unit-link");
const searchForm = document.querySelector(".search-box");
const searchInput = document.querySelector("#site-search");
const postCards = document.querySelectorAll(".post-card");
const projectCards = document.querySelectorAll(".project-list article");
const emptyState = document.querySelector(".empty-state");
const resultsNote = document.querySelector(".results-note");

let activeFilter = "all";
let activeSearch = "";

const getSearchText = (item) => {
  return `${item.dataset.title || ""} ${item.textContent}`.toLowerCase();
};

const updateResults = () => {
  let visibleArticles = 0;
  let visibleProjects = 0;
  const searchText = activeSearch.trim().toLowerCase();

  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === activeFilter);
  });

  postCards.forEach((card) => {
    const topics = (card.dataset.topics || "").split(" ");
    const matchesFilter = activeFilter === "all" || topics.includes(activeFilter);
    const matchesSearch = !searchText || getSearchText(card).includes(searchText);
    const shouldShowCard = matchesFilter && matchesSearch;

    card.classList.toggle("is-hidden", !shouldShowCard);

    if (shouldShowCard) {
      visibleArticles += 1;
    }
  });

  projectCards.forEach((card) => {
    const matchesSearch = !searchText || getSearchText(card).includes(searchText);

    card.classList.toggle("is-hidden", !matchesSearch);

    if (matchesSearch) {
      visibleProjects += 1;
    }
  });

  emptyState.hidden = visibleArticles > 0;

  if (searchText) {
    resultsNote.textContent = `${visibleArticles} article result${visibleArticles === 1 ? "" : "s"} and ${visibleProjects} project result${visibleProjects === 1 ? "" : "s"} found.`;
    return;
  }

  resultsNote.textContent = activeFilter === "all" ? "Showing all current articles." : `Showing the ${activeFilter.toUpperCase()} unit.`;
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    updateResults();
  });
});

unitLinks.forEach((link) => {
  link.addEventListener("click", () => {
    activeFilter = link.dataset.filter;
    updateResults();
  });
});

document.querySelector(".search-nav").addEventListener("click", () => {
  window.setTimeout(() => searchInput.focus(), 200);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  activeSearch = searchInput.value;
  activeFilter = "all";
  updateResults();
});

searchInput.addEventListener("input", () => {
  activeSearch = searchInput.value;
  updateResults();
});

updateResults();
