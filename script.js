const items = [
    {
        title: "Увлажняющий консилер для глаз",
        tags: ["Новинка"],
        price: 2800,
        img: "./img/concealer.jpeg",
        rating: 4.1,
    },
    {
        title: "Укрепляющий бальзам для волос",
        tags: ["Эксклюзивно", "ХИТ"],
        price: 922,
        img: "./img/conditioner.jpeg",
        rating: 4.6,
    },
    {
        title: "Увлажняющий лифтинг-крем с виноградом",
        tags: ["ХИТ"],
        price: 3400,
        img: "./img/cream.jpeg",
        rating: 4.7,
    },
    {
        title: "Помада-бальзам для губ с витамином E",
        tags: ["Новинка"],
        price: 1870.00,
        img: "./img/lipstick.jpeg",
        rating: 3.8,
    },
    {
        title: "Кремовые жидкие румяна для лица",
        tags: ["Новинка"],
        price: 1500,
        img: "./img/liquid-blush.jpeg",
        rating: 4.4,
    },
    {
        title: "Маска для увлажнения и питания волос",
        tags: ["Эксклюзивно", "ХИТ"],
        price: 1230,
        img: "./img/mask-for-hair.jpeg",
        rating: 5.0,
    },
    {
        title: "Туалетная вода «Жасмин»",
        tags: ["ХИТ"],
        price: 5000,
        img: "./img/parfum.jpeg",
        rating: 4.9,
    },
    {
        title: "Матирующая пудра для лица",
        tags: ["Новинка"],
        price: 800,
        img: "./img/powder.jpeg",
        rating: 4.6,
    },
    {
        title: "Шампунь для окрашенных волос",
        tags: [],
        price: 1500,
        img: "./img/shampoo.jpeg",
        rating: 3.3,
    },
    {
        title: "Увлажняющая сыворотка для лица",
        tags: [],
        price: 1180,
        img: "./img/serum.jpeg",
        rating: 4.2,
    },
    {
        title: "Пудра для создания объема волос",
        tags: ["Эксклюзивно"],
        price: 640,
        img: "./img/powder-for-hair.jpeg",
        rating: 4.4,
    },
    {
        title: "Парфюмерная вода «Пока ты рядом»",
        tags: ["Эксклюзивно", "Новинка"],
        price: 3580,
        img: "./img/parfum-new.jpeg",
        rating: 4.4,
    },
];

const itemsContainer = document.querySelector('#shop-items');
const itemTemplate = document.querySelector('#item-template');

function createItemCard(shopItem) {
    const { title, tags, price, img, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} руб`;

    const ratingContainer = item.querySelector('.rating');
    for (let i = 0; i < rating; i++) {
        const like = document.createElement("i");
        like.classList.add("fa-solid", "fa-heart");
        ratingContainer.append(like);
    };

    const tagsHolder = item.querySelector('.tags');
    tags.forEach((tag) => {
        const element = document.createElement('span');
        element.textContent = tag;
        element.classList.add('tag');
        tagsHolder.append(element);
    });

    return item;
};

let currentItems = [...items];
const nothingFound = document.querySelector('#nothing-found');

function usedItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
        itemsContainer.append(createItemCard(item));
    });

    if(!arr.length) {
        nothingFound.textContent = 'Ничего не найдено';
    };
};

usedItems(currentItems.sort((a, b) => sortByAlphabet(a, b)));

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    };

    if (a.title < b.title) {
        return -1;
    };

    return 0;
};

const sortControl = document.querySelector('#sort');

sortControl.addEventListener ('change', (event) => {
    const selectedSort = event.target.value;

    switch(selectedSort) {
        case "expensive": {
            currentItems.sort((a, b) => b.price - a.price)
            break;
        }
        case "cheap": {
            currentItems.sort((a, b) => a.price - b.price)
            break;
        }
        case "rating": {
            currentItems.sort((a, b) => b.rating - a.rating)
            break;
        }
        case "alphabet": {
            currentItems.sort((a, b) => sortByAlphabet(a, b))
            break;
        }
    }

    usedItems(currentItems);
});

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');

function applySearch() {
    const searchText = searchInput.value.toLowerCase().trim();

    currentItems = items.filter((el) =>
        el.title.toLowerCase().trim().includes(searchText)
    );

    currentItems.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;

    usedItems(currentItems);
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);