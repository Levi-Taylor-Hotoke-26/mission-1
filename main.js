// IMPORTS
import confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti/+esm'

/* CATCH PIKACHU/DITTO */
/* Track total catches */
let catchCount = 0;

/* Throw confetti */
const runningPikachu = document.querySelector('.pikachu-running');

if (runningPikachu) {
  const originalSrc = runningPikachu.src;
  const dittoCatch = "images/ditto.gif";

  // Play Pokemon Cry function
  async function playPokemonCry(pokemonName) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); // fetch attempt from API
      const data = await response.json();

      const cryURL = data.cries?.latest || data.cries?.legacy;

      // play cry
      if (cryURL) {
        const cry = new Audio(cryURL);
        cry.volume = 0.15;
        cry.play();
      } else {
        console.log(`No cry available for ${pokemonName}`); // error message
      }
    } catch (error) {
      console.error("Could not fetch Pokémon cry:", error); // error message
    }
  }

  // when pikachu/ditto clicked
  runningPikachu.addEventListener('click', async (event) => {
    // increment the catch count by 1
    catchCount += 1;

    // Throw confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.2 }
    });

    // move pikachu across page
    const rect = runningPikachu.getBoundingClientRect();

    // Create "catch" message div element
    const popup = document.createElement('div');

    // position "catch""
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top}px`;
    popup.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 1500);

    // Check every third count for ditto
    if (catchCount % 3 === 0) {
      // Ditto cry
      await playPokemonCry('ditto');

      // Display message
      popup.classList.add('nice-catch-popup-ditto');
      popup.textContent = `Whoa! A Ditto!`

      // turn into ditto for three seconds
      runningPikachu.style.pointerEvents = "none";
      runningPikachu.src = dittoCatch;

      // switch back to pikachu
      setTimeout(() => {
        runningPikachu.src = originalSrc;
        runningPikachu.style.pointerEvents = "auto";
      }, 3000);

    } else {
      // Pikachu cry
      await playPokemonCry('pikachu');

      // Display message
      popup.classList.add('nice-catch-popup-pikachu');
      popup.textContent = `You caught a Pikachu! (x${catchCount})`

      // Make Pikachu invisible and disable clicking during cooldown
      runningPikachu.style.opacity = '0';
      runningPikachu.style.pointerEvents = 'none';

      // Make Pikachu reappear after 3 seconds
      setTimeout(() => {
        runningPikachu.style.opacity = '1';
        runningPikachu.style.pointerEvents = 'auto';
      }, 3000);

    }
  });
}

// SHINY TOGGLE BTN
//Grab element
const shinyToggleInput = document.getElementById('shiny-toggle-input');

// When shiny toggle is changed
shinyToggleInput.addEventListener('change', () => {
  const isShiny = shinyToggleInput.checked;

  // check if shiny toggle is enabled
  document.body.classList.toggle('shiny-mode', isShiny);

  // if static class, change to hover class, and vice versa
  for (const card of pokemonCards) {
    const staticImg = card.querySelector('.pokemon-img.static');
    const hoverImg = card.querySelector('.pokemon-img.hover');

    if (staticImg && hoverImg) {
      let staticSrc = staticImg.getAttribute('src');
      let hoverSrc = hoverImg.getAttribute('src');

      // if shiny toggled, add or remove shiny class
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

// POKEMON CARD CRIES
const pokemonCards = document.querySelectorAll('.pokemon-card');

pokemonCards.forEach(card => {
  const nameElement = card.querySelector('.pokemon-name');

  if (nameElement) {
    // prevent name mismatch
    const pokemonName = nameElement.textContent.trim().toLowerCase();

    // when click
    card.addEventListener('click', async () => {
      // attempt to fetch from pokeAPI
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();

        const cryURL = data.cries?.latest || data.cries?.legacy;

        // play cry
        if (cryURL) {
          const cry = new Audio(cryURL);
          cry.volume = 0.15;
          cry.play();
        } else {
          console.log(`No cry available for ${pokemonName}`); // error message
        }
      } catch (error) {
        console.error("Could not fetch Pokémon cry:", error); // error message
      }
    });
  }
});

// CONTACT FORM
/* Prevent redirection when submitting contact message
   Send alert to user based on message success
   Clear input fields*/
const contactForm = document.querySelector('.contact-form');

// When submitted
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    // Prevent redirect to third party
    event.preventDefault();

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: contactForm.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => { // possible alerts
      if (response.ok) {
        alert("Thanks for your message! I'll get back to you soon!");
        contactForm.reset(); // reset contact form
      } else {
        alert("Sorry, there was a problem submitting your form.");
      }
    }).catch(error => {
      alert("Sorry, there was a connection error.");
    });
  });
}

// SCROLL TO TOP BTN
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Button only appears when page is 300px down
window.addEventListener("scroll", () => {
  window.scrollY > 300 ? scrollToTopBtn.style.display = "block" : scrollToTopBtn.style.display = "none";
})

// When button clicked send user to top of page
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});