//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Integrating React with Redux

	//We are going to put together a react app and integrate Redux into it
		// - this will give us a better understanding how the libraries interact with each other
		//App will be very simple, we'll go very quickly

	//App Overview - 
		//We'll have a hard-coded list of songs
			// - when we click on a song we'll render song details onscreen to user
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//React, Redux and... REACT-REDUX??

//SongList - right hand component
	//will take list of songs (songs === [{},{}]) and render this list

//SongDetail
	//Will display song details: title, length of song onscreen to user 

	//React --> <-- React-Redux --> <-- Redux
	//Same lib 		Gets react and		Same lib we just used in codepen
	//you're 		Redux to work
	//used to 		together

	//We're going to install Redux from terminal but also we'll install REACT-REDUX
		//React-Redux - 3rd lib that helps integrate react and redux
			//has a bunch of helper functions inside of it to help React and Redux to work together


		//in terminal: npm install --save redux react-redux
			//installs both redux and react-redux to your project directory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Design of the Redux App
	//Now that we're using REdux we're going to be making use of component level state less frequently
		//--> we'll mostly be keeping our 'state' in Redux from now on.
			//--> this means must more simple and straightforward app components

	//GOAL: how we're going to design Redux side of our App

	//How do we get react and redux integrated together?

	//What would this app look like w/o redux?
		//App would pass down list of song to songlist
			// --> also pass down callback onSongSelect so App would konw user selected App

		//App would pass down currently selected song from songlist to songDetail
			// --> songDetail would render the songDetail


	//NOW WHAT WOULD THIS APP LOOK LIKE WITH REDUX?
		//App Component --> is going to pass down very little detail to components
			//SongList
			//SongDetail

		//Reducers:
			//Songlist reducer - going to create a static list of songs
				//technically doesn't need to be stored in redux but we're going to do it anyways as an
				//example
			//Selected song reducer - updates SongDetail's state when user selects song

		//Action Creators
			//Select Song
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//How React-Redux Works

	//GOAL: How to we get React and Redux to integrate using the React-Redux library?

	//Using React-Redux we're going to create new components called 
		//Provider
		//Connect

		//Redux-Store: contains all reducers and state:
			//We're going to take the store that gets created and we're going to pass it as a prop to Provider
			//Provider is top level hierarchy - even above App, has eternal reference to store
			//Connect is special - can communicate w/ the provider tag @ very top of hierarchy
				//communicates through 'context' system (different from anythign we're learned in react)
					//allows any Parent comp to directly communicate w/ any Child comp regardless of hierarchy
				//Connect will react up to provider, ask for list of songs, takes list and passes them
				//using props to SongList component

		//Action Creators: not stored in Redux-Store, instead we call an action creator
			//TAke the action that gets returned after calling creator
			//Sends it into the store.dispatch function

		//In Connect: we'll change the flow describe above a tiny bit:
			//We'll also tell Connect to send the action creator to the SongList as a prop

		//Overall Flow:
			//Create Provider
				//Pass it a ref to our redux store
			//Any time we have a comp that needs to interact w/ redux store in any way:
				//We wrap it w/ Connect tags
			//We'll configure Connect by telling it:
				//what pieces of state we want from store
				//what action creators we want wired up
			//We pretty much rely on Connect to do this stuff for us after all these steps
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Redux Project Structure

	//How are we going to organize all these files/folders?
		//src - we'll still be writing all of our code in this folder
			//actions - contains files related to action creators
			//components - files related to components
			//reducers - files reltaed to reducers
			//index.js - sets up BOTH the react and redux sice of the app

	//Create these directories
		//in actions - touch index.js
		//WHY INDEX.JS?
			//- could import like this: import actions from '../actions';
				//when we create an index.js file inside some directory webpack realizes it automatically
				//when we don't specify a file like the above import statement:
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Named vs. Default Exports

	//We're going to make our first action creator:
		//don't need a payload but we're going to use one here anyways

		//ACTION CREATOR
		const selectSong = (song) => {
			//Return an action
			return {
				type: 'SONG_SELECTED',
				payload: song
			};
		};

	//we're been using export default:
		//As we create more action creators we might want to export multiple different functions:
		//NAMED EXPORT: allows us to export many different functions from a single file
			//all we do is place 'export' kw in front of declaration

	//import statement:
	import { selectSong } from '../actions';
		//{} denote that we want something specific from a file
			//if we used export default we wouldn't need to import w/ {} like this
				//must do this when we use named exports




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Building Reducers

	//touch index.js to src/reducers directory
		//NOTE: it is overkill to use a reducer to create a hardcoded songlist but we're trying to learn...

		//Songs reducer will return an array of objects:
			//every object is a different song
				//only reason we made duration strings to express a duration easily w/ m:ss syntax.

		//selectedSong reducer checks to see if the action type is correct and returns payload
			//We placed the actions in the type key in case we want to build up the actions object in the future
				//this is good practice so that our code won't break if we want to add more stuff.




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Wiring up the Provider
	//GOAL: import the Redux library and wire up reducers to each other w/ combine connect function
	//reducers/index.js:
		import { combineReducers } from 'redux';

	//export default  combineReducers and set reducers inside object:

		export default combineReducers({
			songs: songsReducer,
			selectedSong: selectedSongReducer
		});

		//that's pretty much it for our redux side of the code for this app:
			//we created our reducers, and our action and combined the reducers for export

			//from here on out we're using React and React-Redux

	//NEXT GOAL:
		//get provider tag @ very top of hierarchy
			//pass provider a reference to the redux store

	//in src/index.js:
		import { Provider } from 'react-redux';
			//capital P b/c it's a component (this is a convention)
		import { createStore } from 'redux';
			//some function from codepen example, had passed it our set of reducers and returned
				//all reducers (app data/state)

		//underneath App import statement:
			import reducers from './reducers';

	//export statement:
		ReactDOM.render(
			<Provider store={createStore(reducers)}>
				<App/>
			</Provider>,
			document.querySelector('#root'));
		//Provider is provided all create Redux-Store
			//We reference it here direclty so we can access it @ highest level
		//When we wrap the <App/> everything has access to the <Provider/> which has the store
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//The Connect Function
	//Now that everything has access to our redux store via provider </> we can work on the React side:
	//GOAL: create a SongLing comp and hook it up to our App directory:

		//create SongList.js in src/components directory
		//import React and create class-based component called SongList and export:
			import React from 'react';

			class SongList extends React.Component {
				render(){
					return (
						<div>
							SongList
						</div>;
					);
				}
			};

			export default SongList
			//ALTERNATE SYNTAX:
			import React, { Component } from 'react';

			class SongList extends Component {
				render(){
					return (
						<div>
							SongList
						</div>;
					);
				}
			}
				//it's really up to you which way you define your class, both are acceptable and pros
				//do each 50/50.

		//NOW import @ App.js and return in div:
		import React from 'react';
		import SongList from './SongList';

		const App = () => {
			return (
				<div>
					<SongList/>
				</div>
			);
		};

		export default App;

		//Let's say now that we want to get our list of songs into our SongList and console.log
		//them out:
			//To do this: we need to create an instance of connect and pass it some config to
			//reach back up to provider and tell it that it wants to get the list of all of our 
			//songs inside of our App:
				//We will rewrite this code over and over again --> connect will be defined directly inside
				//of our SongList file, b/c only the SongList needs to create the connect function that
				//reaches up and gets the list of songs:

		//in SongList.js, import { connect } from 'react-redux';
			import { connect } from 'react-redux';
				//Notice that connect is LOWER CASE
					// is this because it's being imported from the react-redux lib and therefore not
					//a REACTjs component?
		//export default statement: DIFFERENT SYNTAX:
			export default connect()(SongList);
		//A note about this ^^^ syntax:
			//in playgrounds html app:
				function connect(){
				  return function() {
				    return 'Hi there!';
				  }
				};

				connect()();
					//when we call connect() --> it returns the function
						//when we call connect()()
							//--> we're INVOKING the 2nd funciton that got returned
								//does the syntax have to be like this b/c the 2nd function is
								//anonymous? (i.e. function (){};) ??
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Configuring Connect with MapStateToProps
	//the connect() is actually a react component that we're going to pass some configuration to:

	//GOAL: how do we configure the connect comp to tell it that we want some specific data our of our
	//Redux store?

		//inSongList.js, define function right above our export default statement:
		const mapStateToProps = (state) => {
			
		};
		//This is done by convention, says that we're going to take our state object, run some computation
		//that will cause that data to eventually show up as PROPS in our component
			//--> that is why by convention you'll see this defined as 'mapStateToProps'

		//Now let's try console.logging our state and returning to to make sure everything is working:
			const mapStateToProps = (state) => {
				console.log(state);

				return state;
			};

		//Now pass this function as the first argument to the connect() default statement:
			//this is how we configure our connect function, we pass it a function:
			export default connect(mapStateToProps)(SongList);
			//we can call this anything but by convention we defined it as 'mapStateToProps'

		//We can see the console.log, now we want to grab the Songs prop and pass it to the <SongList/>:
			//in SongList.js, remove console.log, reconfigure return statement as:
				return { songs: state.songs };
					//by returning this object, at some point in time this.props === {songs: [arrofSongs]}
					//FLOW - WILL BE REPEATED A BILLION TIMES IN EVERY REACT PROJECT:
						//1 - WE'LL ALWAYS CALL CONNECT AND PASS IN mapStateToProps as 1st arg.
						//2 - mapStateToProps will always get a first argument of state
						//3 - will always return an object that will show up as props inside our component

		//Now, in SongList.js, let's try to console.log 'this.props':
			class SongList extends React.Component {
				render(){
					console.log(this.props);
					return (
						<div>
							SongList
						</div>
					);
				}
			};
			//in console we see our props object w/ the list of songs and a ref to our dispatch function
				//we can change the data w/ the dispatch function
					//however there is a much more convenient way of doing that...
