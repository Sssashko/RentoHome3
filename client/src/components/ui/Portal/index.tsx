import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode  // any valid React nodes (elements, text, fragments)
}

// this must match an element in your index.html, e.g. <div id="portal"></div>
const portalRoot = document.getElementById('portal')!

// render children into the portalRoot outside the normal React tree
const Portal = ({ children }: Props) =>
  createPortal(children, portalRoot)

export default Portal
