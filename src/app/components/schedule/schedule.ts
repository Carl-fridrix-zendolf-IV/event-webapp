import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'schedule',
    templateUrl: './schedule.html'
})
export class ScheduleComponent {
    private schedule: Array<any>;
    private days: Array<any>;
    private index: number = 0;
    private item: any;

    constructor (private route: ActivatedRoute, private router: Router) {
        this.schedule = [
            {
                day: "День 1",
                date: "5 апреля",
                year: '2017',
                separate: false,
                event_title: null,
                events: [
                    {
                        time: "10:30",
                        event: "Встреча в Домодедово"
                    },
                    {
                        time: "13:30 - 15:40",
                        event: "Рейс 9405 Москва (Домодедово) - Тиват"
                    },
                    {
                        time: "15:40 - 16:10",
                        event: "Получение багажа"
                    },
                    {
                        time: "16:10 - 16:40",
                        event: "Трансфер в отель"
                    },
                    {
                        time: "16:40 - 17:10",
                        event: "Регистрация"
                    },
                    {
                        time: "17:10 - 18:00",
                        event: "Свободное время"
                    },
                    {
                        time: "18:00 - 19:00",
                        event: "Приветственный коктейль в Бризер Баре"
                    },
                    {
                        time: "19:00 - 21:00",
                        event: "Ужин в ресторане Бруно"
                    }
                ]
            },
            {
                day: "День 2",
                date: "6 апреля",
                year: '2017',
                separate: true,
                event_title: [{
                    main: 'Nissan brands group',
                    sub: "(Дилеры Nissan, Infiniti, Datsun)"
                },{
                    main: 'Renault group',
                    sub: ''
                }],
                events: [
                    [
                        {
                            time: "07:00 – 09:00",
                            event: "Завтрак в Бризер Баре"
                        },
                        {
                            time: "09:00 – 09:30",
                            event: "Регистрация на конференцию"
                        },
                        {
                            time: "09:30 – 11:00",
                            event: "Конференция"
                        },
                        {
                            time: "12:00 – 13:00",
                            event: "Обед в Бризер Баре"
                        },
                        {
                            time: "14:00 – 17:00",
                            event: "Экскурсия “Cтаринный город Котор”"
                        },
                        {
                            time: "17:00 – 19:00",
                            event: "Свободное время"
                        },
                        {
                            time: "19:00 – 24:00",
                            event: "Гала-ужин в ресторане Бруно"
                        }
                    ],
                    [
                        {
                            time: "07:00 – 10:00",
                            event: "Завтрак в Бризер Баре"
                        },
                        {
                            time: "10:00 – 13:00",
                            event: "Экскурсия “Cтаринный город Котор”"
                        },
                        {
                            time: "13:00 – 14:00",
                            event: "Обед в Бризер Баре"
                        },
                        {
                            time: "15:00 – 15:30",
                            event: "Регистрация на конференцию"
                        },
                        {
                            time: "15:30 – 17:00",
                            event: "Конференция"
                        },
                        {
                            time: "17:00 – 19:00",
                            event: "Свободное время"
                        },
                        {
                            time: "19:00 – 24:00",
                            event: "Гала-ужин в ресторане Бруно"
                        }
                    ]
                ]
            },
            {
                day: "День 3",
                date: "7 апреля",
                year: '2017',
                separate: false,
                event_title: null,
                events: [
                    {
                        time: "07:00 – 09:00",
                        event: "Завтрак в ресторане Бруно"
                    },
                    {
                        time: "09:00 – 09:30",
                        event: "Выезд"
                    },
                    {
                        time: "09:30 – 10:00",
                        event: "Трансфер в аэропорт"
                    },
                    {
                        time: "10:00 – 12:00",
                        event: "Оформление багажа"
                    },
                    {
                        time: "12:00 – 16:10",
                        event: "Рейс 9406 Тиват - Москва (Домодедово) "
                    }
                ]
            }
        ];
    }

    ngOnInit () {
        this.route.params.subscribe((params) => {
            this.index = Number(params['id']);
            this.item = this.schedule[this.index];
        })
    }
}
