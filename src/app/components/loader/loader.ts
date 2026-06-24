import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader implements OnInit {
  hidden = signal(false);

  ngOnInit(): void {
    // Hide loader after assets load (or 2.2s minimum)
    const hide = () => this.hidden.set(true);
    if (document.readyState === 'complete') {
      setTimeout(hide, 2200);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 2200), { once: true });
    }
  }
}
