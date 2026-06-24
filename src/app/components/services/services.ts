import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface Service {
  num: string;
  icon: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  services: Service[] = [
    {
      num: '01', icon: 'video',
      name: 'Livestream Production',
      description: 'Multi-camera live streaming for churches, conferences, concerts, weddings, and corporate events. Crystal-clear HD/4K broadcast to all major platforms simultaneously.',
    },
    {
      num: '02', icon: 'video',
      name: 'Video Production',
      description: 'Commercials, documentaries, interviews, corporate videos, and promotional content. Cinematic storytelling from concept to final cut with full post-production.',
    },
    {
      num: '03', icon: 'camera',
      name: 'Photography',
      description: 'Events, corporate portraits, branding, conferences, and special occasions. Editorial-quality imagery that captures the authentic energy of your brand and people.',
    },
    {
      num: '04', icon: 'mic',
      name: 'Podcast Production',
      description: 'Audio and video podcast recording, editing, distribution, and branding. Full-service studio setup for thought leaders, businesses, and media personalities.',
    },
    {
      num: '05', icon: 'calendar',
      name: 'Event Coverage',
      description: 'Professional multi-photographer coverage for weddings, conferences, product launches, award ceremonies, and corporate galas. Comprehensive documentary-style storytelling.',
    },
    {
      num: '06', icon: 'edit',
      name: 'Content Creation',
      description: 'Monthly content packages for businesses and brands. Social media reels, behind-the-scenes, brand films, and campaign content to keep your audience engaged year-round.',
    },
  ];
}
