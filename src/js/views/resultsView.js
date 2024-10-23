import View from "./View";
import previewView from './previewView.js';


class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found for your query! Please try again; `
    _message = ``

    _generateMarkup() {
      return this._data
      .map(result => previewView.render(result,false)) //* false here makes possible that render returns a string , with map returns an array of strings
      .join('')  //* we join all the string together
  }
}

export default new ResultsView()