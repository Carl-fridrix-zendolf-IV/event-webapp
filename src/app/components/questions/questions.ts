import { Component, ElementRef, ViewChild } from '@angular/core';
import { GetSpeakers, InitUser, InitChat, GetMessages, PutMessage } from '../../services/http';
import { AppComponent } from '../../app.component';
declare var io: any;


@Component({
    selector: 'questions',
    templateUrl: './questions.html'
})
export class QuestionsComponent {
    @ViewChild('messagesContainer') el:ElementRef;

    private user: any = {speaker: 0};
    private speakers: Array<any> = new Array();
    private actionBlock: string = 'BUTTON';
    private error: string;
    private showPopUp: boolean;
    private messages: Array<any> = new Array();
    private message: string;
    private sendDisable: boolean;
    private room: any;

    constructor (private loadSpeakers: GetSpeakers, private initUser: InitUser, private initChat: InitChat, private loadMessages: GetMessages, private putMessage: PutMessage) {
        if (!localStorage.getItem('CHAT_USER_ID')) {
            this.showPopUp = true;
        }
        else {
            this.showPopUp = false;
            this.user.id = localStorage.getItem('CHAT_USER_ID');
            let user = JSON.parse(localStorage.getItem('CHAT_USER_INFO'));

            this.user.chat_id = localStorage.getItem('CHAT_ROOM_ID');

            this.user.firstname = user['name'].firstname;
            this.user.lastname = user['name'].lastname;
            this.user.phone = user['phone'];
            this.user.email = user['email'];

            this.loadMessageHistory();
        }
    }

    ngOnInit () { }

    disableFunc () {
        if (!this.user.firstname) {
            return true;
        }
        // else if (!this.user.lastname) {
        //     return true;
        // }
        // else if (!this.user.phone) {
        //     return true;
        // }
        // else if (!this.user.email) {
        //     return true;
        // }
        else {
            return false;
        }
    }

    setUser () {
        this.actionBlock = 'LOADING';

        if (this.user.id)
            return this.initChatRoom();


        let name = {
            firstname: this.user.firstname,
            lastname: this.user.lastname
        }

        let body = {
            name: name,
            email: this.user.email,
            phone: this.user.phone,
            event: 'RN_BANK',
            speaker: false
        };

        this.initUser.request(body).subscribe(data => {
            localStorage.setItem('CHAT_USER_ID', data._id);
            localStorage.setItem('CHAT_USER_INFO', JSON.stringify(body));

            this.user.id = data._id;
            this.initChatRoom();
        }, () => {
            this.actionBlock = 'ERROR';
            this.error = 'Ошибка регистрации пользователя';

            setTimeout(() => {
                this.actionBlock = 'BUTTON';
                this.error = null;
            }, 4000)
        })
    }

    initChatRoom () {
        let body = {
            // receiver: this.user.speaker,
            sender: this.user.id
        };

        this.initChat.request(body).subscribe(data => {
            this.room = data;
            this.user.chat_id = data._id;

            localStorage.setItem('CHAT_ROOM_ID', data._id);

            this.loadMessageHistory();
        }, () => {
            this.actionBlock = 'ERROR';
            this.error = 'Ошибка регистрации чата';

            setTimeout(() => {
                this.actionBlock = 'BUTTON';
                this.error = null;
            }, 4000)
        })
    }

    loadMessageHistory () {
        this.loadMessages.request(this.user.chat_id).subscribe(data => {
            this.initSocket();

            this.messages = data;
            this.showPopUp = false;
            this.scrollToBottom();
        }, err => {
            this.actionBlock = 'ERROR';
            this.error = 'Ошибка получения списка сообщений';

            setTimeout(() => {
                this.actionBlock = 'BUTTON';
                this.error = null;
            }, 4000)
        })
    }

    scrollToBottom () {
        setTimeout(() => { this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight; }, 0);
    }

    initSocket () {
        var socket = io(AppComponent.API_URL, {query: 'chat=' + this.user.chat_id});
        socket.on('connect', () => {
            console.log(socket.id);

            socket.on('NEW_CHAT_MESSAGE', (data) => {
                this.messages.push(data);
                this.scrollToBottom();
            });
        });
    }

    sendMessage () {
        let message = {
            message: this.message,
            room: this.user.chat_id,
            sender: this.user.id,
            eventName: 'RN_BANK'
        }

        this.sendDisable = true;
        this.putMessage.request(message).subscribe(data => {
            this.message = null;
            this.sendDisable = false;
        }, err => {
            this.sendDisable = false;
        })
    }
}
