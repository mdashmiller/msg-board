import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				  	<div className="App">
							<div className="container">
				  				<h1 className="center-align blue-text text-darken-3">Messages Go Here!!!</h1>
							</div>
				  	</div>
			</BrowserRouter>
    	)
  	}
}

export default App
