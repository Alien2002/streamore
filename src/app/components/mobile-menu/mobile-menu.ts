import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileMenuService } from '../../services/mobile-menu.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenu {
  menuService = inject(MobileMenuService);

  close(): void { this.menuService.close(); }
}
