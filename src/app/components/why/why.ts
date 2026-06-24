import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-why',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './why.html',
  styleUrl: './why.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Why {
  cards = [
    {
      icon: 'fa-solid fa-sliders',
      title: 'Professional Equipment',
      desc: 'Sony FX series, DJI drones, Blackmagic switchers, Sennheiser audio, and industry-standard production systems for broadcast-quality output every time.',
    },
    {
      icon: 'fa-solid fa-users',
      title: 'Reliable Team',
      desc: 'Experienced professionals with backgrounds in broadcast television, film, and corporate production. We arrive prepared and deliver excellence under pressure.',
    },
    {
      icon: 'fa-solid fa-lightbulb',
      title: 'Creative Storytelling',
      desc: 'We create content that connects emotionally and converts commercially. Rooted in African identity, our storytelling resonates with global audiences.',
    },
    {
      icon: 'fa-solid fa-arrows-rotate',
      title: 'End-to-End Production',
      desc: 'From pre-production planning and scripting to live execution and post-production delivery — one team, zero handoff confusion, full accountability.',
    },
  ];
}
