import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    // public static API_URL: string = 'http://localhost:3000';
    public static API_URL: string = 'https://digital-wall.herokuapp.com';

    private menuItems: Array<any>;
    private showContentShadow: boolean;
    private showMenu: boolean;
    private showOverlay: boolean;
    private renderMenu: boolean;

    constructor (private route: ActivatedRoute, private router: Router) {
        this.menuItems = [
            {
                text: 'Главная страница',
                iconWhite: './assets/icons/white/home.png',
                iconBlack: './assets/icons/black/home.png',
                icon: './assets/icons/white/home.png',
                selected: false,
                shadow: false,
                state: ''
            },
            {
                text: 'О мероприятии',
                iconWhite: './assets/icons/white/about.png',
                iconBlack: './assets/icons/black/about.png',
                icon: './assets/icons/white/about.png',
                selected: false,
                shadow: true,
                state: 'about'
            },
            {
                text: 'Программа',
                iconWhite: './assets/icons/white/schedule.png',
                iconBlack: './assets/icons/black/schedule.png',
                icon: './assets/icons/white/schedule.png',
                selected: false,
                shadow: true,
                state: 'schedule',
                showChilds: false,
                childs: [
                    {
                        name: "День 1",
                        id: 0,
                        selected: false
                    },
                    {
                        name: "День 2",
                        id: 1,
                        selected: false
                    },
                    {
                        name: "День 3",
                        id: 2,
                        selected: false
                    }
                ]
            },
            {
                text: 'Отель',
                iconWhite: './assets/icons/white/hotel.png',
                iconBlack: './assets/icons/black/hotel.png',
                icon: './assets/icons/white/hotel.png',
                selected: false,
                shadow: true,
                state: 'hotel'
            },
            {
                text: 'Конференция',
                iconWhite: './assets/icons/white/conference.png',
                iconBlack: './assets/icons/black/conference.png',
                icon: './assets/icons/white/conference.png',
                selected: false,
                shadow: true,
                state: 'conference'
            },
            {
                text: 'Экскурсия',
                iconWhite: './assets/icons/white/excursions.png',
                iconBlack: './assets/icons/black/excursions.png',
                icon: './assets/icons/white/excursions.png',
                selected: false,
                shadow: true,
                state: 'excursion'
            },
            {
                text: 'Интересные места',
                iconWhite: './assets/icons/white/places.png',
                iconBlack: './assets/icons/black/places.png',
                icon: './assets/icons/white/places.png',
                selected: false,
                shadow: true,
                state: 'places'
            },
            {
                text: 'Контакты',
                iconWhite: './assets/icons/white/contacts.png',
                iconBlack: './assets/icons/black/contacts.png',
                icon: './assets/icons/white/contacts.png',
                selected: false,
                shadow: true,
                state: 'contacts'
            },
            {
                text: 'Вопросы организаторам',
                iconWhite: './assets/icons/white/questions.png',
                iconBlack: './assets/icons/black/questions.png',
                icon: './assets/icons/white/questions.png',
                selected: false,
                shadow: true,
                state: 'questions'
            },
            {
                text: 'Фото и Видео',
                iconWhite: './assets/icons/white/media.png',
                iconBlack: './assets/icons/black/media.png',
                icon: './assets/icons/white/media.png',
                selected: false,
                shadow: true,
                state: 'media',
                showChilds: false,
                childs: [
                  {
                    name: "Заезд и приветственный коктейль",
                    id: 0,
                    selected: false
                  },
                  {
                    name: "Конференция",
                    id: 1,
                    selected: false
                  },
                  {
                    name: "Экскурсия",
                    id: 2,
                    selected: false
                  },
                  {
                    name: "Гала-ужин",
                    id: 3,
                    selected: false
                  }
                ]
            }
        ]
    }

    ngOnInit () {
        let hash = location.hash.replace(/\#\//g,'');

        for(let i=0; i < this.menuItems.length; i++) {
            let item = this.menuItems[i];

            if (item.state === location.hash.replace(/\#\//g,'')) {
                item.selected = true;
                this.showContentShadow = item.shadow;
                item.icon = item.iconBlack;
            }
            else if ((hash.indexOf('schedule') > -1) && item.state == 'schedule') {
                item.selected = true;
                item.showChilds = true;
                item.icon = item.iconBlack;

                this.showContentShadow = item.shadow;
                let child = hash.split('/').pop();
                item.childs.map(ch => {ch.selected = (ch.id == Number(child)) ? true : false});
                break;
            }
            else if ((hash.indexOf('media') > -1) && item.state == 'media') {
                item.selected = true;
                item.showChilds = true;
                item.icon = item.iconBlack;

                this.showContentShadow = item.shadow;
                let child = hash.split('/').pop();
                item.childs.map(ch => {ch.selected = (ch.id == Number(child)) ? true : false});
                break;
            }
        }
    }

    openPage (item: any) :void {
        this.showContentShadow = item.shadow;
        this.menuItems.map(i => {
            i.selected = false;
            i.showChilds = false;
            i.icon = i.iconWhite;
        });

        if (item.state == 'media') {
            this.hideMenu()
            this.router.navigate([item.state, 'main']);
            item.showChilds = true;
        }
        else if (item.childs) {
            item.showChilds = true;
        }
        else {
            this.hideMenu()
            this.router.navigate([item.state]);
        }

        item.selected = true;
        item.icon = item.iconBlack;
    }

    openChildPage (child: any, item: any) :void {
        this.hideMenu()

        item.childs.map(i => {return i.selected = false;})
        child.selected = true;

        this.router.navigate([item.state, child.id.toString()]);

        let a = document.getElementsByClassName('page');
        setTimeout(() => {
            a[0].scrollTop = 0;
        }, 0);
    }

    openMenu () :void {
        this.renderMenu = true;
        setTimeout(() => {
            this.showMenu = true;
            this.showOverlay = true;
        }, 200);
    }

    hideMenu () :void {
        this.showMenu = false;
        this.showOverlay = false;
        setTimeout(() => {this.renderMenu = false;}, 800);
    }
}
