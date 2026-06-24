// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-broadcast',
//   imports: [],
//   templateUrl: './broadcast.html',
//   styleUrl: './broadcast.css',
// })
// export class Broadcast {}


import {
  Component, OnInit, ChangeDetectionStrategy,
  signal, computed, inject
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubePlaylistService, PlaylistVideo } from '../../services/youtube-playlist.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.html',
  styleUrl: './broadcast.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Broadcast implements OnInit {
  private svc       = inject(YoutubePlaylistService);
  private sanitizer = inject(DomSanitizer);

  videos     = signal<PlaylistVideo[]>([]);
  activeIdx  = signal<number>(0);
  loading    = signal<boolean>(true);
  hasFailed  = signal<boolean>(false);

  activeVideo = computed(() => this.videos()[this.activeIdx()] ?? null);

  embedUrl = computed((): SafeResourceUrl => {
    const v = this.activeVideo();
    if (!v?.videoId) return '';
    const autoplay = 0; // set to 1 if you want autoplay on switch
    const url = `https://www.youtube.com/embed/${v.videoId}?autoplay=${autoplay}&rel=0&modestbranding=1&color=red&iv_load_policy=3`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  ngOnInit(): void {
    this.svc.fetchVideos().subscribe(videos => {
      this.loading.set(false);
      if (!videos.length) {
        this.hasFailed.set(true);
        return;
      }
      this.videos.set(videos);
      this.activeIdx.set(0);
    });
  }

  selectVideo(index: number): void {
    this.activeIdx.set(index);
    // scroll handled in template via #itemRef + scrollIntoView in a directive,
    // or you can use a ViewChildren query if needed
  }

  trackByVideoId(_: number, v: PlaylistVideo): string {
    return v.videoId;
  }
}
