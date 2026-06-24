import { Component, signal } from '@angular/core';
import { Cursor } from './components/cursor/cursor';
import { Loader } from './components/loader/loader';
import { FloatingActions } from './components/floating-actions/floating-actions';
import { Navbar } from './components/navbar/navbar';
import { MobileMenu } from './components/mobile-menu/mobile-menu';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Broadcast } from './components/broadcast/broadcast';
import { Services } from './components/services/services';
import { Portfolio } from './components/portfolio/portfolio';
import { Why } from './components/why/why';
import { Livestream } from './components/livestream/livestream';
import { Testimonials } from './components/testimonials/testimonials';
import { Clients } from './components/clients/clients';
import { Booking } from './components/booking/booking';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Cursor, Loader, FloatingActions, Navbar, MobileMenu, Hero, About, Broadcast, Services, Portfolio, Why, Livestream, Testimonials, Clients, Booking, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('streamore-web');
}
