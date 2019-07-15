import React, { Component } from "react";
import logo from './logo.svg';
import Container from "./components/Container";
import Nav from "./components/Nav";
import Header from "./components/Header";
import data from "./data.json";
import ClickItem from "./components/ClickItem";


class App extends Component {
  state = { 
    data,
    score: 0,
    topScore: 0,
  };

  gameOver = () => {
    if (this.state.score > this.state.topScore) {
      this.setState({topScore: this.state.score}, function() {
        console.log(this.state.topScore);
      });
    }
    this.state.data.forEach(card => {
      card.count = 0;
    });
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  handleClick = id => {
    let guessedRight = false;
    const newData = this.state.data.map(item => {
      const newItem = { item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedRight = true;
        }
      }
      return newItem;
    });
    guessedRight
      ? this.handleCorrect(newData) : this.handleIncorrect(newData);
  }

  handleCorrect = newData => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = Math.max(newScore, topScore);

    this.setState({
      data:this.shuffle(newData),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleIncorrect = data => {
    this.setState({
      data:this.resetData(data),
      score: 0
    });
  };

  reset = data => {
    const reset = data.map(item => ({ item, clicked: false }));
    return this.shuffle(reset);
  };

  shuffle = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };
  render() {
    return (
      <Container>
        <Nav />
        <Header score={this.state.score} topScore={this.state.topScore}></Header>
        {this.state.data.map(clickItem => (
          <ClickItem
            clickCount={this.clickCount}
            id={clickItem.id}
            key={clickItem.id}
            image={clickItem.image}
          />
        ))}
      </Container>  
    );
  }
}

export default App;
