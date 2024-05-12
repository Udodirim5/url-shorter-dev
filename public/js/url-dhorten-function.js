  const input = document.getElementById("input");
  const shortenBtn = document.getElementById("shorten");
  const errorDiv = document.getElementById("warning");

  shortenBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (input.value === "") {
      errorDiv.innerHTML = "Please add a link";

      input.style.border = "2px solid red";
      input.classList.add("error");
      setTimeout(() => {
        input.style.border = "";
        input.classList.remove("error");
      }, 2000);
    } else {
      shortenBtn.disabled = true;
      shortenBtn.textContent = "Processing...";

      setTimeout(() => {
        let shorteningURL = input.value;

        document.getElementById("output").innerHTML = shorteningURL;

        shortenBtn.disabled = false;
        shortenBtn.textContent = "Shorten it!";
        input.value = "";
        document.querySelector(".drop-box").classList.add("drop-box--show");

        document.getElementById("warning").innerHTML = "";
      }, 2000);
    }
  });

  let copyBtn = document.getElementById("copy");

  copyBtn.addEventListener("click", () => {
    let textToCopy = document.querySelector("#shortened-output a");

    let range = document.createRange();
    range.selectNode(textToCopy);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    document.execCommand("copy");

    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  });

  // URL validation
  input.addEventListener("input", (event) => {
    let url = event.target.value;

    // Regular expression to validate URL format
    let urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlPattern.test(url)) {
      errorDiv.textContent = "Invalid URL format";
      input.setCustomValidity("Invalid URL format");
      shortenBtn.disabled = true;
      shortenBtn.textContent = "Invalid URL";
    } else {
      errorDiv.textContent = "";
      input.setCustomValidity("");
      shortenBtn.disabled = false;
      shortenBtn.textContent = "Shorten It!";
    }
  });

  document.querySelector("form").addEventListener("submit", function (event) {
    if (!input.checkValidity()) {
      event.preventDefault();
      errorDiv.textContent = "Please enter a valid URL";
    }
  });

  // CLIENT SIDE URL SHORTENER
  function shortenUrl() {
    let longUrl = input.value;
    let shortUrl = "shorti.fy/" + generateShortUrl();

    localStorage.setItem(shortUrl, longUrl);

    document.getElementById(
      "shortened-output"
    ).innerHTML = `<p><strong>Short URL:</strong> <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>`;
  }

  function generateShortUrl() {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortUrl = "";
    do {
      shortUrl = "";
      for (let i = 0; i < 6; i++) {
        shortUrl += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    } while (localStorage.getItem(shortUrl));
    return shortUrl;
  }

  let path = window.location.pathname.substring(1);
  let longUrl = localStorage.getItem(path);
  if (longUrl) {
    window.location.href = longUrl;
  } else if (path.startsWith("shorti.fy/")) {
    document.body.innerHTML = "<h1>Shortened URL not found</h1>";
  }
