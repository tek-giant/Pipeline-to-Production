const filterButtons = document.querySelectorAll(".filter");
const postCards = document.querySelectorAll(".post-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTopic = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    postCards.forEach((card) => {
      const cardTopic = card.dataset.topic;
      const shouldShowCard = selectedTopic === "all" || selectedTopic === cardTopic;

      card.classList.toggle("is-hidden", !shouldShowCard);
    });
  });
});
