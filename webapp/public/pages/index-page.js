import React, { Component } from 'react';
import Navbar from 'react-ps-navbar';
import JumboTron from 'jumbotron-ps';
import InfoPanel from 'info-ps-panel';

class IndexPage extends Component {
	render() {
		const options = [{
			title: 'Devpost',
			route: '/',
			drops: []
		}, {
			title: 'Github',
			route: '/',
			drops: []
		}];
		const customHeader = (
			<h4 style={{ color: 'white', display: 'inline-block', padding: '15px' }}>
				NodePad
			</h4>
		);
		var features = [
		    {title: 'Concept Mapping', description: 'A network-graph based visualization that allows you to see the big picture and find links between topics that were abstract and arbitrary beforehand.'},
		    {title: 'Spaced Repetition', description: 'Reinforce your understanding of the material by taking SMS-based quizzes (parsed directly from your notes using IBM Watson and Microsoft Linguistic Analysis APIs) on an hourly basis.'},
		    {title: 'No More Cramming!', description: 'Never cram again - Spaced repition has been proven to be more effective than bulk highlighting and reading and re-watching old lectures. 5 Minutes a day keeps the Finals Anxiety Away!' },
		    {title: 'Share Your Notes', description: 'Share your notes with your friends and compete to see who can answer more questions correctly - or who can create the most difficult quiz set. Utilize the shared question pool to help your review'}
		]
		return (
			<div>
				<Navbar 
					custom_header={customHeader} 
					options={options} 
				/>
				{
					this.props.children ||
					<div>
						<JumboTron 
							title='Notably Noteworthy Nodes.'
							outer_style={{
								display: 'block',
								height: '350px',
								backgroundImage: `url(${'https://secure.static.tumblr.com/bd29e7e9e5d2dc6928ae2fef2a43771d/vthdtca/bAnnrejpi/tumblr_static_tumblr_static_dm0oc1iqtlskw8g44c8cwks0g_640.png'})`
							}}
						>
							<div style={{ margin: '0 auto', color: 'white' }}>
								<h1 style={{ color: 'white', textAlign: 'center' }}>A Noteworthy Innovation</h1>
								<p style={{ textAlign: 'center' }}>
									A new way to take notes that will actually 
									help you remember what happened in lecture.
								</p>
								<a href='/notes'>
									<button 
										style={{ 
											display: 'block', 
											margin: '0 auto', 
											fontSize: '16px',
											borderRadius: '20px',
											width: '150px'
										 }} 
										className='success button'
									>
										<i className='fi-pencil' style={{ color: 'white', fontSize: '15px', paddingRight: '10px' }} />
										Try It Out
									</button>
								</a>
							</div>
						</JumboTron>
						<InfoPanel features={features} title='Features' image_url='http://www.enspire.com/wp-content/uploads/2014/02/LDS_Art_Home.png' />
					</div>
				}
			</div>
		);
	}
}

export default IndexPage;
