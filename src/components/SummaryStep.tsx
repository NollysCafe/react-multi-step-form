import React from 'react'

import '../styles/components/summary-step.scss'

interface SummaryStepProps<T> {
	data: T
	onSubmit: (data: T) => void
	onCancel?: () => void
}

export function SummaryStep<T>({ data, onSubmit, onCancel }: SummaryStepProps<T>): React.ReactElement {
	return (
		<div className='summary-step'>
			<h3>Summary</h3>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<div className='step-actions'>
				<button className='submit' onClick={() => onSubmit(data)}>Confirm</button>
				{onCancel && <button className='cancel' onClick={onCancel}>Cancel</button>}
			</div>
		</div>
	)
}
