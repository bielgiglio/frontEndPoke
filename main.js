let currentPokemonId;

    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };

    async function fetchPokemon(identifier) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            const data = await response.json();

            currentPokemonId = data.id;

            document.getElementById('pokemonName').style.display = 'block';
            document.getElementById('pokemonImage').style.display = 'block';
            document.getElementById('pokemonInfo').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none'; 

            document.getElementById('pokemonName').innerText = data.name;
            document.getElementById('pokemonImage').src = data.sprites.front_default;
            document.getElementById('pokemonInfo').innerText = `ID: ${data.id} | Altura: ${data.height} | Peso: ${data.weight}`;

            const pokemonType = data.types[0].type.name;

            document.body.style.backgroundColor = typeColors[pokemonType] || '#f0f0f5';
        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error);
            clearPokemonInfo();
            document.getElementById('errorMessage').style.display = 'block';
        }
    }

    function searchPokemon() {
        const pokemonInput = document.getElementById('pokemonInput').value.trim().toLowerCase();
        if (pokemonInput) {
            fetchPokemon(pokemonInput);
        }
    }

    function nextPokemon() {
        if (currentPokemonId) {
            fetchPokemon(currentPokemonId + 1);
        }
    }

    function previousPokemon() {
        if (currentPokemonId && currentPokemonId > 1) {
            fetchPokemon(currentPokemonId - 1);
        }
    }

    function clearPokemonInfo() {
        document.getElementById('pokemonName').innerText = "";
        document.getElementById('pokemonImage').src = "";
        document.getElementById('pokemonInfo').innerText = "";

        document.getElementById('pokemonName').style.display = 'none';
        document.getElementById('pokemonImage').style.display = 'none';
        document.getElementById('pokemonInfo').style.display = 'none';
    }

    window.onload = function() {
        fetchPokemon(1);
    };

    document.getElementById('pokemonInput').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchPokemon();
        }
    });