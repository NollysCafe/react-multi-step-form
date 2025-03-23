import React from 'react'
import { FormContext } from '../components/MultiStepForm'

export function useForm<T>(): T {
	const context = React.useContext(FormContext)
	if (!context) throw new Error('useForm must be used within MultiStepForm')
	return context as T
}
