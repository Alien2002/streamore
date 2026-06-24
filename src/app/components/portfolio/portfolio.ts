import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface PortfolioItem {
  src: string;
  alt: string;
  category: string;
  title: string;
  filter: string;
}

type FilterKey = 'all' | 'livestream' | 'corporate' | 'conference' | 'wedding' | 'commercial' | 'podcast';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portfolio {
  activeFilter = signal<FilterKey>('all');

  filters: Array<{ key: FilterKey; label: string }> = [
    { key: 'all', label: 'All Work' },
    { key: 'livestream', label: 'Livestreams' },
    { key: 'corporate', label: 'Corporate Events' },
    { key: 'conference', label: 'Conferences' },
    { key: 'wedding', label: 'Weddings' },
    { key: 'commercial', label: 'Commercials' },
    { key: 'podcast', label: 'Podcasts' },
  ];

  items: PortfolioItem[] = [
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', alt: 'Large scale conference livestream', category: 'Livestream Production', title: 'Annual Business Summit 2024', filter: 'livestream' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', alt: 'Corporate event coverage', category: 'Corporate Event', title: 'CEO Awards Gala', filter: 'corporate' },
    { src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80', alt: 'Podcast studio recording', category: 'Podcast Production', title: 'The Leadership Series', filter: 'podcast' },
    { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80', alt: 'Conference photography', category: 'Conference', title: 'Tech Africa Summit', filter: 'conference' },
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Wedding photography', category: 'Wedding Coverage', title: 'The Mwangi — Amara Wedding', filter: 'wedding' },
    { src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', alt: 'Commercial video production', category: 'Commercial', title: 'EcoBank Brand Film 2024', filter: 'commercial' },
  ];

  isHidden(item: PortfolioItem): boolean {
    const filter = this.activeFilter();
    return filter !== 'all' && item.filter !== filter;
  }

  setFilter(key: FilterKey): void {
    this.activeFilter.set(key);
  }
}
