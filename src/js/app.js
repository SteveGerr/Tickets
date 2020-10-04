import './plugins';
import '../css/style.css';
import locations from './store/locations';
import formUI from "./views/form";
import currencyUI from "./views/currency";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;

  //Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  })

  async function initApp() {
    //Получаем все данные
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    //Получаем данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue); //Геттеры из FormUI
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    //code, code, 2020-10, 2020-11
    console.log(origin, destination, depart_date, return_date);
    await locations.fetchTickers({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    })
  }
})

// locations.init().then(res => {
//   console.log(res);
//   console.log(locations);
// });
