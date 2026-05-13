import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private status = signal(true);

  getStatus(): Signal<boolean> {
    return computed(() => this.status());
  }
}
