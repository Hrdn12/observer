let news = [
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
        id: 2,
        text: 'Ea impedit laborum molestias, optio quisquam repudiandae rerum voluptate!'
    },
    {
        id: 3,
        text: 'Ab beatae cum id nisi numquam perspiciatis quibusdam suscipit temporibus!'
    },
    {
        id: 4,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id: 5,
        text: 'arcu risus quis varius quam'
    },
    {
        id: 6,
        text: 'est pellentesque elit ullamcorper dignissim'
    },
    {
        id: 7,
        text: 'orci porta non pulvinar neque'
    },
    {
        id: 8,
        text: 'aliquam ultrices sagittis orci'
    }
];

class Observer {

    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        if (this.observers.indexOf(fn) === -1) this.observers.push(fn);
    }

    unsubscribe(fn) {
        if (this.observers.indexOf(fn) !== -1) this.observers.splice(this.observers.indexOf(fn), 1);
    }

    broadcast(data) {
        setTimeout(() => {
            this.observers.forEach(subscriber => subscriber(data));
        });
    }
}


class User {
    constructor(name, img) {
        this.name = name;
        this.img = img;

        this.getNews = this.getNews.bind(this);
        // this.addItem = this.addItem.bind(this);
    }

    getNews(data) {
        let now = new Date(),
            hh = now.getHours(),
            mm = now.getMinutes(),
            ss = now.getSeconds();

        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        if (ss < 10) ss = '0' + ss;

        let textnode = document.createTextNode(`${data}`),
            node = document.createElement('LI'),
            title = document.createElement('h6'),
            list = document.querySelector(`#${this.name}`).querySelector('.news');

        list.appendChild(node);
        node.appendChild(title).innerHTML = `${hh}:${mm}:${ss}`;
        node.appendChild(textnode);
    }
    
    addItem (ul) {
        let user = this,
            list = ul,
            li = document.createElement('LI'),
            title = document.createElement('h3'),
            addimg= document.createElement('img'),
            btn = document.createElement('button'),
            news = document.createElement('ul');

        li.classList.add('flex-item');
        li.id = `${this.name}`;
        btn.id = `#${this.name}Button`;
        btn.innerHTML = 'Subscribe';

        list.appendChild(li);
        li.appendChild(title).innerHTML = `${this.name}`;
        li.appendChild(addimg).src = `${this.img}`;
        li.appendChild(btn).classList.add('btn', 'sub');
        li.appendChild(news).classList.add('news');

        for (let key in document.querySelectorAll('.sub')) {
            let all = document.querySelectorAll('.sub')[key].classList;
            for (let k in document.querySelectorAll('.sub')[key].classList) {
                document.querySelectorAll('.sub')[key].classList.add('off');
                document.querySelectorAll('.sub')[key].classList.remove('on');
            }
        }

        btn.addEventListener("click", function () {
            let arr = this.classList;
            for (let key in arr) {
                if (arr[key] === 'off') {
                    observer.subscribe(user.getNews);
                    this.innerHTML = 'Unsubscribe';
                }
                if (arr[key] === 'on') {
                    observer.unsubscribe(user.getNews);
                    this.innerHTML = 'Subscribe';
                }
            }
            this.classList.toggle('on');
            this.classList.toggle('off');
        });
    }
}


const observer = new Observer();

let Dima = new User('Dima', 'http://via.placeholder.com/300x150'),
    Andy = new User('Andy', 'http://via.placeholder.com/300x150'),
    Joe = new User('Joe', 'http://via.placeholder.com/300x150');

let users = document.querySelector('.flex-container'),
    textField = document.querySelector('#textNews'),
    sendNews = document.querySelector('#sendNews');

Dima.addItem(users);
Andy.addItem(users);
Joe.addItem(users);

sendNews.addEventListener('click', () => {
    if (textField.value !== '') observer.broadcast(textField.value);
    textField.value = '';
});

// news.forEach((item, i, news) => {
//     setTimeout(function (y) {
//         observer.broadcast(news[y].text);
//     }, i * 5000, i);
// });