//////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Building a List with Redux Data
	//Now we have gotten some data from our Redux Store, now that we have our list of songs in our SongList
	//comp, we can start to focus on building a list of elements, will be like any other list, map over
	//this.props.songs and for every song we're going to return some JSX that will represent that song on
	//our list:
		//in SongList.js, define helper function renderList(){} above render(){}:
			renderList(){
				return this.props.songs.map((song) => {
					return (
						
					);
				});
			}; //make sure both return statements are inside renderList
					//1st return --> produces brand new array of JSX elements
						//2nd return --> returns some amount of JSX from the mapping function

		//Incorporate semantic ui classnames in renderList:
			renderList(){
				return this.props.songs.map((song) => {
					return (
						<div className="item" key={song.title}>
							<div className="right floated content">
								<button className="ui button primary">Select</button>
							</div>
							<div className="content">{song.title}</div>
						</div>
					);
				});
			}

		//and return the method in render(){} return statement:
			render(){
				return <div>{this.renderList()}</div>;
			};

		//Looks decent but let's add some more semantic ui classes to  the div to clean up the look:
			return <div className="ui divided list">{this.renderList()}</div>;

		//Looks better, but entire list of stretching from left to right hand side, need set width and 
		//right hand margin, so let's set up a grid system w/ semantic ui!:

		//in App.js, we're adding some classNames to add some structure to our component:
			return (
				<div className="ui container grid">
					<div className="ui row">
						<div className="column eight wide">
							<SongList/>
						</div>
					</div>
				</div>
			);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Extracting More Data from Redux Coding Challenge:
	//Extracting More Data From Redux
