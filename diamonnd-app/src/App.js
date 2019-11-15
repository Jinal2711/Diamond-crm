import React from 'react';
import Navigation from './components/Navigation';
import Carousel from './components/carousel';
import Cards from './components/cards';
import './App.css';

class App extends React.Component {
  state = {
    scroll_top: 0
  }

  componentDidMount() {
    window.addEventListener('scroll', (event) => {
      this.setState({
        scroll_top: event.target.scrollingElement.scrollTop
      })
    })
  }
  render() {

    return (
      <div className="App" >
        <Navigation scroll_top={this.state.scroll_top} />
        <Carousel />
        <Cards scroll_top={this.state.scroll_top} />
      </div>
    );
  }
}

export default App;
