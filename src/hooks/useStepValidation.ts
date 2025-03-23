import React from 'react'
import { useForm } from './useForm'

export function useStepValidation(validate: () => boolean) {
	const { currentStep, registerValidation } = useForm<any>()
	React.useEffect(() => {
		registerValidation(currentStep, validate)
	}, [currentStep, validate])
}
