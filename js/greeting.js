const personalisedForm = document.querySelector('.personalisedForm');
const personalisedForm2 = document.querySelector('.personalisedForm2');
const personalisedButton = document.querySelector('#personalisedButton');
const displayName = document.querySelector('.userName');

personalisedForm.addEventListener("submit", function(event) {
    // prevent the form from submitting
    event.preventDefault();
    
    // Getting the values of the inputs
    const personalNameEl = document.querySelector('#personalisedName');
    const personalisedCityEl = document.querySelector('#personalisedCity');

    
    if(personalisedCityEl.value != "") {
        let weatherCity = personalisedCityEl.value;
        localStorage.setItem("city", weatherCity);
    }

    let personalisedName = capitalizeFirstLetter(personalNameEl.value);
    localStorage.setItem("user", personalisedName);

    // displayName.innerHTML = `Hey ${personalisedName}`;
    loadUser();
    loadWeather();

    // // close modal form
    $(".overlay").hide();

    // // personalisedForm.submit(); // submits form
    // // location.reload(true); // to reload page after submission
});

personalisedForm2.addEventListener("submit", function(event) {
    // prevent the form from submitting
    event.preventDefault();
    // saveSetting();
    
    // Getting the values of the inputs
    let personalisedNameEl = document.querySelector('#personalisedName2');
    const personalisedCityEl = document.querySelector('#personalisedCity2');

    
    
    if(personalisedCityEl.value != "") {
        let weatherCity = personalisedCityEl.value;
        localStorage.setItem("city", weatherCity);
    }

    // let personalisedName = personalisedNameEl.value;
    let personalisedName = capitalizeFirstLetter(personalisedNameEl.value);
    localStorage.setItem("user", personalisedName);


    // // close modal form
    $(".personalisedForm2").modal('hide');

    // personalisedForm2.submit(); // submits form
    location.reload(true); // to reload page after submission
});

function saveSetting() {
    let personalisedNameEl = document.querySelector('#personalisedName');
    const personalisedCityEl = document.querySelector('#personalisedCity');

    
    if(personalisedCityEl.value != "") {
        let weatherCity = personalisedCityEl.value;
        localStorage.setItem("city", weatherCity);
    }

    // let personalisedName = document.getElementById('personalisedName').value;
    let personalisedName = capitalizeFirstLetter(personalisedNameEl.value);
    localStorage.setItem("user", personalisedName);

    // displayName.innerHTML = `Hey ${personalisedName}`;
    loadUser();
    loadWeather();

    // close modal form
    $(".overlay").hide();

    // personalisedForm.submit(); // submits form
    // location.reload(true); // to reload page after submission
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadUser() {
    let storedUser = localStorage.getItem("user");
    if (storedUser === null || storedUser === "") {
        displayName.innerHTML = `Hey there!<i class="fa fa-bell bell-icon ml-4"></i>`;
    } else {
        // const parseCoords = JSON.parse(storedCity);
        displayName.innerHTML = `Hey ${storedUser}! <i class="fa fa-bell bell-icon ml-4"></i>`;
    } 
}


window.addEventListener("load", function() {
    if(localStorage.getItem('popState') != 'shown'){
            setTimeout(
                function open(event){
                    document.querySelector('.overlay').removeAttribute('style');
                    document.querySelector(".popup").style.display = "block";
                },
                1000
            )
        };
        localStorage.setItem('popState','shown')
});

document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".overlay").style.display = "none";
});

loadUser();