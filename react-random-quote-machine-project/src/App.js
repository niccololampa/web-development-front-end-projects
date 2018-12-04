//This app is simple enought that it can be done solely in React. 
//Added Redux for demo purposes onyly
/* For the fader animation. Libarires like react-fader  or react-transition group can be 
used instead. But for react and redux state demonstration a manual approach was used. See 
https://reactjs.org/docs/animation.html */


import React, { Component } from 'react';
import './App.css';

//you need to execute npm install --save redux
import { combineReducers ,createStore } from 'redux';

//you need to execute npm install --save react-redux
import { Provider, connect } from 'react-redux';

//this app will choose from these random quotes array in the database. [author, quote]
const quotes = [
  ["Why The Lucky Stiff" , " When you don't create things, you become defined by your tastes rather than ability. Your tastes only narrow and exclude people. So create." ],
  ["John Woods", "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live." ],
  ["Kent Beck","I'm not a great programmer, I'm just a good programmer with great habits." ],
  ["Brian Kernighan",  "Everyone knows that debugging is twice as hard as writing a program in the first place. So if you're as clever as you can be when you write it, how will you ever debug it?"],
  ["Robert C. Martin" , "Truth can only be found in one place: the code."],
  ["Ellen Ullman" , "We build our computer (systems) the way we build our cities: over time, without a plan, on top of ruins."],
  ["Patrick McKenzie" , "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it."],
  ["Michael Jackson" , "Rules of Optimization: Rule 1: Don't do it. Rule 2 (for experts only): Don't do it yet."],
  ["Grace Hopper" , "\"How did you know so much about computers? I didn't, it was the first one\""],
  ["Niklaus Wirth", "A primary cause of complexity is that software vendors uncritically adopt almost any feature that users want." ],
  ["Andy Hunt", "No one in the brief history of computing has ever written a piece of perfect software. It's unlikely that you'll be the first."],
  ["Oscar Godson", "One of the best programming skills you can have is knowing when to walk away for awhile."]
];

//get the length of the quotes object to determine the range of random index numbers.
let numQuotes = quotes.length;

//produce an index to extract quote from quotes list
const indexRef = () => {
  return Math.floor((Math.random() * numQuotes));
}

//Create a initial index
const inIndex = indexRef();

//Redux ------------------ DO THIS SECOND STEP
//best practice is to declare the action as a variable
const NEWQOUTE = "NEWQOUTE";
const NEWCLASS = "NEWCLASS";
const REMCLASS = "REMCLASS"; // can be removed keeeping it here for future reference. 

//Create action creator
const newQuote = (index) => {
  return {
    type: NEWQOUTE,
    payload: {
      index: index
    }
  }
};

//Change Fader class. 
const newClass = (classInput) => {
  return {
    type: NEWCLASS,
    payload: {
      classGen: classInput //previously "fader". Notes for future reference
    }
  }
};

//removing the fader class . This can be removed. Keeping it here for future reference. 
const remClass = () => {
  return {
    type: REMCLASS,
    payload: {
      classGen: ""
    }
  }
};

//create a reducer to go through all actions
const newQuoteReducer =(state=null, action) => {
  switch (action.type){
    case NEWQOUTE:
      return action.payload.index;

    default:
      return state;
  }
};

const newClassReducer = (state='', action) => {
  switch (action.type){
    case NEWCLASS:
      return action.payload.classGen;

    //this can be removed but just keep it here for future reference. 
      case REMCLASS:
      return action.payload.classGen;

    default: 
      return state;
  }
};

//Combine reducers 
const allReducers = combineReducers({
    newIndex : newQuoteReducer,
    newFaderClass : newClassReducer
})


//declare initial states 
const initialStates = {
  newIndex: inIndex,
  newFaderClass: "fader"
};

//Create store
const store = createStore(allReducers, initialStates);

// React-Redux -------------- 3rd Step
//Need to  use provider to connect redux to react
//No need anymore as they are already imported
// const Provider = ReactRedux.Provider;
// const connect = ReactRedux.connect;

