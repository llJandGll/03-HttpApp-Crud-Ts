// render-modal.ts
import modalHtml from './render-modal.html?raw';
import './render-modal.css';

let modalInstance: HTMLDivElement | null = null;

export const RenderModal = (element: HTMLDivElement) => {

  if (modalInstance) {
    return modalInstance;
  }

  modalInstance = document.createElement("div");
  modalInstance.innerHTML = modalHtml;
  modalInstance.className = 'modal-container hide-modal';
  element.append(modalInstance);


  modalInstance.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.className === 'modal-container') {
      hideModal();

      
    }
  });

}

export const showModal = () => {
  modalInstance?.classList.remove('hide-modal');
  const modal = modalInstance?.querySelector("form")
  
  modal?.addEventListener("click", ( e ) => {
    e.preventDefault();
    console.log("lag")
  })
}

export const hideModal = () => {
  modalInstance?.classList.add('hide-modal');

 
}