document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContent = document.querySelectorAll(".content");

  tabs[0].classList.add("is-active");
  tabContent[0].classList.add("active");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab;

      tabs.forEach((t) => {
        if (t !== tab) {
          t.classList.remove("is-active");
        }
      });
      tab.classList.add("is-active");

      tabContent.forEach((content) => {
        content.classList.remove("active");
      });

      document.getElementById(tabName).classList.add("active");
    });
  });
});
