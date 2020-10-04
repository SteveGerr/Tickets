// Импортируем инстансы
import {getAutocompleteInstance, getDatePickerInstance} from "../plugins/materialize";

class FormUI {
    constructor(autocompleteInstance, datePickerInstance ) {
        this._form = document.forms["locationControls"];
        this.origin = document.getElementById("autocomplete-origin");
        this.destination = document.getElementById("autocomplete-destination");
        this.depart = document.getElementById("datepicker-depart");
        this.return = document.getElementById("datepicker-return");

        //Инстансы(пример, экземпляр класса)
        /**
         * export function getDatePickerInstance(elem) {
           return M.Datepicker.getInstance(elem);
           }
         */
        this.originAutocomplite = autocompleteInstance(this.origin); //Инстансы из materialize
        this.destinationAutocomplite = autocompleteInstance(this.destination); //Инстансы из materialize
        this.departDatePicker = datePickerInstance(this.depart); //Инстансы из materialize
        this.returnDatePicker = datePickerInstance(this.return); //Инстансы из materialize

    }

    // Получение формы
    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value
    };

    get destinationValue() {
        return this.destination.value
    };

    get departDateValue() {
        return this.departDatePicker.toString();
    }

    get returnDateValue() {
        return this.returnDatePicker.toString();
    }



    setAutocompleteData(data) {
        this.originAutocomplite.updateData(data);
        this.destinationAutocomplite.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;