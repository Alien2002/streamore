import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;

  private el = inject(ElementRef<HTMLElement>);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const nativeEl: HTMLElement = this.el.nativeElement;
    nativeEl.classList.add('reveal');
    if (this.revealDelay > 0) {
      nativeEl.style.transitionDelay = `${this.revealDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            nativeEl.classList.add('visible');
            this.observer.unobserve(nativeEl);
          }
        });
      },
      { threshold: 0.1 },
    );
    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
