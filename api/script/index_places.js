document.addEventListener("DOMContentLoaded", () => {
    const placesList = document.getElementById('places-list');
    const countryFilter = document.getElementById('country-filter');

    const loadPlaces = async (country = 'all') => {
        try {
            const response = await fetch('http://127.0.0.1:5000/places');
            const places = await response.json();
            displayPlaces(places, country);
        } catch (error) {
            console.error('Error loading places:', error);
        }
    };

    const displayPlaces = (places, country) => {
        placesList.innerHTML = '';
        const filteredPlaces = country === 'all' ? places : places.filter(place => place.country_name === country);

        filteredPlaces.forEach(place => {
            const placeCard = document.createElement('div');
            placeCard.classList.add('place-card');

            const location = `${place.city_name}, ${place.country_name}`;
            const imgSrc = `/images/${place.id}.png`;

            placeCard.innerHTML = `
                <img src="${imgSrc}" alt="${place.id}">
                <div class="place-info">
                    <h2>${place.id}</h2>
                    <p>Price per night: $${place.price_per_night}</p>
                    <p>Location: ${location}</p>
                    <button class="details-button" data-id="${place.id}">View Details</button>
                </div>
            `;

            placeCard.querySelector('.details-button').addEventListener('click', () => {
                window.location.href = `place.html?id=${place.id}`;
            });

            placesList.appendChild(placeCard);
        });
    };

    countryFilter.addEventListener('change', () => {
        const selectedCountry = countryFilter.value;
        loadPlaces(selectedCountry);
    });

    loadPlaces();
});
