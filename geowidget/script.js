const city = document.getElementById('city');
const button = document.getElementById('button');

const getNearCity = (x, y) => {
    let currentCountry = [];
    let cityArr = [];

    currentCountry = window.cities.filter(obj => obj.country === 'RU') //ручная выборка по стране

    for (let i = 0; i < currentCountry.length; i++) {
        let distance = Math.sqrt(Math.pow((currentCountry[i].lat - x), 2) + Math.pow((currentCountry[i].lng - y), 2));
        let cityObj = {};
        cityObj.cityName = currentCountry[i].name;
        cityObj.distance = distance;
        cityArr[i] = cityObj;
    }
 
    cityArr = cityArr.sort((a,b) => a.distance > b.distance ? 1 : -1);
    
    return city.textContent = cityArr[0].cityName;
}

navigator.geolocation.getCurrentPosition((data) => {
    let latitude = data.coords.latitude;
    let longitude = data.coords.longitude;

    getNearCity(latitude, longitude);
})
