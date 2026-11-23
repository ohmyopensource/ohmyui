/**
 * @file checkbox-group.ts
 * @description Semantic wrapper for a group of related CheckboxComponent
 * instances, projected via <ng-content>. Uses a native <fieldset>/<legend>
 * pair: group label, description, and validation error are wired with
 * proper ARIA associations, and `disabled` cascades to every projected
 * checkbox automatically via native <fieldset disabled> behavior — no
 * manual prop-drilling to child components required.
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Layout direction for the checkboxes projected inside the group. */
export type CheckboxGroupOrientation = 'vertical' | 'horizontal';

let nextCheckboxGroupId = 0;

@Component({
  selector: 'ohmyui-checkbox-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-group.html',
  styleUrl: './checkbox-group.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent {
  readonly groupId = `ohmyui-checkbox-group-${++nextCheckboxGroupId}`;

  /** Group label, rendered as a <legend>. */
  @Input() label = '';
  /** Optional helper text displayed below the label. */
  @Input() description = '';
  /** Layout direction for the projected checkboxes. */
  @Input() orientation: CheckboxGroupOrientation = 'vertical';
  /** Marks the group as required in a form. */
  @Input() required = false;
  /** Disables every checkbox projected inside the group (native cascade via <fieldset>). */
  @Input() disabled = false;
  /** Displays validation error styling and message for the whole group. */
  @Input() error = false;
  /** Error message displayed below the group when `error` is true. */
  @Input() errorMessage = '';

  /** Returns the CSS classes required for the current group configuration. */
  get classes(): Record<string, boolean> {
    return {
      'ohmyui-checkbox-group': true,
      'ohmyui-checkbox-group--horizontal': this.orientation === 'horizontal',
      'ohmyui-checkbox-group--error': this.error,
    };
  }
}
