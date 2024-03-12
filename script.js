document.addEventListener("DOMContentLoaded", function () {
  class MistParticle {
    constructor(ctx, canvasWidth, canvasHeight) {
      this.ctx = ctx;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.xVelocity = Math.random() * 4 - 2;
      this.yVelocity = Math.random() * 4 - 2;
      this.image = null;
    }

    setImage(image) {
      this.image = image;
    }

    render() {
      if (!this.image) return;

      this.ctx.drawImage(
        this.image,
        this.x - this.image.width / 2,
        this.y - this.image.height / 2,
        400,
        400
      );

      this.x += this.xVelocity;
      this.y += this.yVelocity;

      if (this.x >= this.canvasWidth || this.x <= 0) {
        this.xVelocity = -this.xVelocity;
        this.x = Math.min(Math.max(this.x, 0), this.canvasWidth);
      }

      if (this.y >= this.canvasHeight || this.y <= 0) {
        this.yVelocity = -this.yVelocity;
        this.y = Math.min(Math.max(this.y, 0), this.canvasHeight);
      }
    }
  }

  class Mist {
    constructor({ selector, density = 50, velocity = 2, particle, bgi } = {}) {
      const canvas = document.querySelector(selector);
      const bcr = canvas.parentElement.getBoundingClientRect();
      this.ctx = canvas.getContext("2d");
      this.canvasWidth = canvas.width = bcr.width;
      this.canvasHeight = canvas.height = bcr.height;

      this.particles = Array.from(
        { length: density },
        () => new MistParticle(this.ctx, this.canvasWidth, this.canvasHeight)
      );

      if (particle) {
        const img = new Image();
        img.onload = () => {
          this.particles.forEach((p) => p.setImage(img));
          this._render();
        };
        img.src = particle;
      } else {
        this._render();
      }
    }

    _render() {
      this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.particles.forEach((p) => p.render());

      requestAnimationFrame(this._render.bind(this));
    }
  }

  new Mist({
    selector: "#mist",
    particle: "./img/fog-particle.png",
    density: 80,
  });

  // ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

  const svg = document.getElementById("svg");
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const cellSize = 160;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  alphabet.split("").forEach((letter, index) => {
    const col = index % 5;
    const row = Math.floor(index / 5);
    const x = col * cellSize;
    const y = row * cellSize;

    const textElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textElement.setAttribute("class", "text");
    textElement.setAttribute("x", x + cellSize / 2);
    textElement.setAttribute("y", y + cellSize / 2 + 20);
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("font-family", "Wittingau");
    const tspanElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "tspan"
    );
    tspanElement.textContent = letter + letter.toLowerCase();
    textElement.appendChild(tspanElement);
    svg.appendChild(textElement);

    observer.observe(textElement);
  });

  const karakter = document.getElementById("karakter");
  const symbols = "0123456789!@$%&*:;',.".split("");

  symbols.forEach((symbol, index) => {
    const col = index % 5;
    const row = Math.floor(index / 5);
    const x = col * cellSize;
    const y = row * cellSize;

    const textElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textElement.setAttribute("class", "text");
    textElement.setAttribute("x", x + cellSize / 2);
    textElement.setAttribute("y", y + cellSize / 2 + 20);
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("font-family", "Wittingau");
    const tspanElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "tspan"
    );
    tspanElement.textContent = symbol;
    textElement.appendChild(tspanElement);
    karakter.appendChild(textElement);

    observer.observe(textElement);
  });

  // ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

  const buttons = document.querySelectorAll("button");
  const changeFontElement = document.querySelector(".changeFont");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const parentClass = button.parentNode.className;
      const style = getComputedStyle(button.parentNode);

      const fontSize = style.getPropertyValue("--font-size") || "16px";
      const translateY = style.getPropertyValue("--translate-y") || "0";

      changeFontElement.style.fontFamily = parentClass;
      changeFontElement.style.fontSize = fontSize;
      changeFontElement.style.transform = `translateY(${translateY})`;
    });
  });

  const elements = document.getElementsByClassName("changeFont");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("dblclick", function () {
      this.setAttribute("contenteditable", "true");
    });
    elements[i].addEventListener("input", function () {
      var maxLength = parseInt(this.getAttribute("data-maxlength"), 10);
      if (this.textContent.length > maxLength) {
        this.textContent = this.textContent.slice(0, maxLength);
        this.removeAttribute("contenteditable");
      }
    });
    elements[i].addEventListener("blur", function () {
      this.removeAttribute("contenteditable");
    });
  }

  // ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

  const popUp = document.querySelector(".pop-up");

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("circle")) {
      popUp.style.display = "block";
      popUp.textContent = e.target.dataset.info;
    } else if (e.target !== popUp && !popUp.contains(e.target)) {
      popUp.style.display = "none";
    }
  });

  const texturaButton = document.getElementById("texturaButton");
  const rotundaButton = document.getElementById("rotundaButton");
  const schwabacherButton = document.getElementById("schwabacherButton");
  const frakturButton = document.getElementById("frakturButton");
  const originalText = document.getElementById("originalText");

  texturaButton.addEventListener("click", function () {
    changeText("Textura");
  });

  rotundaButton.addEventListener("click", function () {
    changeText("Rotunda");
  });

  schwabacherButton.addEventListener("click", function () {
    changeText("Schwabacher");
  });

  frakturButton.addEventListener("click", function () {
    changeText("Fraktur");
  });

  document.addEventListener("click", function (event) {
    if (
      !event.target.matches(
        "#texturaButton, #rotundaButton, #schwabacherButton, #frakturButton"
      )
    ) {
      originalText.textContent =
        "Blackletter schrift bestaat uit vier hoofdstijlen: Textura, Rotunda, Schwabacher en Fraktur. Varianten hierop ontstonden door een mix van deze stijlen. Door de eeuwen heen beïnvloedden factoren als regio, opleiding, beschikbare materialen, religie en politiek hoe schrift werd geschreven.";
    }
  });

  function changeText(font) {
    var newText;
    switch (font) {
      case "Textura":
        newText =
          "Textura, ook bekend als Textualis, was een prominente middeleeuwse schrijfstijl die vooral in de 11e en 12e eeuw in Europa werd gebruikt voor het produceren van met de hand geschreven manuscripten, voor de uitvinding van de drukpers. De Textualis Quadrata, een specifieke variant van deze schrijfstijl, staat bekend om zijn strakke en smalle lettervormen.";
        break;
      case "Rotunda":
        newText =
          "Rotunda, ontstaan in Italië, is de zus van Textualis in Zuid-Europa. Het lijkt ook meer op Karolingische minuskel. De naam komt van 'rotundus', wat verwijst naar een ronde plattegrond. Rotunda letters zijn meer afgerond en daardoor leesbaarder dan Textualis, zelfs in smalle vormen. ";
        break;
      case "Schwabacher":
        newText =
          "Schwabacher, was voornamelijk in gebruik in Duitsland in de 14e en 15e eeuw, maar kwam ook voor in Zwitserland. Van de late 14e eeuw tot de vroege 15e eeuw was het de meest gebruikte lettertype voor gedrukte teksten in Duitsland. Het is een combinatie van afgeronde vormen met de formele ‘textualis lijnen’.";
        break;
      case "Fraktur":
        newText =
          "Keizer Maximiliaan vond de textualis teksten te moeilijk lezen. Hij liet daarom een nieuw lettertype ontwerpen: Fraktur. Dit ‘gebroken’ en hoekige lettertype was leesbaarder en werd al snel populair in Duitstalige gebieden. Fraktur bleef tot het begin van de 20e eeuw het dominante lettertype voor gedrukte tekst.";
        break;
      default:
        newText =
          "Blackletter schrift bestaat uit vier hoofdstijlen: Textura, Rotunda, Schwabacher en Fraktur. Varianten hierop ontstonden door een mix van deze stijlen. Door de eeuwen heen beïnvloedden factoren als regio, opleiding, beschikbare materialen, religie en politiek hoe schrift werd geschreven.";
    }
    originalText.textContent = newText;
  }
});

// ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

const images = document.querySelectorAll("img");

images.forEach((image, index) => {
  image.addEventListener("click", function () {
    document.getElementById("zoomedImg").src = this.src;
    document.getElementById("zoomedImage").style.display = "block";
  });
});

document.getElementById("zoomedImage").addEventListener("click", function () {
  this.style.display = "none";
});

// ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀

var h2Elements = document.querySelectorAll("h2");
var index = 0,
  isAdding = true;
var textsToBeTyped = [];

h2Elements.forEach(function (h2Element) {
  textsToBeTyped.push(h2Element.innerText);
  var h2Height = h2Element.offsetHeight; 
  h2Element.style.height = h2Height + "px"; 
  h2Element.innerText = "";
});

function playAnim(h2Element) {
  setTimeout(function () {
    var h2Index = Array.from(h2Elements).indexOf(h2Element);

    h2Element.innerText = textsToBeTyped[h2Index].slice(0, index);

    if (isAdding) {
      if (index >= textsToBeTyped[h2Index].length) {
        isAdding = false;
        index = 0;
        h2Element.style.height = "";
        return;
      } else {
        index++;
      }
    } else {
      if (index === 0) {
        isAdding = true;
      } else {
        index--;
      }
    }
    playAnim(h2Element);
  }, 120);
}

function playAnimationOnce(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      var h2Element = entry.target;
      playAnim(h2Element);
      observer.unobserve(h2Element);
    }
  });
}

const observer = new IntersectionObserver(playAnimationOnce);

h2Elements.forEach((h2Element) => {
  observer.observe(h2Element);
});
