import { trigger, style, animate, transition } from '@angular/animations';
export const promptAnimation = trigger(
    'enterAnimation', [
      transition(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('100ms', style({transform: 'translateX(0)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('100ms', style({transform: 'translateX(100%)', opacity: 0}))
      ])
    ]
)