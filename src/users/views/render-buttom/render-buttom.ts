import "./render-button.css";
import { UserStore } from '../../store/UserStore';
import { RenderTable } from "../render-table/render-table";


let currentPageSpan = document.createElement('span');

export const RenderButtons = ( element : HTMLDivElement, usersStore : UserStore  ) => {
  
  backPageButton( element, usersStore );

  currentPage( element , usersStore );

  nextPageButton( element, usersStore );
}

const nextPageButton = ( element : HTMLDivElement,  usersStore:UserStore  )  => {
  const button : HTMLButtonElement = document.createElement('button');
  button.innerText = 'Next >';
  element.append( button );  

  button.addEventListener("click", async () => {
    
    const users = await usersStore.loadNextPage();
    currentPageSpan.innerText = usersStore.getCurrentPage().toString();
    RenderTable( element , users );
  });

}

const currentPage = ( element : HTMLDivElement, usersStore : UserStore) => {
  currentPageSpan.id = "current-page";
  currentPageSpan.innerText = `${usersStore.getCurrentPage()}`;
  element.append(currentPageSpan)
}



const backPageButton = ( element: HTMLDivElement, usersStore : UserStore)  => {
  const button : HTMLButtonElement = document.createElement('button');
  button.innerText = '< Back';
  element.append( button );
  button.addEventListener("click", async () => {
    const users = await usersStore.loadPreviousPage();
    currentPageSpan.innerText = usersStore.getCurrentPage().toString();
    RenderTable( element, users );
  });

}

