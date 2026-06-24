import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonials implements OnInit, OnDestroy {
  current = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  testimonials: Testimonial[] = [
    {
      quote: '"Streamore transformed our annual conference into a world-class production. The livestream quality rivaled what I\'ve seen on international broadcast networks. Our virtual attendees couldn\'t believe it was a local production team. Absolutely exceptional."',
      name: 'Dr. Kwame Asante',
      role: 'CEO, Pan-African Business Forum',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
    {
      quote: '"We hired Streamore for our church\'s Easter Sunday service livestream and the results were beyond our expectations. The team was professional, punctual, and the production quality made our congregation feel like they were watching a major network broadcast."',
      name: 'Pastor Grace Muthoni',
      role: 'Lead Pastor, Nairobi Restoration Church',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
    },
    {
      quote: '"The podcast production package from Streamore completely elevated our brand. The studio setup, sound quality, and the video editing were all top-tier. We went from 200 to 15,000 listeners in three months. The production quality makes all the difference."',
      name: 'Amir Osei',
      role: 'Host, The African Entrepreneur Podcast',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    },
    {
      quote: '"Our product launch was covered by Streamore and the photographs and video they delivered were stunning. The brand film they produced has been viewed over 200,000 times on social media. These people understand African aesthetics and modern production perfectly."',
      name: 'Fatima Al-Hassan',
      role: 'Marketing Director, Zuri Fashion Group',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&q=80',
    },
  ];

  get translateX(): string {
    return `translateX(-${this.current() * 100}%)`;
  }

  ngOnInit(): void {
    this.timer = setInterval(() => this.next(), 6000);
  }

  prev(): void {
    this.current.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }

  next(): void {
    this.current.update(i => (i + 1) % this.testimonials.length);
  }

  goTo(i: number): void {
    this.current.set(i);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
