// Pokemon cries
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