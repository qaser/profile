import { apiConfig }  from '../js/utils/constants.js';
import Api from '../js/api/Api.js';
import './index.css';
import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart').getContext('2d');
const texts = document.querySelectorAll('.skill-item__description');
const windowHeight = window.innerHeight;
Chart.defaults.font.size = 20;
Chart.defaults.font.family = 'UbuntuMono';
let namesRepos = [];

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


function generateArrowOfColors(countLang) {
    let colors = [];
    for (let i = 0; i < countLang; i++) {
        colors.push(getRandomColor());
    };
    return colors;
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function getLanguageData(namesArr) {
    let newLang = new Object;
    let promList = [];
    namesArr.forEach((name) => {
        let prom = api.getRepoLanguage(name)
            .then((res) => {
                compileLanguageData(res, newLang);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.status}`);
            })
        promList.push(prom)
    });
    Promise.all(promList)
        .then(() => {
            const countLang = Object.keys(newLang).length;
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                  labels: Object.keys(newLang),
                  datasets: [
                    {
                      label: "Programming languages",
                      backgroundColor: generateArrowOfColors(countLang),
                      data: Object.values(newLang)
                    }
                  ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'My GitHub stats',
                            color: '#000',
                            padding: 0,
                            font: {
                                size: 30,
                            },
                        },
                        subtitle: {
                            text: 'Bytes of code',
                            display: true,
                            padding: 10,
                            color: '#000'
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                boxWidth: 14,
                                font: {
                                    size: 14,
                                }
                            }
                        },
                    }
                }
            });
        })
}


function compileLanguageData(obj, newObj) {
    Object.entries(obj).forEach((lang) => {
        if (lang[0] in newObj) {
            newObj[lang[0]] = newObj[lang[0]] + lang[1];
        } else {
            newObj[lang[0]] = lang[1];
        }
    });
}


api.getMyRepos()
    .then((res) => {
        let repos = res;
        repos.forEach((rep) => {
        namesRepos.push(rep.name);
        });
    })
    .then(() => {
        getLanguageData(namesRepos);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
    });

window.addEventListener('scroll', scrollFade);
