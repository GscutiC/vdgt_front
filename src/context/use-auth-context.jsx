"use client"
import React, {useState} from "react";

const InitialValues = {
    currentStep: 1,
    setCurrentStep: () => undefined,
}

const authContext = React.createContext(InitialValues)

const {Provider} = authContext

export const AuthContextProvider = ({children}) => {
    const [currentStep, setCurrentStep] = useState(InitialValues.currentStep)
    
    const values = {
        currentStep,
        setCurrentStep
    }
    
    return <Provider value={values}>{children}</Provider>
}

export const useAuthContextHook = () => {
    const state = React.useContext(authContext)
    return state
}