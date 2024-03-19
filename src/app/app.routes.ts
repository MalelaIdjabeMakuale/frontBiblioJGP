import { Routes } from '@angular/router';
import { HomeComponent } from './pages/inspire/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { CataloguePageComponent } from './pages/catalogue-page/catalogue-page.component';
import { DetailBookComponent } from './components/detail-book/detail-book.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { DetailAuthorComponent } from './components/detailAuthor/detail-author/detail-author.component';
import { GenreComponent } from './pages/genre/genre.component';
import { DetailGenreComponent } from './components/detail-genre/detail-genre.component';
import { EditarComponent } from './pages/editar/editar.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'inspire', component: HomeComponent },
  { path: 'catalogo', component: CataloguePageComponent },
  { path: 'catalogo/:id', component: DetailBookComponent },
  { path: 'autoras', component: AuthorsComponent },
  { path: 'autoras/:author', component: DetailAuthorComponent },
  { path: 'genero', component: GenreComponent },
  { path: 'genero/:genre', component: DetailGenreComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'login', component: LoginUserComponent },
];
