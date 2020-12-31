//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Integrating React with Redux

	//We are going to put together a react app and integrate Redux into it
		// - this will give us a better understanding how the libraries interact with each other
		//App will be very simple, we'll go very quickly

	//App Overview - 
		//We'll have a hard-coded list of songs
			// - when we click on a song we'll render song details onscreen to user



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
			//We pretty much realy on Connec to do this stuff for us after all these steps



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
//The Connect Function