import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { invoke } from '@tauri-apps/api/core';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <h1>Double Your Number</h1>
      <input
        [(ngModel)]="inputValue"
        type="number"
        placeholder="Enter a number"
      />
      <button (click)="doubleValue()">Double</button>
      @if (result !== null) {
      <p>Result: {{ result }}</p>
      } @else {
      <p>before calculation</p>
      }
    </div>
  `,
  styles: [],
})
export class NxWelcomeComponent {
  inputValue = 0; // ユーザーの入力値
  result: number | null = null; // 計算結果

  async doubleValue() {
    // Rust 側の `double_value` コマンドを呼び出す
    this.result = await invoke<number>('double_value', {
      value: this.inputValue,
    });
  }
}
