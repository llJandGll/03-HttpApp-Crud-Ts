// add-button-modal.ts
import { UserServices } from '../../use-cases';
import {showModal } from '../render-modal/render-modal';
import './add-button-modal.css';

export const ButtonModal = (element: HTMLDivElement , usersServices : UserServices) => {
  const fabButton = document.createElement('button');
  fabButton.innerText = "+";
  fabButton.className = 'fab-button';
  element.append(fabButton);

  fabButton.addEventListener("click", () => {
    showModal( usersServices );
  });
}