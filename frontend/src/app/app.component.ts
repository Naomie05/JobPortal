import { Component } from '@angular/core';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'frontend';

	images = [
		{
			imageSrc: 'https://hrbays.com/resources/assets/images/imagesWebsite/recruitment.jpg;jsessionid=9E3141621E118CCE7239A0FBFE700F22',
			imageAlt: 'home1'

		},
		{
			imageSrc: 'https://image-assets.eu-2.volcanic.cloud/api/v1/assets/images/910e47155ca28b88c4488cf8d877dc6f?fallback=true&format=&size=900x400%23&version=3&webp_fallback=png',
			imageAlt: 'home2'
		},
		{
			imageSrc: 'https://e1.pxfuel.com/desktop-wallpaper/589/75/desktop-wallpaper-linux-essentials-online-course.jpg',
			imageAlt: 'home3'
		},

	]
}
