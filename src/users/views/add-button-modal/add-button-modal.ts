// add-button-modal.ts
import {showModal } from '../render-modal/render-modal';
import './add-button-modal.css';

export const ButtonModal = (element: HTMLDivElement) => {
  const fabButton = document.createElement('button');
  fabButton.innerText = "+";
  fabButton.className = 'fab-button';
  element.append(fabButton);

  fabButton.addEventListener("click", () => {
    showModal();
  });
}