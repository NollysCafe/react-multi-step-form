import React from 'react'
import { StepProps } from './StepForm'
import { SummaryStep } from './SummaryStep'

import '../styles/components/multi-step-form.scss'

/** Props of the MultiStepForm wrapper */
export interface MultiStepFormProps<T> {
	children: React.ReactNode
	validateOnStep?: boolean
	persistKey?: string
	includeSummary?: boolean
	onSubmit: (data: T) => void
	onCancel?: () => void
}

/** Internal context shape for form control */
interface FormContextProps<T> {
	currentStep: number
	totalSteps: number
	formData: T
	setFormData: (data: Partial<T>) => void
	goToStep: (index: number) => void
	next: () => void
	previous: () => void
	registerValidation: (stepIndex: number, validate: () => boolean) => void
}

export const FormContext = React.createContext<FormContextProps<any> | undefined>(undefined)

export function MultiStepForm<T>({ children, validateOnStep = true, persistKey, includeSummary = false, onSubmit, onCancel }: MultiStepFormProps<T>): React.ReactElement {
	const steps = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<StepProps>[]
	const [currentStep, setCurrentStep] = React.useState<number>(0)

	const [formData, setFormData] = React.useState<T>(() => {
		if (typeof window === 'undefined' || !persistKey) return {} as T
		try {
			const stored = localStorage.getItem(persistKey)
			return stored ? JSON.parse(stored) : {} as T
		} catch {
			return {} as T
		}
	})

	const validators = React.useRef<Map<number, () => boolean>>(new Map())
	const isSummary = includeSummary && currentStep === steps.length

	React.useEffect(() => {
		if (!persistKey || typeof window === 'undefined') return
		localStorage.setItem(persistKey, JSON.stringify(formData))
	}, [formData, persistKey])

	const goToStep = (index: number) => {
		if (index <= currentStep) setCurrentStep(index)
	}

	const next = () => {
		if (validateOnStep && !isSummary) {
			const validate = validators.current.get(currentStep)
			if (validate && !validate()) return
		}
		if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1)
		else if (includeSummary) setCurrentStep(prev => prev + 1)
		else {
			onSubmit(formData)
			if (persistKey && typeof window !== 'undefined') localStorage.removeItem(persistKey)
		}
	}

	const previous = () => {
		if (currentStep > 0) setCurrentStep(prev => prev - 1)
	}

	const cancel = () => {
		if (persistKey && typeof window !== 'undefined') localStorage.removeItem(persistKey)
		setFormData({} as T)
		setCurrentStep(0)
		onCancel?.()
	}

	const contextValue: FormContextProps<T> = {
		currentStep,
		totalSteps: steps.length,
		formData,
		setFormData: data => setFormData(prev => ({ ...prev, ...data })),
		goToStep,
		next,
		previous,
		registerValidation: (stepIndex, validate) => validators.current.set(stepIndex, validate),
	}

	return (
		<FormContext.Provider value={contextValue}>
			<div className='multi-step-form'>
				<div className='progress-bar'>
					{steps.map((step, index) => <button key={step.props.id} className={`step-dot ${index === currentStep ? 'active' : ''}`} onClick={() => goToStep(index)} disabled={index > currentStep}>{step.props.title}</button>)}
					{includeSummary && <button className={`step-dot ${isSummary ? 'active' : ''}`} onClick={() => goToStep(steps.length)} disabled={currentStep < steps.length}>Summary</button>}
				</div>

				<div className='step-content animate'>
					{isSummary ? <SummaryStep data={formData} onSubmit={onSubmit} onCancel={cancel} /> : steps[currentStep]}
				</div>

				{!isSummary && (
					<div className='step-actions'>
						{currentStep > 0 && <button className='previous' onClick={previous}>Previous</button>}
						<button className='next' onClick={next}>{currentStep === steps.length - 1 && !includeSummary ? 'Submit' : 'Next'}</button>
						{onCancel && <button className='cancel' onClick={cancel}>Cancel</button>}
					</div>
				)}
			</div>
		</FormContext.Provider>
	)
}
