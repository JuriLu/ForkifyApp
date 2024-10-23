import icons from 'url:../../img/icons.svg'

export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError()

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));


        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];

            //* Updates changed TEXT
            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''   //? Elements that contain text directly
            ) {
                curEl.textContent = newEl.textContent;
            }

            //* Update changed ATTRIBUTES
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
            }
        })

        /*
        ? What will happen in this method is to create newMarkup but not render it. Instead we will genereate the newMarkup
        ? and compare THE NEW HTML with the CURRENT HTML, and only change text and attributes that actually have changed from the old version
        ? to the new version

        ? We also convert the newMarkup (which is just a string) into a DOM object that is living in memory. So we can easily compare
        ? the DOMs.
         */
    }

    _clear() {
        this._parentElement.innerHTML = ''
    }

    renderSpinner() {
        const markup = `
       <div class="spinner">
         <svg>
            <use href="${icons}#icon-loader"></use>
         </svg>
       </div> 
       `;
        this._parentElement.innerHTML = ''
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderError(message = this._errorMessage) {
        const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMessage(message = this._message) {
        const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
};