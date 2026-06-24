import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CounterDirective } from '../../shared/directives/counter.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective, CounterDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  stats = [
    { value: 100, suffix: '+', label: 'Projects Delivered' },
    { value: 50, suffix: '+', label: 'Livestream Productions' },
    { value: 10000, suffix: '+', label: 'Audience Reach' },
    { value: 5, suffix: '+', label: 'Years Experience' },
  ];
}
