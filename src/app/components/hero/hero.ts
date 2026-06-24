import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HeroSlide {
  src: string;
  alt: string;
  scene: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements OnInit, AfterViewInit, OnDestroy {
  readonly SLIDE_DURATION = 7000;

  slides: HeroSlide[] = [
    { src: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=1920&q=90', alt: 'Broadcast camera rig', scene: 'Broadcast Production' },
    { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=90', alt: 'Live event stage lighting', scene: 'Live Event Coverage' },
    { src: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1920&q=90', alt: 'Podcast studio microphone', scene: 'Podcast Studio' },
    { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=90', alt: 'Professional cinema camera', scene: 'Cinematic Capture' },
    { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=90', alt: 'Conference hall', scene: 'Corporate Events' },
    { src: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1920&q=90', alt: 'Aerial city skyline', scene: 'Aerial Cinematography' },
  ];

  currentSlide = signal(0);
  progressWidth = signal(0);

  currentScene = computed(() => this.slides[this.currentSlide()].scene);
  currentSceneNum = computed(() => {
    const n = this.currentSlide() + 1;
    return (n < 10 ? '0' + n : String(n)) + ' / 0' + this.slides.length;
  });

  private timer?: ReturnType<typeof setInterval>;
  private progressTimer?: ReturnType<typeof setTimeout>;

  wordsRevealed = signal(false);
  divider1Revealed = signal(false);
  divider2Revealed = signal(false);

  ngOnInit(): void {
    this.startTimer();
  }

  ngAfterViewInit(): void {
    this.scheduleWordReveals();
  }

  private scheduleWordReveals(): void {
    const delays: Array<[string, number]> = [
      ['divider1', 2860],
      ['divider2', 3460],
    ];
    delays.forEach(([key, delay]) => {
      setTimeout(() => {
        if (key === 'divider1') this.divider1Revealed.set(true);
        if (key === 'divider2') this.divider2Revealed.set(true);
      }, delay);
    });
    setTimeout(() => this.wordsRevealed.set(true), 2280);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    clearInterval(this.timer);
    this.resetProgress();
    this.startTimer();
  }

  private startTimer(): void {
    this.resetProgress();
    this.timer = setInterval(() => {
      this.currentSlide.update(i => (i + 1) % this.slides.length);
      this.resetProgress();
    }, this.SLIDE_DURATION);
  }

  private resetProgress(): void {
    this.progressWidth.set(0);
    clearTimeout(this.progressTimer);
    this.progressTimer = setTimeout(() => this.progressWidth.set(100), 50);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    clearTimeout(this.progressTimer);
  }
}
