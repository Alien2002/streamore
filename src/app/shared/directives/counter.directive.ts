import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appCounter]',
  standalone: true,
})
export class CounterDirective implements OnInit, OnDestroy {
  @Input() counterTarget = 0;
  @Input() counterSuffix = '';
  @Input() counterDuration = 2000;

  private el = inject(ElementRef<HTMLElement>);
  private observer!: IntersectionObserver;
  private started = false;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.started) {
            this.started = true;
            this.animate();
            this.observer.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.5 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    let startTs: number | null = null;
    const el = this.el.nativeElement;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / this.counterDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * this.counterTarget) + this.counterSuffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
