# React Fetch

> It's so fetch

A wrapper for making `fetch` calls and passing the data back into the React component. Uses either `window.fetch` or falls back to `node-fetch`.

## Usage

*instal*
```
$ yarn install @beardedtim/react-fetch
```

*use*
```
import Fetch from '@beardedtim/react-fetch
// OR
const Fetch = require('@beardedtim/react-fetch')

class Component extends React.Component {
...
    render(){
        return (
            ...
            <Fetch
                url="https://api.github.com/users/beardedtim"
            >
                {/* We must pass child as a function and it must return null, string, or React Comp*/}
                {(data: user) => user && (
                    <GitHubProfile 
                        user={user}
                    />
                )
            </Fetch>
            ...
        )
    }
}
```

## Props

```
const {
	options = {},
	responseType = 'json',
	onError = console.error,
	url,
	onDone
} = this.props
```

`options` - The options object to pass to the `fetch` call
`responseType` - The way to handle the response ( `json` and `text` are used most often )
`onError` - The function to call when there is an error with the `fetch` call
`url` - The URL to fetch from
`onDone` - The callback to call when done. Gets passed data and can transform data before sending to child

## componentDidMount

All logic is handled inside of `Fetch`'s `componentDidMount` method:

```
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
```

and the first time that this component is rendered, it passes `null` as the data for 

## License

MIT