/*A new piece of property has been added to the Redux state.  Your redux state now looks like the following:*/

{
  songs: [
      { title: 'No Scrubs', duration: '4:05' },
      { title: 'Macarena', duration: '2:30' },
      { title: 'All Star', duration: '3:15' },
      { title: 'I Want it That Way', duration: '1:45' }
  ],
  favoriteTitle: 'All Star'
};
/*Notice the new favoriteTitle property.  This property refers to the title of one of the objects in the songs
array.

Your goal:
	Update the mapStateToProps function to communicate the favoriteTitle property into the React component
	When rendering the list of songs, check to see if the song you are rendering has a title equal to the 
	favoriteTitle .  If it does, then show the text 'Favorite!' next to or underneath the title of the song.

Hints:
	You can communicate more properties from the Redux state object into the component by returning them 
	in the mapStateToProps function.  

Example:*/
	const mapStateToProps = state => {
	  return { songs: state.songs, favoriteTitle: state.favoriteTitle };
	};
	//You can then access the favoriteTitle property in the component with this.props.favoriteTitle

	//You can conditionally render favoriteTitle with something like the following: 
		<b>{song.title === this.props.favoriteTitle && 'Favorite!'}</b>

/*SongList.js: */

import React from 'react';
import { connect } from './react-redux';

