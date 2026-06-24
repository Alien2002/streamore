import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface PlaylistVideo {
  videoId: string;
  title: string;
  thumb: string;
  dateStr: string;
}

@Injectable({ providedIn: 'root' })
export class YoutubePlaylistService {
  private http = inject(HttpClient);
  private readonly CHANNEL_ID = 'UCEIBW3or8W208jv5tkxgLJA';

  fetchVideos(): Observable<PlaylistVideo[]> {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${this.CHANNEL_ID}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`;

    return this.http.get(proxyUrl, { responseType: 'text' }).pipe(
      map((xml) => this.parseXml(xml)),
      catchError(() => of([])),
    );
  }

  private parseXml(xmlStr: string): PlaylistVideo[] {
    const xml = new DOMParser().parseFromString(xmlStr, 'text/xml');
    const entries = Array.from(xml.querySelectorAll('entry'));

    return entries.map((entry, _i) => {
      // ✅ namespace-safe query for yt:videoId
      const videoId = entry.getElementsByTagName('yt:videoId')[0]?.textContent ?? '';
      const title = entry.querySelector('title')?.textContent ?? 'Streamore Video';
      const pubDate = entry.querySelector('published')?.textContent ?? '';
      const thumb = videoId ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` : '';
      const dateStr = pubDate
        ? new Date(pubDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : '';

      return { videoId, title, thumb, dateStr };
    });
  }
}
