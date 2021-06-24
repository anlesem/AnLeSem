let button = document.getElementById('burger');

let navigation = document.getElementById('menu');

let cls = document.getElementById('close');

button.addEventListener('click', function () {
    navigation.classList.toggle('display-block');
});

cls.addEventListener('click', function () {
    navigation.classList.toggle('display-block');
});
