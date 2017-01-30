import React from 'react'

import {shallow, mount, render} from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'
import fetch from 'node-fetch'

import Fetch from '../index'

describe('Fetch', () => {
	
	it('passes null on initial mount to child function',()=>{
		let count = 0
		const counter = data => count = data
		const wrapper = shallow(<Fetch children={counter} url={'http://google.com'}/>)
		expect(count).to.equal(null)
	})
	
	it('calls onDone with the result of the fetch',(done)=>{
		sinon.spy(Fetch.prototype, 'componentDidMount')
		const onDone = (result) => {
			fetch("https://api.github.com/users/beardedtim")
				.then(x => x.json())
				.then(data => {
					expect(data).to.deep.equal(result)
					done()
				}).catch(err => (expect(err.stack).to.not.exist,done()))
		}
		const wrapper = mount(<Fetch url="https://api.github.com/users/beardedtim" responseType="json" onDone={onDone}>{(data) => data  && null}</Fetch>)
	})
	
	it('updates the state with the returned value of onDone if passed',(done)=>{
		const onDone = (result) => {
			setTimeout(()=>{
				expect(wrapper.state().data).to.equal('This is from onDone')
				done()
			},500)
			return 'This is from onDone'
		}
		const wrapper = mount(<Fetch url="https://api.github.com/users/beardedtim" responseType="json" onDone={onDone}>{(data) => data  && null}</Fetch>)
	})
	
	it('updates the state with the original fetch result if no onDone handler is passed',(done)=>{
		const child = (data) => {
			if(data){
				expect(wrapper.state().data).to.equal(data)
				done()
			}
			return null
		}
		const wrapper = mount(<Fetch url="https://google.com" responseType="text">{child}</Fetch>)
	})
	
	it('calls the onError handle when fetch.catch is called',(done)=>{
		const onError = (err) => {
			expect(err).to.exist
			done()
		}
		const wrapper = mount(<Fetch url="google.com" responseType="json" onError={onError}>{(data) => data  && null}</Fetch>)
	})

})