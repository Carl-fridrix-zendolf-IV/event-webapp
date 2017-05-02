import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'media',
    templateUrl: './media.html'
})
export class MediaComponent {
    public page: String;
    public pageType: String;
    public title: String;
    public path: String;
    public list: Array<any>;
    public showContainer: Boolean;
    public detailImageSrc: String;
    public showOverlay: Boolean;

    constructor (private route: ActivatedRoute, private router: Router) { }

    ngOnInit () {
        this.route.params.subscribe((params) => {
            this.page = params['id'];
            switch(this.page) {
                case 'main':
                    this.pageType = 'MAIN';
                    this.title = 'Фото и Видео';
                    break;
                case '0':
                    this.pageType = 'PHOTOS';
                    this.title = 'Заезд и приветственный коктейль';
                    this.list = new Array(108);
                    break;
                case '1':
                    this.pageType = 'PHOTOS';
                    this.title = 'Конференция';
                    this.list = new Array(245);
                    break;
                case '2':
                    this.pageType = 'PHOTOS';
                    this.title = 'Экскурсия';
                    this.list = new Array(171);
                    break;
                case '3':
                    this.pageType = 'PHOTOS';
                    this.title = 'Гала-ужин';
                    this.list = new Array(217);
                    break;
            }

            this.path = './assets/resized/' + this.page + '/';
            this.showContainer = true;
        })
    }

    showImageDetail (i: number) :void {
        this.detailImageSrc = './assets/fullsize/' + this.page + '/' + (i + 1).toString() + '.jpg';
        this.showOverlay = true;
    }

    showLeft () {
        if (this.detailImageSrc.indexOf('/1.jpg') > -1)
            return 'hidden';
        else
            return 'visible';
    }

    showRight () {
        let length = this.list.length.toString();

        if (this.detailImageSrc.indexOf('/' + length + '.jpg') > -1)
            return 'hidden';
        else
            return 'visible';
    }

    close () {
        this.showOverlay = false;
        this.detailImageSrc = null;
    }

    clickOnArrow (type) {
        let img = this.detailImageSrc.split('/').pop();
        let length = this.list.length.toString();

        if (type == 'LEFT' && img == '1.jpg') {
            return false;
        }
        else if (type == 'RIGHT' && img == (length + '.jpg')) {
            return false;
        }

        let imgArr = img.split('.');
        let num = Number(imgArr[0]);

        (type == 'LEFT') ? num-- : num++;

        let string = num.toString() + '.jpg';

        this.detailImageSrc = './assets/fullsize/' + this.page + '/' + string;
    }
}
