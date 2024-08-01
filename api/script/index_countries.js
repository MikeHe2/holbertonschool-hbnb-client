document.addEventListener('DOMContentLoaded', function() {
  const countryFilter = document.getElementById('country-filter');

  const loadCountries = async () => {
      try {
          const response = await fetch('/api/data/countries.json');
          const countries = await response.json();
          populateCountryFilter(countries);
      } catch (error) {
          console.error('Error :', error);
      }
  };

  const populateCountryFilter = (countries) => {
      const allOption = document.createElement('option');
      allOption.value = 'all';
      allOption.textContent = 'All';
      countryFilter.appendChild(allOption);

      countries.forEach(country => {
          const option = document.createElement('option');
          option.textContent = country.name;
          countryFilter.appendChild(option);
      });
  };

  loadCountries();
});
