!function(){"use strict";class e{constructor(e,t,o,r,i,n){this._name=e.name,this._link=e.link,this._id=e._id,this.isLiked=e.isLiked,this._cardSelector=t,this._api=o,this._handleImageClick=r,this.domElements=i,this._handleDeleteCallback=n.bind(this)}getView(){const e=document.querySelector(this._cardSelector);return this._cardElement=e.content.querySelector(".card").cloneNode(!0),this._cardImageElement=this._cardElement.querySelector(".card__image"),this._cardTitleEl=this._cardElement.querySelector(".card__title"),this._cardImageElement.src=this._link,this._cardImageElement.alt=this._name,this._cardTitleEl.textContent=this._name,this.likeButton=this._cardElement.querySelector(".card__like-button"),this.deleteButton=this._cardElement.querySelector(".card__delete-button"),this._isLiked(),this._setEventListeners(),this._cardElement}_isLiked(){this.isLiked&&this.likeButton.classList.add("card__like-button_active")}_setEventListeners(){this.deleteButton.addEventListener("click",(()=>{this._handleDeleteCallback()})),this.likeButton.addEventListener("click",(()=>{this.toggleLike(this._id,this.isLiked)})),this._cardImageElement.addEventListener("click",(()=>{this._handleImageClick({name:this._name,link:this._link})}))}toggleLike(){this._api.toggleLike(this._id,this.isLiked).then((e=>{this.isLiked=e.isLiked,this._updateLikeButton()})).catch((e=>{console.error("Error toggling like:",e),alert("Unable to toggle like. Please try again.")}))}_updateLikeButton(){this.likeButton.classList.toggle("card__like-button_active",this.isLiked)}deleteCard(e){e.preventDefault(),console.log("work"),this._api.deleteCard(this._id).then((()=>{cardElement.remove(),confirmDeletePopup.close()})).catch((e=>{console.error("Error deleting card:",e),alert("Unable to delete card. Please try again.")}))}}const t=document.querySelector(".profile__image"),o=document.querySelector(".profile__image-container"),r=document.querySelector("#profile-image-edit-modal"),i=document.querySelector("#profile-image-edit-form"),n=i.querySelector("#profile-image-edit-input"),l=i.querySelector("#profile-image-edit-button"),s=document.querySelector(".modal__close"),a=document.querySelector("#profile-edit-button"),d=document.querySelector("#profile-edit-modal"),c=document.querySelector("#profile-close-modal-button"),u=document.querySelector("#add-card-form"),m=document.querySelector(".profile__title"),p=document.querySelector(".profile__description"),h=document.querySelector("#profile-title-input"),_=document.querySelector("#profile-description-input"),E=u.querySelector("#modal-submit-create-button"),f=d.querySelector(".modal__form"),S=document.querySelector("#modal-card-delete-button"),g=document.querySelector("#card-delete-button"),y=document.querySelector("#delete-card-confirmation"),b=y.querySelector("#modal-card-delete-button"),v=document.querySelector(".card__delete-button-api"),C=document.querySelector(".card__like-button"),k=document.querySelector(".profile__add-button"),q=document.querySelector("#card-add-modal"),I=q.querySelector(".modal__form"),L=document.querySelector("#popup-image"),B=document.querySelector(".modal__image"),w=document.querySelector(".modal__caption"),A=I.querySelector(".modal__input_type_title"),D=I.querySelector(".modal__input_type_link"),T=document.querySelector(".modal__api").querySelector(".card__delete-button-api"),U=document.querySelector("#modal-confirmation-form"),F={profileImageContainer:o,modalSubmitApiButton:document.querySelector("#profile-modal-form").querySelector("#modal-submit-api"),modalConfirmationForm:U,cardDeleteButton:g,cardLikeButton:C,modalClose:s,modalSubmitCreateButton:E,cardDeleteSubmitButton:T,profileimageEditInput:n,profileImageEditForm:i,profileImageEditButton:l,profileImageEditModal:r,profileImage:t,deleteImageButton:v,modalDeleteCardConfirmation:b,deleteCardConfirmation:y,profileAddEditButton:a,profileEditModal:d,profileCloseModalButton:c,profileTitle:m,profileDescription:p,profileTitleInput:h,profileDescriptionInput:_,profileEditForm:f,addNewCardButton:k,cardAddModal:q,addCardFormElement:I,popupImageModal:L,modalImageElement:B,popupImageCaption:w,addCardForm:u,cardTitleInput:A,cardLinkInput:D,cardDeleteConfirmButton:S},V={profileTitle:F.profileTitle,profileDescription:F.profileDescription,profileTitleInput:F.profileTitleInput,profileDescriptionInput:F.profileDescriptionInput};window.domElements=F;var x={config:{formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit",inactiveButtonClass:"modal__submit_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"},selectors:{cardSection:".cards__list",cardTemplate:".card-template"},domElements:F,infoSelector:V};class H{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t}_showInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_toggleButtonState(e){const t=this._formElement.querySelector(this._submitButtonSelector);this._hasInvalidInput(e)?this.disableButton():(t.classList.remove(this._inactiveButtonClass),t.disabled=!1)}_hasInvalidInput(e){return!e.every((e=>e.validity.valid))}_setEventListeners(){this._inputEls=[...this._formElement.querySelectorAll(this._inputSelector)],this._inputEls.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState(this._inputEls)}))}))}disableButton(){const e=this._formElement.querySelector(this._submitButtonSelector);this._formElement.addEventListener("submit",(()=>{e.classList.add(this._inactiveButtonClass),e.disabled=!0}))}enableValidation(){this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}resetValidation(){this._inputEls.forEach((e=>{this._hideInputError(e),e.value=""})),this.disableButton()}}class O{constructor(e){let{popupSelector:t}=e;this.popupElement=document.querySelector(t),this._closeHandler=null,this._handleEscClose=this._handleEscClose.bind(this),this._handleOverlayClick=this._handleOverlayClick.bind(this),this._handleCloseClick=()=>this.close()}setEventListener(){this.popupElement.querySelector(".modal__close").addEventListener("click",this._handleCloseClick)}open(){this.popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose),document.addEventListener("click",this._handleOverlayClick)}close(){this.popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose),document.removeEventListener("click",this._handleOverlayClick),this._closeHandler&&this._closeHandler()}setCloseHandler(e){this._closeHandler=e}_handleEscClose(e){"Escape"===e.key&&this.close()}_handleOverlayClick(e){e.target.classList.contains("modal_opened")&&this.close()}}class N extends O{constructor(e,t,o){let{popupSelector:r}=e;super({popupSelector:r}),this._handleFormSubmit=t,this.domElements=o,this._form=this.popupElement.querySelector(".modal__form"),this._getInputValues=this._getInputValues.bind(this)}setEventListeners(){super.setEventListener(),this.popupElement.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues())}))}_getInputValues(){const e=Array.from(this.popupElement.querySelectorAll(".modal__input")),t={};return e.forEach((e=>{t[e.name]=e.value})),t}}const{domElements:P,selectors:$,config:j}=x,M=new class{constructor(e,t,o,r){let{items:i,renderer:n}=e;this._items=i,this._renderer=n,this._container=document.querySelector(t),this.domElements=o,this.generateCard=r}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({items:[],renderer:e=>{const t=ee(e);M.addItem(t)}},$.cardSection,P,ee),R=new H(j,P.addCardFormElement),J=new H(j,P.profileImageEditForm),G=new H(j,P.profileImageEditForm);G.disableButton();const z=new N({popupSelector:"#profile-image-edit-modal"},(e=>function(e){const t=e.link,o=P.profileImageEditButton;te(!0,o),oe.updateApiUserAvatar(t).then((e=>{Y.setUserInfo(e),z.close()})).catch((e=>{console.error("Error updating profile image:",e)})).finally((()=>{te(!1,o)}))}(e)),P),K=new N({popupSelector:"#card-add-modal"},(e=>function(e){te(!0,P.modalSubmitCreateButton);const t={name:e.name,link:e.description};oe.addApiNewCard(t).then((e=>{!function(e){const t=ee(e);M.addItem(t),K.close(),setTimeout((()=>{P.addCardFormElement.reset()}),1)}(e)})).then((()=>{K.close()})).catch((e=>{console.error("Error adding new card:",e)})).finally((()=>{te(!1,P.modalSubmitCreateButton)}))}(e)),P),Q=new N({popupSelector:"#profile-edit-modal"},(e=>function(e){e.about=e.description,delete e.description,te(!0,P.modalSubmitApiButton),oe.addApiUserInfo(e).then((e=>{Y.setUserInfo(e)})).then((()=>{Q.close()})).catch((e=>{console.error("Error updating profile:",e)})).finally((()=>{te(!1,P.modalSubmitApiButton)}))}(e)),P),W=new class extends O{constructor(e,t,o){let{popupSelector:r}=e;super({popupSelector:r}),this.domElements=o,this._confirmForm=this.popupElement.querySelector("#modal-confirmation-form"),this._handleDeleteCallback=t.bind(this)}open(e,t){super.open(),this.id=e,this.cardElement=t,this._confirmForm.removeEventListener("submit",this._submitHandler),this._submitHandler=e=>{e.preventDefault(),this._handleDeleteCallback(this.id,this.cardElement)},this._confirmForm.addEventListener("submit",this._submitHandler)}}({popupSelector:"#delete-card-confirmation"},((e,t)=>function(e,t){!function(e,t){oe.deleteCard(e).then((()=>{t.remove(),W.close()})).catch((e=>{console.error("Error deleting card:",e)}))}(e,t)}(e,t)),P),X=new class extends O{constructor(e,t){let{popupSelector:o}=e;super({popupSelector:o}),this._domElements=t}open(e){let{name:t,link:o}=e;const r=this._domElements.modalImageElement,i=this._domElements.popupImageCaption;r.src=o,r.alt=t,i.textContent=t,super.open()}}({popupSelector:"#popup-image"},P),Y=new class{constructor(e,t,o,r){this._nameElement=document.querySelector(e),this._jobElement=document.querySelector(t),this._linkElement=document.querySelector(o),this.domElements=r}getUserInfo(){return{title:this._nameElement.textContent,about:this._jobElement.textContent,avatar:this._linkElement.src}}setUserInfo(e){let{name:t,about:o,avatar:r}=e;this._nameElement.textContent=t,this._jobElement.textContent=o,void 0!==r&&(this._linkElement.src=r)}}(".profile__title",".profile__description",".profile__image",P);R.enableValidation(),J.enableValidation(),G.enableValidation();const Z=e=>{let{name:t,link:o}=e;X.open({name:t,link:o})};function ee(t){const o=new e(t,"#card-template",oe,Z,P,(()=>W.open(t._id,o._cardElement)));return o.getView()}function te(e,t){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";const r=t.name;t.textContent=e?o:r}P.profileImageContainer.addEventListener("click",(()=>{z.open()})),P.profileAddEditButton.addEventListener("click",(()=>{const e=Y.getUserInfo();P.profileTitleInput.value=e.title,P.profileDescriptionInput.value=e.about,Q.open()})),P.addNewCardButton.addEventListener("click",(()=>{K.open()})),K.setEventListeners(),Q.setEventListeners(),X.setEventListener(),W.setEventListener(),z.setEventListeners();const oe=new class{constructor(e){let{baseUrl:t,headers:o}=e;this.baseUrl=t,this.headers=o,this._handleResponse=this._handleResponse.bind(this)}_request(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const o={headers:this.headers,...t},r=`${this.baseUrl}${e}`;return fetch(r,o).then(this._handleResponse)}_handleResponse(e){return e.ok?e.json():Promise.reject(`Error: ${e.status}`)}getApiInitialCards(){return this._request("/cards",{method:"GET"})}getApiUserInfo(){return this._request("/users/me",{method:"GET"})}addApiNewCard(e){return this._request("/cards",{method:"POST",body:JSON.stringify(e)})}addApiUserInfo(e){return this._request("/users/me",{method:"PATCH",body:JSON.stringify(e)})}updateApiUserAvatar(e){return this._request("/users/me/avatar",{method:"PATCH",body:JSON.stringify({avatar:e})})}deleteCard(e){return this._request(`/cards/${e}`,{method:"DELETE"})}toggleLike(e,t){const o=t?"DELETE":"PUT";return this._request(`/cards/${e}/likes`,{method:o})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"7475a3c0-00b4-4b01-93e9-2c093b2534fb","Content-Type":"application/json"}},P);oe.getApiUserInfo().then((e=>{Y.setUserInfo(e)})).catch((e=>{console.error("Failed to load user info:",e)})),oe.getApiInitialCards().then((e=>{M.renderItems(e)})).catch((e=>{console.error("Error Found:",e)}))}();
//# sourceMappingURL=main.js.map