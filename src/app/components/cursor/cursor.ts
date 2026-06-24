import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
  NgZone,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.html',
  styleUrl: './cursor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cursor implements OnInit, OnDestroy {
  private ngZone = inject(NgZone);

  cursorX = signal(0);
  cursorY = signal(0);
  ringX   = signal(0);
  ringY   = signal(0);
  hovering = signal(false);

  private mx = 0;
  private my = 0;
  private rx = 0;
  private ry = 0;
  private rafId = 0;
  private listeners: Array<() => void> = [];

  ngOnInit(): void {
    // Run outside Angular zone for performance
    this.ngZone.runOutsideAngular(() => {
      const onMove = (e: MouseEvent) => {
        this.mx = e.clientX;
        this.my = e.clientY;
        this.ngZone.run(() => {
          this.cursorX.set(this.mx);
          this.cursorY.set(this.my);
        });
      };

      const onEnter = () => this.ngZone.run(() => this.hovering.set(true));
      const onLeave = () => this.ngZone.run(() => this.hovering.set(false));

      document.addEventListener('mousemove', onMove);
      this.listeners.push(() => document.removeEventListener('mousemove', onMove));

      const hoverSelectors = 'a, button, .port-item, .service-card, .why-card, .filter-btn, .ls-platform, .stat-card';
      const bindHover = () => {
        document.querySelectorAll<HTMLElement>(hoverSelectors).forEach(el => {
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        });
      };
      bindHover();

      // Re-bind after DOM changes
      const mo = new MutationObserver(bindHover);
      mo.observe(document.body, { childList: true, subtree: true });
      this.listeners.push(() => mo.disconnect());

      this.animateRing();
    });
  }

  private animateRing(): void {
    this.rafId = requestAnimationFrame(() => {
      this.rx += (this.mx - this.rx) * 0.12;
      this.ry += (this.my - this.ry) * 0.12;
      this.ngZone.run(() => {
        this.ringX.set(Math.round(this.rx));
        this.ringY.set(Math.round(this.ry));
      });
      this.animateRing();
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.listeners.forEach(fn => fn());
  }
}

