!function(){"use strict";class e{constructor(e,t,r,o,i,n){this._name=e.name,this._link=e.link,this._id=e._id,this.isLiked=e.isLiked,this._cardSelector=t,this._handleImageClick=r,this.domElements=o,this._handleDeleteCallback=i.bind(this),this._handleLikeCallback=n.bind(this)}getView(){const e=document.querySelector(this._cardSelector);return this._cardElement=e.content.querySelector(".card").cloneNode(!0),this._cardImageElement=this._cardElement.querySelector(".card__image"),this._cardTitleEl=this._cardElement.querySelector(".card__title"),this._cardImageElement.src=this._link,this._cardImageElement.alt=this._name,this._cardTitleEl.textContent=this._name,this.likeButton=this._cardElement.querySelector(".card__like-button"),this.deleteButton=this._cardElement.querySelector(".card__delete-button"),this._isLiked(),this._setEventListeners(),this._cardElement}_isLiked(){this.isLiked&&this.likeButton.classList.add("card__like-button_active")}_setEventListeners(){this.deleteButton.addEventListener("click",(()=>{this._handleDeleteCallback()})),this.likeButton.addEventListener("click",(()=>{this._handleLikeCallback(this._id,this.isLiked,this.likeButton)})),this._cardImageElement.addEventListener("click",(()=>{this._handleImageClick({name:this._name,link:this._link})}))}}const t=document.querySelector(".profile__image"),r=document.querySelector("#profile-image-edit-modal"),o=document.querySelector("#profile-image-edit-form"),i=o.querySelector("#profile-image-edit-input"),n=o.querySelector("#profile-image-edit-button"),l=document.querySelector(".modal__close"),s=document.querySelector("#profile-edit-button"),a=document.querySelector("#profile-edit-modal"),d=document.querySelector("#profile-close-modal-button"),c=document.querySelector("#add-card-form"),u=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),p=document.querySelector("#profile-title-input"),h=document.querySelector("#profile-description-input"),_=c.querySelector("#modal-submit-create-button"),E=a.querySelector(".modal__form"),f=document.querySelector("#modal-card-delete-button"),S=document.querySelector("#card-delete-button"),b=document.querySelector("#delete-card-confirmation"),y=b.querySelector("#modal-card-delete-button"),v=document.querySelector(".card__delete-button-api"),g=document.querySelector(".card__like-button"),C=document.querySelector(".profile__add-button"),k=document.querySelector("#card-add-modal"),q=k.querySelector(".modal__form"),I=document.querySelector("#popup-image"),L=document.querySelector(".modal__image"),B=document.querySelector(".modal__caption"),w=q.querySelector(".modal__input_type_title"),A=q.querySelector(".modal__input_type_link"),D=document.querySelector(".modal__api").querySelector(".card__delete-button-api"),T=document.querySelector("#modal-confirmation-form"),U={modalSubmitApiButton:document.querySelector("#profile-modal-form").querySelector("#modal-submit-api"),modalConfirmationForm:T,cardDeleteButton:S,cardLikeButton:g,modalClose:l,modalSubmitCreateButton:_,cardDeleteSubmitButton:D,profileimageEditInput:i,profileImageEditForm:o,profileImageEditButton:n,profileImageEditModal:r,profileImage:t,deleteImageButton:v,modalDeleteCardConfirmation:y,deleteCardConfirmation:b,profileAddEditButton:s,profileEditModal:a,profileCloseModalButton:d,profileTitle:u,profileDescription:m,profileTitleInput:p,profileDescriptionInput:h,profileEditForm:E,addNewCardButton:C,cardAddModal:k,addCardFormElement:q,popupImageModal:I,modalImageElement:L,popupImageCaption:B,addCardForm:c,cardTitleInput:w,cardLinkInput:A,cardDeleteConfirmButton:f},F={profileTitle:U.profileTitle,profileDescription:U.profileDescription,profileTitleInput:U.profileTitleInput,profileDescriptionInput:U.profileDescriptionInput};window.domElements=U;var V={config:{formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit",inactiveButtonClass:"modal__submit_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"},selectors:{cardSection:".cards__list",cardTemplate:".card-template"},domElements:U,infoSelector:F};class x{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t}_showInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_toggleButtonState(e){const t=this._formElement.querySelector(this._submitButtonSelector);this._hasInvalidInput(e)?this.disableButton():(t.classList.remove(this._inactiveButtonClass),t.disabled=!1)}_hasInvalidInput(e){return!e.every((e=>e.validity.valid))}_setEventListeners(){this._inputEls=[...this._formElement.querySelectorAll(this._inputSelector)],this._inputEls.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState(this._inputEls)}))}))}disableButton(){const e=this._formElement.querySelector(this._submitButtonSelector);this._formElement.addEventListener("submit",(()=>{e.classList.add(this._inactiveButtonClass),e.disabled=!0}))}enableValidation(){this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}resetValidation(){this._inputEls.forEach((e=>{this._hideInputError(e),e.value=""})),this.disableButton()}}class H{constructor(e){let{popupSelector:t}=e;this.popupElement=document.querySelector(t),this._closeHandler=null,this._handleEscClose=this._handleEscClose.bind(this),this._handleOverlayClick=this._handleOverlayClick.bind(this),this._handleCloseClick=()=>this.close()}setEventListener(){this.popupElement.querySelector(".modal__close").addEventListener("click",this._handleCloseClick)}open(){this.popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose),document.addEventListener("click",this._handleOverlayClick)}close(){this.popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose),document.removeEventListener("click",this._handleOverlayClick),this._closeHandler&&this._closeHandler()}setCloseHandler(e){this._closeHandler=e}_handleEscClose(e){"Escape"===e.key&&this.close()}_handleOverlayClick(e){e.target.classList.contains("modal_opened")&&this.close()}}class O extends H{constructor(e,t,r){let{popupSelector:o}=e;super({popupSelector:o}),this._handleFormSubmit=t,this.domElements=r,this._form=this.popupElement.querySelector(".modal__form"),this._getInputValues=this._getInputValues.bind(this)}setEventListeners(){super.setEventListener(),this.popupElement.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues())}))}_getInputValues(){const e=Array.from(this.popupElement.querySelectorAll(".modal__input")),t={};return e.forEach((e=>{t[e.name]=e.value})),{name:t.name,about:t.description,avatar:t.link}}}const{domElements:N,selectors:$,config:j}=V,M=new class{constructor(e,t,r,o){let{items:i,renderer:n}=e;this._items=i,this._renderer=n,this._container=document.querySelector(t),this.domElements=r,this.generateCard=o}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({items:[],renderer:e=>{const t=Z(e);M.addItem(t)}},$.cardSection,N,Z),P=new x(j,N.addCardFormElement),R=new x(j,N.profileImageEditForm),J=new x(j,N.profileImageEditForm);J.disableButton();const G=new O({popupSelector:"#profile-image-edit-modal"},(e=>function(e){const t=e.avatar,r=N.profileImageEditButton;ee(!0,r),te.updateApiUserAvatar(t).then((e=>{N.profileImage.src=t,G.close()})).catch((e=>{console.error("Error updating profile image:",e)})).finally((()=>{ee(!1,r)}))}(e)),N),z=new O({popupSelector:"#card-add-modal"},(e=>function(e){ee(!0,N.modalSubmitCreateButton);const t={name:e.name,link:e.about};te.addApiNewCard(t).then((e=>{!function(e){const t=Z(e);M.addItem(t),z.close(),setTimeout((()=>{N.addCardFormElement.reset()}),1)}(e)})).then((()=>{z.close()})).catch((e=>{console.error("Error adding new card:",e)})).finally((()=>{ee(!1,N.modalSubmitCreateButton)}))}(e)),N),K=new O({popupSelector:"#profile-edit-modal"},(e=>function(e){ee(!0,N.modalSubmitApiButton),te.addApiUserInfo(e).then((e=>{X.setUserInfo(e)})).then((()=>{K.close()})).catch((e=>{console.error("Error updating profile:",e)})).finally((()=>{ee(!1,N.modalSubmitApiButton)}))}(e)),N),Q=new class extends H{constructor(e,t,r){let{popupSelector:o}=e;super({popupSelector:o}),this.domElements=r,this._confirmForm=this.popupElement.querySelector("#modal-confirmation-form"),this._handleDeleteCallback=t.bind(this)}open(e,t){super.open(),this.id=e,this.cardElement=t,this._confirmForm.removeEventListener("submit",this._submitHandler),this._submitHandler=e=>{e.preventDefault(),this._handleDeleteCallback(this.id,this.cardElement)},this._confirmForm.addEventListener("submit",this._submitHandler)}}({popupSelector:"#delete-card-confirmation"},((e,t)=>function(e,t){(function(e,t){te.deleteCard(e).then((()=>{t.remove()})).catch((e=>{console.error("Error deleting card:",e)}))})(e,t),Q.close()}(e,t)),N),W=new class extends H{constructor(e,t){let{popupSelector:r}=e;super({popupSelector:r}),this._domElements=t}open(e){let{name:t,link:r}=e;const o=this._domElements.modalImageElement,i=this._domElements.popupImageCaption;o.src=r,o.alt=t,i.textContent=t,super.open()}}({popupSelector:"#popup-image"},N),X=new class{constructor(e,t,r,o){this._nameElement=document.querySelector(e),this._jobElement=document.querySelector(t),this._linkElement=document.querySelector(r),this.domElements=o}getUserInfo(){return{title:this._nameElement.textContent,about:this._jobElement.textContent,avatar:this._linkElement.src}}setUserInfo(e){let{name:t,about:r,avatar:o}=e;this._nameElement.textContent=t,this._jobElement.textContent=r,void 0!==o&&(this._linkElement.src=o)}}(".profile__title",".profile__description",".profile__image",N);P.enableValidation(),R.enableValidation(),J.enableValidation();const Y=e=>{let{name:t,link:r}=e;W.open({name:t,link:r})};function Z(t){const r=new e(t,"#card-template",Y,N,(()=>Q.open(t._id,r._cardElement)),(()=>{return e=t._id,o=r.isLiked,i=r._cardElement,void te.toggleLike(e,o).then((t=>{const r=i.querySelector(".card__like-button");r?r.classList.toggle("card__like-button_active"):console.error("Like button not found for card with ID:",e)})).catch((e=>{console.error("Error toggling like:",e),alert("Unable to toggle like. Please try again.")}));var e,o,i}));return r.getView()}function ee(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";const o=t.name;t.textContent=e?r:o}N.profileImage.addEventListener("click",(()=>{G.open()})),N.profileAddEditButton.addEventListener("click",(()=>{const e=X.getUserInfo();N.profileTitleInput.value=e.title,N.profileDescriptionInput.value=e.about,K.open()})),N.addNewCardButton.addEventListener("click",(()=>{z.open()})),z.setEventListeners(),K.setEventListeners(),W.setEventListener(),Q.setEventListener(),G.setEventListeners();const te=new class{constructor(e){let{baseUrl:t,headers:r}=e;this.baseUrl=t,this.headers=r,this._handleResponse=this._handleResponse.bind(this)}_request(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r={headers:this.headers,...t},o=`${this.baseUrl}${e}`;return fetch(o,r).then(this._handleResponse)}_handleResponse(e){return e.ok?e.json():Promise.reject(`Error: ${e.status}`)}getApiInitialCards(){return this._request("/cards",{method:"GET"})}getApiUserInfo(){return this._request("/users/me",{method:"GET"})}addApiNewCard(e){return this._request("/cards",{method:"POST",body:JSON.stringify(e)})}addApiUserInfo(e){return this._request("/users/me",{method:"PATCH",body:JSON.stringify(e)})}updateApiUserAvatar(e){return this._request("/users/me/avatar",{method:"PATCH",body:JSON.stringify({avatar:e})})}deleteCard(e){return this._request(`/cards/${e}`,{method:"DELETE"})}toggleLike(e,t){const r=t?"DELETE":"PUT";return this._request(`/cards/${e}/likes`,{method:r})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"7475a3c0-00b4-4b01-93e9-2c093b2534fb","Content-Type":"application/json"}},N);te.getApiUserInfo().then((e=>{X.setUserInfo(e)})).catch((e=>{console.error("Failed to load user info:",e)})),te.getApiInitialCards().then((e=>{M.renderItems(e)})).catch((e=>{console.error("Error Found:",e)}))}();
//# sourceMappingURL=main.js.map