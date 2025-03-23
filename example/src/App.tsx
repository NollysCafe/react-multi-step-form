import React from 'react'

// Components
import { MultiStepForm, StepForm, useForm, useStepValidation } from 'react-multi-step-form'

interface MyFormShape {
	email: string
	topics: string[]
}

export default function App(): React.ReactElement {
	return (
		<main className='page' style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
			<h1>📦 react-multi-step-form demo</h1>

			<MultiStepForm<MyFormShape>
				onSubmit={data => alert(JSON.stringify(data, null, 2))}
				onCancel={() => alert('Cancelled')}
				persistKey='demo-form'
				includeSummary
			>
				<StepForm id='email' title='Email'>
					<EmailStep />
				</StepForm>
				<StepForm id='topics' title='Topics'>
					<TopicStep />
				</StepForm>
			</MultiStepForm>

			<p>
				<a href='https://github.com/nollyscafe/react-multi-step-form' target='_blank' rel='noopener noreferrer'>⭐️ GitHub</a>
				{' | '}
				<a href='https://npmjs.com/package/react-multi-step-form' target='_blank' rel='noopener noreferrer'>📦 NPM</a>
				{' | '}
				<a href='https://nollyscafe.github.io/react-multi-step-form/' target='_blank' rel='noopener noreferrer'>📖 Docs</a>
				{' | '}
				<span>Made with ❤️ by <a href='https://cafe.thenolle.com' target='_blank' rel='noopener noreferrer'>Nolly's Cafe</a></span>
			</p>
		</main>
	)
}

function EmailStep() {
	const { formData, setFormData } = useForm<any>()
	useStepValidation(() =>
		!!formData.email &&
		formData.email.includes('@') &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
	)

	return (
		<div className='step'>
			<label>Email address</label>
			<input
				type='email'
				value={formData.email || ''}
				placeholder='your@email.com'
				onChange={e => setFormData({ email: e.target.value })}
			/>
		</div>
	)
}

function TopicStep() {
	const { formData, setFormData } = useForm<any>()
	useStepValidation(() => Array.isArray(formData.topics) && formData.topics.length > 0)

	const toggle = (topic: string) => {
		const topics = new Set(formData.topics || [])
		topics.has(topic) ? topics.delete(topic) : topics.add(topic)
		setFormData({ topics: [...topics] })
	}

	const options = ['Tech', 'Design', 'Startups', 'AI', 'Music']

	return (
		<div className='step topics'>
			<label>Select topics of interest</label>
			<div className='topic-grid'>
				{options.map(topic => (
					<button
						key={topic}
						type='button'
						className={formData.topics?.includes(topic) ? 'selected' : ''}
						onClick={() => toggle(topic)}
					>
						{topic}
					</button>
				))}
			</div>
		</div>
	)
}
