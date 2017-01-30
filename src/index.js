import React from 'react'
const fetch = window.fetch || require('node-fetch')
class Fetch extends React.Component {
	state = {
		data: null
	}
	componentDidMount() {
		const {
			options = {},
			responseType = 'json',
			onError = console.error,
			url,
			onDone
		} = this.props
		fetch(url,options)
			.then(x => x[responseType]())
			.then(data => {
				const possible = onDone && onDone(data)
				return possible || data
			})
			.then(data => this.setState({data}))
			.catch(onError)
	}
	render(){
		const {children} = this.props,
					{data} = this.state
		return children(data)
	}
    
}

export default Fetch