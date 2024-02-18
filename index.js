const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".location");
const dateField = document.querySelector(".date");
const emojiField = document.querySelector(".desc img");
const weatherField = document.querySelector(".desc span");
const searchField = document.querySelector(".search");
const form = document.querySelector("form");
let target = "kolkata";

const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=61b0212bb32344ee97f162026241602&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        // Destructuring
        const {
            current: {
                temp_c,
                condition: { text, icon },
            },
            location: { name, localtime },
        } = data;

        // Calling update Dom Function
        updateDom(temp_c, name, icon, text, localtime);
        backgroundChange(text); // Call backgroundChange function here passing the 'text' variable
    } catch (error) {
        alert("Location not found");
    }
};

function updateDom(temp, location, emoji, text, time) {
    temperatureField.innerText = temp;
    locationField.innerText = location;
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();
    dateField.innerText = `${exactTime}-${getDayFullName(exactDay)} ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;
}

// Function to get the name of day
function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";

        default:
            return "Don't Know";
            break;
    }
}

// Function to search the location
form.addEventListener("submit", (e) => {
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
});
//function to change the background
function backgroundChange(text) {
    if (text == "Mist") {
        document.body.style.backgroundImage = "url('https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/foggy-morning-in-a-meadow.jpg')";
    } else if (text == "Overcast") {
        document.body.style.backgroundImage = "url('https://qph.cf2.quoracdn.net/main-qimg-31e2a37481de26930f4460c46e09d4d1-lq')";
    } else if (text == "Rainy") {
        document.body.style.backgroundImage = "url('https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs= ')";
    }
    else if (text == "Partly cloudy") {
        document.body.style.backgroundImage = "url('https://media.istockphoto.com/id/598222542/photo/sky-background.jpg?s=612x612&w=0&k=20&c=WBAiCExAztT4SzWh4hIgmQwTG7VMJ5o9oObXHszmm8A=')";
    }
    else if (text == "Sunny") {
        document.body.style.backgroundImage = "url('https://img.resized.co/lovindublin_com/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL2ltYWdlcy5sb3ZpbmR1Ymxpbi5jb21cXFwvdXBsb2Fkc1xcXC9pbWFnZXNcXFwvX3JlbGF0ZWRFbnRyeUltYWdlMnhcXFwvU2NyZWVuLVNob3QtMjAxNy0wNS0wNi1hdC0xMy4yNC4wMi5wbmdcIixcIndpZHRoXCI6NzM2LFwiaGVpZ2h0XCI6NDEyLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC9kMjZoZTAzOGE3MGRncy5jbG91ZGZyb250Lm5ldFxcXC93cC1jb250ZW50XFxcL3RoZW1lc1xcXC9sb3ZpblxcXC9hc3NldHNcXFwvaW1nXFxcL2NhcmQtZGVmYXVsdC1sb3Zpbi1kdWJsaW4ucG5nXCIsXCJvcHRpb25zXCI6e1wib3V0cHV0XCI6XCJ3ZWJwXCJ9fSIsImhhc2giOiI3MzZiMDRjZTRmM2ZiMjlkZDdjMmU2NjQ2OWE3MTI0Njc4MzYyYmM2In0=/grey-skies-begone-the-sunny-weather-will-return-tomorrow.png')";
    }
    else if (text == "Fog") {
        document.body.style.backgroundImage = "url('https://img.etimg.com/thumb/width-1200,height-900,imgsize-25918,resizemode-75,msid-99974427/news/india/unusual-weather-fog-in-delhi-in-hottest-month-of-year.jpg')";
    }
    
     else {
        document.body.style.backgroundImage = "url('https://s7d2.scene7.com/is/image/TWCNews/img_3214_jpg-2')";
    }
}