//React ------------------ 1st STEP

//Author Component (State-Less)
const Author = (props) => {
  return <p className= {props.statePass} >{quotes[props.indexPass][0]}</p>
}

//Quote Component
const Quote = (props) => {
  return <p className= {props.statePass} >{quotes[props.indexPass][1]}</p>
}

//Main App Component
class App extends Component{
  constructor(props){
    super(props);    
    this.changeQuote = this.changeQuote.bind(this);
  }

  changeQuote(){    

    // this will initiate change in class for fading animation 
    if(this.props.newFaderClass === "fader"){
       this.props.addFaderClass("fader2");
       console.log('changed to class fader2')
     };

     if(this.props.newFaderClass === "fader2"){
      this.props.addFaderClass("fader");
      console.log('changed to class fader')
    }; 
     
    //random index number to access quote.   
    let newIndex = indexRef();

    //must make sure that the quote will not repeat by having the same index
    while (newIndex === this.props.index){
      newIndex = indexRef();
    }
    
    //Pass the new index to redux dispatch
    this.props.createNewIndex(newIndex);        
  }
 
// IGNORE COMMENTS BELOW. KEEPING IT HERE FOR FUTURE REFERENCE PURPOSES.      
    
//   componentDidUpdate(){   
//     this.props.addFaderClass(); 
//     console.log("added fader class")           
//   }

//   componentDidMount(){
//     this.props.remFaderClass(); 
//     console.log("added fader class")         
//   }

  render(){  
    console.log("render class")
    let index = this.props.index; // edited from this.state for redux.
    let editedClass = this.props.newFaderClass;   //this is the current state of fader class. 

      //this will create the twitter link.
    let link = "https://twitter.com/intent/tweet?text= \"" + quotes[index][1] + "\" " + quotes[index][0] + " %23quotes";

    return (
      //divs have id just for FCC project checking
      
      <div className = "container">      

        <div className ="headings">
          <h1> Quotes to Fire You Up!!!</h1>
          <h2> Programmers need motivation and inspiration too</h2>
        </div>

        <div className= "quote-box" id="quote-box">

          <div className= "text" id= "text">
            <Quote indexPass= {index} statePass = {editedClass} />
          </div>

          <div className= "author" id= "author">
            <Author indexPass= {index} statePass = {editedClass} />
          </div>

          <div className = "quote-button-area">
            <button className="quote-button" id="new-quote" onClick= {this.changeQuote}>
              Start New Quote
            </button>
          </div>

          <div className= "twitter-button-area">
            <a id="tweet-quote" ref="tweetButton"
            className="fa fa-twitter"
            href={link}
            target= "_blank"
            data-size="large"
            rel="noopener noreferrer">
            </a>
          </div>
        </div>

        <footer className= "disclaimer"> Niccolo Lampa Sample Porfolio. React and Redux Project.  No copyright infrigement intendent. For demo purposes only </footer>
     
        </div>
    )
  }
}

//Map state to props   4th step. This determines the states that you want to access.
const mapStateToProps = (state) => {
  return {
    index : state.newIndex,
    newFaderClass: state.newFaderClass    
  }
};

//Map Dispatch to props 5th step. This is the source of the functions you call in the react functions and where the react functions arugments are passed .
const mapDispatchToProps = (dispatch) => {
  return {   
    createNewIndex : (index) => {
      dispatch(newQuote(index))
    },
    addFaderClass: (classInput)=>{
      dispatch(newClass(classInput))
    },
    remFaderClass: ()=>{
      dispatch(remClass())
    },
  }
};

//Connecting Redux to React.
const Container = connect(mapStateToProps, mapDispatchToProps)(App);

//Provider Wrapper . This allows you to access the redux store and dispatch funtions.
class AppWrapper extends Component{
  render(){
    return (
      <Provider store= {store}>
        <Container />
      </Provider>
    );
  }
};

//Export AppWrapper to browser 
export default AppWrapper;
