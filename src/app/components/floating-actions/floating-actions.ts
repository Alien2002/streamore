import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-floating-actions',
  standalone: true,
  templateUrl: './floating-actions.html',
  styleUrl: './floating-actions.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingActions {}
