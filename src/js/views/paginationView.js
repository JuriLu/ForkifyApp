import View from "./View";
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _errorMessage = `We couldn't find the recipe. Please try another one!`
    _message = ``

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            //* Event delegation
            const btn = e.target.closest('.btn--inline')  //* find out which button was clicked
            if (!btn) return

            const goToPage = +btn.dataset.goto

            handler(goToPage)
        })
    }

    _generateMarkup() {
        const currentPage = this._data.page
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)

        //* Page 1, and there are other pages
        if (currentPage === 1 && numPages > 1) {
            return `
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
              <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button> 
            `
        }

        //* Last Page
        if (currentPage === numPages && numPages > 1) {
            return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${currentPage - 1}</span>
            </button>
            `
        }

        //* Other Page
        if (currentPage < numPages) {
            return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
              <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button> 
            `
        }

        //* Page 1, and there are NO other pages
        return ''
    }
}

export default new PaginationView()