class _SongList extends React.Component {
    renderList() {
        return this.props.songs.map(song => {
            return (
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        <div className="ui button primary">Select</div>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            );
        });
    }

    render() {
        return <div className="ui divided list">{this.renderList()}</div>;
    }
}

const mapStateToProps = state => {
    return { songs: state.songs };
};

export const SongList = connect(mapStateToProps)(_SongList);

//Your solution:
import React from 'react';
import { connect } from './react-redux';

class _SongList extends React.Component {
    renderList() {
        return this.props.songs.map(song => {
            return (
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        <div className="ui button primary">Select</div>
                    </div> 
            		<div className="content">{song.title}
            			<b>{song.title === this.props.favoriteTitle && 'Favorite!'}</b>
                    </div>
                </div>
            );
        });
    }

    render() {
        return <div className="ui divided list">{this.renderList()}</div>;
    }
}

const mapStateToProps = state => {
    return { songs: state.songs, favoriteTitle: state.songs.favoriteTitle };
};

export const SongList = connect(mapStateToProps)(_SongList);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Calling Action Creators from Components - CODING CHALLENGE 11
	//GOAL: anytime user clicks 'select' button we want to select that song
		//--> what we're really doing when we select is updating the redux store
			//--> to do this we'll have a call an action creator (selectSong)
				//-> if we pass a song object to it will return an action w/ a type of song selected
				//with a payload of song

	//All we need to do now is figure out how to call that action creator:
		//Connect function can also be used to get action creators, correctly, into our song list
			//--> import the action creator and wire it up to the connect helper:

	//in SongList.js, import action creator:
		import { selectSong } from '../actions';
		//b/c we used a named export statement from the actions folder: 
			export const selectSong = (song) => {};
				//we have to use the curly braces, fi we did an export default we'd use the standard
				//import statement

	//Now we'll pass action creator into connect function as 2nd argument as an object:
		export default connect(mapStateToProps, {
			selectSong: selectSong
		})(SongList);

		//Since key and value are identical, we can use a little ES2015 syntax to shorten this up:
			export default connect(mapStateToProps, { selectSong })(SongList);

	//Now that we're passing in a 2nd argument, the connect function will take that selectSong action
	//creator and pass it into our Component as a prop, inside render(), let's console.log(this.props):
		//So if we call selectSong it will automatically take the action that gets returned and send it
		//into redux's dispatch function:
			//--> rather than directly calling selectSong() after we import we set it up in the connect
			//function, before we investigate this let's make our app work:

	//Let's update the button to be able to call SelectSong in SongList.js:
		<button 
			className="ui button primary"
			onClick={() => this.props.selectSong(song)}
		>Select
		</button>

	//Now this will change our state, but we can't see it, to see this change let's go to our 
	//MapStateToProps function, anytime we change state this function will rerun, so inside of 
	//MapStateToProps let's console.log(state):
		const mapStateToProps = state => {
			console.log('state: ', state);

			return { songs: state.songs };
		};
			//console.log === all of our state in the redux store
				//when we click the button we see the selected song updated w/ the info from the button
				//we just pushed

		//Next we will discuss why we went through all this effort to call the action creator: selectSong
		//from the Connect function:
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//REDUX IS NOT MAGIC!
	//Previously we made a big deal of the fact that we imported the action creator and passed it off
	//to the connect function, instead of just directly calling the action creator inside the component:

	//REDUX IS NOT MAGIC!!!
		//Redux does not automatically detect action creators being called
			//there is nothing inside our action creator that wires it up to redux
		//Redux does not automatically detect a function returning an object that is an 'action'
			//we're not so much importing an action creator as we are importing a regular js function
				//however, if we were to call selectSong it would just return an object
					//the object never gets forwarded to Redux, 
						//if we want make sure an action makes its way to our reducers, we have to call
						//the dispatch function
							//--> we have to take the action returned and pass it into the dispatch function

		//Remember our codepen.io insurance company example?
		const store = createStore(ourDepartments);

		store.dispatch(createPolicy('Alex', 20));
		store.dispatch(createPolicy('Bob', 40));
		store.dispatch(createPolicy('Jane', 30));
			//notice every single time we dispatch an action we called our action creator,
				//creator returned an action object
					//--> object was passed to the store.dispatch function
		createPolicy('Alex', 20);
		createPolicy('Bob', 40);
		createPolicy('Jane', 30);
			//these would not update our redux store, they return actions, but actions never got sent
			//into redux, and never ended up in our reducers.

			//REMEMBER: IF WE WANT TO MAKE SURE AN ACTION CREATOR UPDATES OUR STATE
				//==> HAVE TO TAKE THE ACTION THAT GETS RETURNED, AND SEND IT INTO THAT DISPATCH FUNCTION:
				store.dispatch(createPolicy('Jane', 30));



	//We see no reference to dispatch in our app: so what's really going on?
		//When we pass our action creators into our connect function (SongList.js):
		export default connect(mapStateToProps, { selectSong })(SongList);
												//^^HERE^^
		//--> connect function does a special operation the functions inside this object { selectSong }:
			//--> wraps them in another js funciton
			//--> when we call the new JS function, the connect function will:
				//automatically calls action creator
				//takes action that gets returned
				//automatically calls the dispatch function for us
	//WHENEVER WE CALL our action creator object (this.props.actioncreator / props.actioncreator):
		//automatically takes that action that gets returned and throws it into the dispatch function
		//for us
			//==> this is why we passed our action creator off to the connect function instead of
			//automatically calling it inside of our <SongList/>

	//ANYTIME YOU EVER WANT TO CALL AN ACTION CREATOR FROM A COMPONENT YOU ARE ALWAYS GOING TO PASS IT
	//INTO THE CONNECT FUNCTION:
		export default connect(mapStateToProps, { selectSong })(SongList);
	//INSTEAD OF THIS: 
		renderList(){
			selectSong(); //<==NO!!!!
		};

	//In summation, Redux is not magic, you have to do a lot of wiring up to make redux work
		//that's a chief complaint of the library, you have to write a lot of boilerplate to make it work
			//other data management libraries have a lot more of intuitive behind the scenes stuff that you
			//don't have to code, it's better for you to learn this b/c you ahve to understand it to use it
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functional Components with Connect
	//GOAL: start putting together SongDetail comp
		//all it needs to do is show some info about the selectedSong

	//FLOW OF <SongDetail/> with connect()() function:
		//Song Detail needs to know about some info stored inside redux Store
		//We'll wrap our SongDetail with the <Connect/> comp
		//We'll define a mapstatetoprops that will tell <Provider/> "tell me anytime selectedSong changes"
		//In response, <Provider/> tells connect()() any time user changes currently selected song
		//Connect()() takes currently selected song and passes it as a prop to the <SongDetail/> comp
		//SongDetail has no functionality component tied to it that will cause a change to state
			//--> we do not need to wire up an action creator to our <SongDetail/>

	//Create SongDetail.js in src/component directory, insert boilerplate for functional comp and 
	//include connect import:
	import React from 'react';
	import { connect } from 'react-redux';

	const SongDetail = () => {
		return <div>SongDetail</div>
	};

	export default SongDetail;

	//Now we want to wrap the <SongDetail/> with Connect()() so we can get some data into our redux
	//store, using the the MapStateToProps(){}
		//remember, when we exported our combineReducers?
			export default combineReducers({
				songs: songsReducer,
				selectedSong: selectedSongReducer
			});
				//this stores our selectedSongReducer in state.selectedSong

		const mapStateToProps = (state) => {
			return { song: state.selectedSong }
		};

	//Now we'll export the SongDetail with connect()() and mapStateToProps:
		export default connect(mapStateToProps)(SongDetail);

	//To console log this we'll provide props as an argument and console.log it out:
		 const SongDetail = ()=> {
			console.log("props: ", props);
			return <div>SongDetail</div>
		};
		//next time we'll focus on rending out this props object into jsx elements in SongDetail.js
