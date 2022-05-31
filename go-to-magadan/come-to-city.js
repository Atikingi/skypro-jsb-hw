document.addEventListener('DOMContentLoaded', () => {
    const cityName = document.querySelector('.city-name');
    const params = (new URL(document.location)).searchParams;
    const cityValue = params.get('city');

    cityName.textContent = `Еду в ${cities[cityValue]}`
})
