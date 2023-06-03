import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const rootNode = document.getElementById('root') as HTMLElement
const root = createRoot(rootNode)
root.render(<App />)
