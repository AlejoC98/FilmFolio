import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { 
  faBookmark, 
  faHouse, 
  faRightFromBracket, 
  faMagnifyingGlass, 
  faX, 
  faEye
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { TMDBService } from 'src/app/services/tmdb.service';
import { FormControl } from '@angular/forms';
import { Movie } from 'src/app/interfaces/movie';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-top-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  
  faRightFromBracket = faRightFromBracket;
  faMagnifyingGlass = faMagnifyingGlass;
  faX = faX;
  faEye = faEye;

  public visible = false;

  searchMessage: string = 'Start Your Journey'

  constructor(
    public auhtService: AuthService,
    private tmdbService: TMDBService,
    private spinner: NgxSpinnerService
  ) {}

  keyword = new FormControl('');

  searchContent: Movie[] | undefined;

  menuItems: MenuItem[] = [
    {
      name: 'Home',
      icon: faHouse,
      link: ['/Home']
    },
    {
      name: 'Watchlist',
      icon: faBookmark,
      link: ['/Watchlist']
    },
    {
      name: 'Watched',
      icon: faEye,
      link: ['/Watched']
    },
  ];  

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  serachMovie() {
    this.spinner.show();
    this.tmdbService.search(this.keyword.value!).subscribe({
      next: (movies: Movie[]) => {
        this.searchContent = movies;
        if (movies.length <= 0) {
          this.searchMessage =  'Oops! No results found';
        }
        this.spinner.hide();
      }
    });
  }
}
