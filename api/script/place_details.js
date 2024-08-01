document.addEventListener("DOMContentLoaded", () => {
    const placeDetails = document.getElementById('place-details');
    const reviewsContainer = document.getElementById('reviews');

    const loadPlaceDetails = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const placeId = urlParams.get('id');

            const response = await fetch('/api/data/places.json');
            const places = await response.json();

            const place = places.find(p => p.id === placeId);

            if (place) {
                displayPlaceDetails(place);
                displayReviews(place.reviews);
            } else {
                placeDetails.innerHTML = '<p>Place not found.</p>';
            }
        } catch (error) {
            console.error('Error loading place details:', error);
            placeDetails.innerHTML = '<p>Error loading place details.</p>';
        }
    };

    const displayPlaceDetails = (place) => {
        const location = `${place.city_name}, ${place.country_name}`;

        placeDetails.innerHTML = `
            <div class="place-info place-details">
                <h1>${place.id}</h1>
                <br>
                <p><strong>Host:</strong> ${place.host_name}</p>
                <p><strong>Price per night:</strong> $${place.price_per_night}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Description:</strong> ${place.description}</p>
                <p><strong>Amenities:</strong> ${place.amenities.join(', ')}</p>
            </div>
        `;
    };

    const displayReviews = (reviews) => {
        reviewsContainer.innerHTML = '';

        if (reviews && reviews.length > 0) {
            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('review-card');

                reviewCard.innerHTML = `
                    <p><strong>${review.user_name}:</strong></p>
                    <p>${review.comment}</p>
                    <div class="stars">Rating: ${getStars(review.rating)}</div>
                `;

                reviewsContainer.appendChild(reviewCard);
            });
        } else {
            reviewsContainer.innerHTML = '<p>No reviews available.</p>';
        }
    };

    const getStars = (rating) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '★' : '☆';
        }
        return stars;
    };

    loadPlaceDetails();
});
