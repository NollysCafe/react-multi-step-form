import React from 'react'

import '../styles/components/step-form.scss'

export interface StepProps {
	id: string
	title: string
	isOptional?: boolean
	children: React.ReactNode
}

export const StepForm = ({ children }: StepProps): React.ReactElement => <>{children}</>
