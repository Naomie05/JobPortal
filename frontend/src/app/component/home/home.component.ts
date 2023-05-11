import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface carouselImage{
	imageSrc: string;
	imageAlt: string;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	@Input() images: carouselImage[] = [] 

	@Input() indicators = true;

	@Input() controls = true;

	@Input() autoSlide = false;

	@Input() slideInterval = 5000; //default to 5 second

	selectedIndex = 0;

	ngOnInit(): void {
		if(this.autoSlide){
			this.autoSlideImages();
		}
	}

	//changes slide in every 5 seconds
	autoSlideImages(): void{
		setInterval(() => {
			this.onNextClick();
		}, this.slideInterval);
	}


	//sets index of image on dot/indicator click
	selectImage(index: number): void{
		this.selectedIndex = index;
	}

	onPrevClick(): void{
		if(this.selectedIndex === 0){
			this.selectedIndex = this.images.length -1;
		}
		else{
			this.selectedIndex--;
		}
	}

	onNextClick(): void{
		if(this.selectedIndex === this.images.length -1){
			this.selectedIndex =0;
		}
		else{
			this.selectedIndex++;
		}
	}

}
