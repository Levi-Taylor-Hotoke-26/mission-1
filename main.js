// IMPORTS
import confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti/+esm'

// POKEMON CRIES
const pokemonCards = document.querySelectorAll('.pokemon-card');

pokemonCards.forEach(card => {
  const nameElement = card.querySelector('.pokemon-name');

  if (nameElement) {
    const pokemonName = nameElement.textContent.trim().toLowerCase();

    card.addEventListener('click', async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();

        const cryURL = data.cries?.latest || data.cries?.legacy;

        if (cryURL) {
          const cry = new Audio(cryURL);
          cry.volume = 0.3;
          cry.play();
        } else {
          console.log(`No cry available for ${pokemonName}`);
        }
      } catch (error) {
        console.error("Could not fetch Pokémon cry:", error);
      }
    });
  }
});

// SHINY TOGGLE BTN
const shinyToggleInput = document.getElementById('shiny-toggle-input');

shinyToggleInput.addEventListener('change', () => {
  const isShiny = shinyToggleInput.checked;

  document.body.classList.toggle('shiny-mode', isShiny);

  for (const card of pokemonCards) {
    const staticImg = card.querySelector('.pokemon-img.static');
    const hoverImg = card.querySelector('.pokemon-img.hover');

    if (staticImg && hoverImg) {
      let staticSrc = staticImg.getAttribute('src');
      let hoverSrc = hoverImg.getAttribute('src');

      if (isShiny) {
        staticImg.src = staticSrc.replace('.png', '-shiny.png');
        hoverImg.src = hoverSrc.replace('.gif', '-shiny.gif');
      } else {
        staticImg.src = staticSrc.replace('-shiny.png', '.png');
        hoverImg.src = hoverSrc.replace('-shiny.gif', '.gif');
      }
    }
  };

});

/* Prevent redirection when submitting contact message
   Send alert to user based on message success
   Clear input fields*/
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: contactForm.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        alert("Thanks for your message! I'll get back to you soon!");
        contactForm.reset();
      } else {
        alert("Sorry, there was a problem submitting your form.");
      }
    }).catch(error => {
      alert("Sorry, there was a connection error.");
    });
  });
}

/* CATCH PIKACHU */

/* Track total catches */
let catchCount = 0;

/* catch Pikachu and throw confetti */
const runningPikachu = document.querySelector('.pikachu-running');

if (runningPikachu) {
  runningPikachu.addEventListener('click', (event) => {
    // Arithmetic operator: increment the catch count by 1
    catchCount += 1;

    // Throw confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.2 }
    });

    // Create "Nice Catch!" popup with updated count
    const popup = document.createElement('div');
    popup.classList.add('nice-catch-popup');

    // Display the message catchCount
    popup.textContent = `Nice Catch! (x${catchCount})`;

    const rect = runningPikachu.getBoundingClientRect();
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top}px`;
    popup.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 1500);

    // Make Pikachu invisible and disable clicking during cooldown
    runningPikachu.style.opacity = '0';
    runningPikachu.style.pointerEvents = 'none';

    // Make Pikachu reappear after 3 seconds
    setTimeout(() => {
      runningPikachu.style.opacity = '1';
      runningPikachu.style.pointerEvents = 'auto';
    }, 3000);
  });
}

// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});