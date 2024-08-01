document.addEventListener("DOMContentLoaded", () => {
    const placesList = document.getElementById('places-list');

    const loadPlaces = async () => {
        try {
            const response = await fetch('/api/data/places.json');
            const places = await response.json();
            displayPlaces(places);
        } catch (error) {
            console.error('Error loading places:', error);
        }
    };

    const displayPlaces = (places) => {
        places.forEach(place => {
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
    loadPlaces();
});
