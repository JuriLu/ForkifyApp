import View from "./View";
import previewView from './previewView';

class BookmarksView  extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = `No bookmarks yet. Find a nixe recipe and bookmark it. `
    _message = ``

    addHandlerRender(handler){
      window.addEventListener('load',handler)
    }

    _generateMarkup() {
        return this._data
        .map(bookmark => previewView.render(bookmark,false)) //* false here makes possible that render returns a string , with map returns an array of strings
        .join('')  //* we join all the string together
    }
}

export default new BookmarksView()