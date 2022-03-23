import { apiConfig }  from '../js/utils/constants.js';
import Api from '../js/api/Api.js';
import './index.css';
import Chart from 'chart.js/auto';


const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title'
            },
            legend: {
                display: true,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            },
        }
    }
});


const texts = document.querySelectorAll('.skill-item__description');
const windowHeight = window.innerHeight;
let namesRepos = [];
let langDict = {};


// создание объекта api
const api = new Api({
    baseUrl: apiConfig.url,
    username: apiConfig.username,
    headers: {
    //   'authorization': apiConfig.token,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
    },
});


function scrollFade() {
    texts.forEach(text => {
        const textPosition = text.getBoundingClientRect().top;
        if (textPosition < windowHeight / 1.5) {
            text.classList.add('skill-item__description_active');
        }
    })
}

function getLanguageData(namesArr) {
    namesArr.forEach((name) => {
        api.getRepoLanguage(name)
            .then((res) => {
                compileLanguageData(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.status}`);
            })
    });
}

function compileLanguageData(obj) {
    Object.entries(obj).forEach((lang) => {
        if (lang[0] in langDict) {
            langDict[lang[0]] = langDict[lang[0]] + lang[1];
        } else {
            langDict[lang[0]] = lang[1];
        }
    });
}

window.addEventListener('scroll', scrollFade);


let result = Promise.all([api.getMyRepos()])
    .then(([res]) => {
        let repos = res;
        repos.forEach((rep) => {
        namesRepos.push(rep.name);
        });
    })
    .then(() => {
        getLanguageData(namesRepos);
    })
    .then(() => {
        return langDict;
    })

console.log(result);