//////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Conditional Rendering
	//GOAL: customize what <SongDetail/> will render based upon the song inside that props object:

	//We're going to destructure out the song property out of the props object:
		const SongDetail = ({ song }) => {
			return <div>{song.title}</div>
		}; /*however, we get an error message b/c we're trying to initially display a song.title prop that
			has an initial value of null*/
		//To fix we'll use a ternary:
		const SongDetail = ({ song }) => {
			if (!song) {
				return <div><h3>Select A Song</h3></div>
			}

			return(
			<div>
				<h3>Details for: </h3>
				<p>
					Title: {song.title}
					<br/>
					Duration: {song.duration}
				</p>
			</div>
			); 
		};

		//Big Lessons:
			//We will still create our components as usual
			//Then we'll select some very specific components inside our app that need to
				//receive info or make changes to state
					//if so --> import the connect helper
						//then @ bottom of file define mapstatetoprops()
							//pass mapstatetoprops as 1st argument
							//put component we care about as the second argument:
							export default connect(mapStateToProps)(SongDetail);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Connecting Components to Redux - CODING CHALLENGE 12

/*Note: this is a tough exercise!  If you have trouble, check out the solutions in the next video.

The Counter component shown below is having a little trouble.  The goal is to show a 'counter' and two 
buttons to either increase or decrease the counter.  Everything on the Redux side of the app - including 
the action creators, store, and reducers - has been completed, but the React and Redux sides of the app 
don't quite interact with each other yet.

Your goal:

Make sure that the connect function is passed a mapStateToProps function so that the component receives 
the count piece of state

Make sure that the Counter component prints out the current count inside of the span
Make sure the 'connect' function gets called with the increment and decrement action creators
Make sure that clicking on the Increment or Decrement buttons calls the appropriate action creator
You don't need to write any import statements

index.html*/

    // Action Creators - You don't need to change these
    const increment = () => ({ type: 'increment' });
    const decrement = () => ({ type: 'decrement' });
    //YOUR SOLUTION//
    const Counter = ({ count, increment, decrement }) => {
        return (
            <div>
                <button 
                    className="increment" 
                    onClick={()=> increment(count)}
                >Increment</button>
                <button 
                    className="decrement" 
                    onClick={()=> decrement(count)}
                >Decrement</button>
                Current Count: <span>{count}</span>
            </div>
        );
    };
    
    const mapStateToProps = state => {
    	return { count: state.count };
    };
    
    const WrappedCounter = ReactRedux.connect(mapStateToProps, {increment, decrement})(Counter);
    
    // Only change code *before* me!
    // -----------
    
    const store = Redux.createStore(Redux.combineReducers({
        count: (count = 0, action) => {
            if (action.type === 'increment') {
                return count + 1;
            } else if (action.type === 'decrement') {
                return count - 1;
            } else {
                return count;
            }
        }
    }));

    ReactDOM.render(
        <ReactRedux.Provider store={store}>
            <WrappedCounter />
        </ReactRedux.Provider>, 
        document.querySelector('#root')
    );
//The App component above will be rendered into this
<div id="root"></div>
  
