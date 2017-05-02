import { Component, NgZone } from '@angular/core';
import { RegistrateUser } from '../../services/http';
declare var QCodeDecoder: any;


@Component({
    selector: 'conference',
    templateUrl: './conference.html'
})
export class ConferenceComponent {
    private button: string = 'Сканировать QR';
    private file: boolean = false;
    private fakeImage: string = '#';
    private switchString: string = 'FORM';
    private loading: boolean = false;
    private user: any = new Object();
    private error: string;

    constructor (private registrateUser: RegistrateUser, private _ngZone: NgZone) { }

    ngOnInit () {
        if (localStorage.getItem('CONFERENCE_REGIST_RN_BANK')) {
            this.switchString = 'ALREADY_REGISTERED';
        }
    }

    inputFieldChange () {
        this.error = null;
    }

    test () {
        var img = document.getElementById('TEST_IMAGE');
        var qr = QCodeDecoder();

        qr.decodeFromImage(img, (err, result) => {
            if (err) {
                console.log(err);
                alert('ERROR');
            }

            alert(result);
        })
    }

    fileUpload (element) {
        if (!this.user.firstname || !this.user.lastname)
            return this.error = 'Необходимо указать Имя и Фамилию!';

        this.error = null;
        this.loading = true;

        if (element.target.files && element.target.files[0]) {

            var reader = new FileReader();
            reader.onload = (e) => {
                this.fakeImage = e.target['result'];
                setTimeout(() => {
                    var img = document.getElementById('FAKE_IMG');
                    var qr = QCodeDecoder();

                    return qr.decodeFromImage(img, (err, result) => {
                        if (err) {
                            this._ngZone.run(() => {
                                this.loading = false;
                                this.error = 'Упс! Что-то пошло не так, попробуйте еще раз.';
                            })

                            return;
                        }

                        if (result == 'RN_BANK') {
                            let body = { name: this.user, event: 'RN_BANK' }
                            this.registrateUser.request(body).subscribe(data => {
                                this._ngZone.run(() => {
                                    this.loading = false;
                                    this.switchString = 'SUCCESS';
                                })

                                localStorage.setItem('CONFERENCE_REGIST_RN_BANK', data.id);
                            }, () => {
                                this.loading = false;
                                this.error = 'Ошибка регистрации';
                            })
                        }
                        else {
                            this._ngZone.run(() => {
                                this.loading = false;
                                this.error = 'Не верный QR код';
                            })
                        }
                    });
                }, 2000);
            }

            reader.onerror = (err) => {
                if (err)
                    throw err;
            }

            reader.readAsDataURL(element.target.files[0]);
        }
        else {
            this.loading = false;
            this.error = 'Не удалось загрузить снимок';
        }
    }
}
