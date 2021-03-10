import api from '../services/apiService';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
  }
  async init() {
    //Получаем из АПИ страны и города
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.prices()
    ]);

    // ДЕструктурируем
    const [countries, cities] = response;
    this.countries = this.serializeCountries(countries); //Сюда попадает страна преобразованная методом serializeCountries(countries)
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    // console.log(this.createShortCitiesList(this.cities));

    return response;
  }

  createShortCitiesList(cities) {
    //     [key, value]           {"city, country": null}
    return Object.entries(cities).reduce((acc, [key]) => {
      acc[key] = null;

      return acc;
    }, {})
  }

  // Преобразуем Страны и города
  serializeCountries(countries) {
    // Преобразовываем в формат {"Country code": {...} }
    return countries.reduce((acc, country) => {
      // На каждой итерации, в новый объект помещаем под ключём кода страны её объект
      acc[country.code] = country;
      return acc; // Возвращаемое значение передаём в функцию init() в this.countries
    }, {});
  }

  serializeCities(cities) {
    // {"Cities name, Country name": {...}}
    return cities.reduce((acc, city) => {
      const country_name = this.getCitiesNameCode(city.country_code);
      //Ежели city.name есть, запсываем в переменную его, иначе name_translations.en
      const city_name = city.name || city.name_translations.en;
      // Формируем ключ
      const key = `${city_name},${country_name}`;
      acc[key] = city;

      return acc;
    }, {})

  }

  getCityCodeByKey(key) {
    return this.cities[key].code;
  }

  //Получение наазвания страны по коду
  getCitiesNameCode(code) {
    // {"Country code": { ... } }
    return this.countries[code].name;
  }

  // getCitiesByCountryCode(code) {
  //   return this.cities.filter(city => city.country_code === code);
  // }
  async fetchTickers(params) {
    const response = await this.api.prices(params);
    console.log(response);
    // return response;
  }
}

const locations = new Locations(api);

export default locations;


//{ "City, Country": null }
// [{}, {}]
// {"City": {...} } => cities[code]