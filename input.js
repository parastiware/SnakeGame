let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

function setDirection(dir) {
    // Prevent reversing directly
    if (dir === 'up' && lastInputDirection.y !== 0) return
    if (dir === 'down' && lastInputDirection.y !== 0) return
    if (dir === 'left' && lastInputDirection.x !== 0) return
    if (dir === 'right' && lastInputDirection.x !== 0) return

    switch (dir) {
        case 'up':
            inputDirection = { x: 0, y: -1 }
            break
        case 'down':
            inputDirection = { x: 0, y: 1 }
            break
        case 'left':
            inputDirection = { x: -1, y: 0 }
            break
        case 'right':
            inputDirection = { x: 1, y: 0 }
            break
    }
}

function pressVisual(id) {
    const el = document.getElementById(id)
    if (!el) return
    el.classList.add('pressed')
    clearTimeout(el.__pressedTimeout)
    el.__pressedTimeout = setTimeout(() => el.classList.remove('pressed'), 140)
}

// Keyboard handling
window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase()
    let handled = false

    if (key === 'arrowup' || key === 'w') {
        setDirection('up'); pressVisual('up'); handled = true
    } else if (key === 'arrowdown' || key === 's') {
        setDirection('down'); pressVisual('down'); handled = true
    } else if (key === 'arrowleft' || key === 'a') {
        setDirection('left'); pressVisual('left'); handled = true
    } else if (key === 'arrowright' || key === 'd') {
        setDirection('right'); pressVisual('right'); handled = true
    }

    if (handled) e.preventDefault()
})

// Wire up on-screen buttons (click & pointer interactions)
function bindButtons() {
    ['up', 'down', 'left', 'right'].forEach(id => {
        const el = document.getElementById(id)
        if (!el) return

        el.addEventListener('pointerdown', (ev) => {
            ev.preventDefault()
            el.classList.add('pressed')
            setDirection(id)
        })

        const clear = () => {
            el.classList.remove('pressed')
        }

        el.addEventListener('pointerup', clear)
        el.addEventListener('pointercancel', clear)
        el.addEventListener('mouseleave', clear)

        // Also support click for browsers that fire click only
        el.addEventListener('click', () => {
            setDirection(id)
            pressVisual(id)
        })
    })
}

// defer binding until DOM ready (script is deferred, but guard anyway)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindButtons)
} else {
    bindButtons()
}

export function getInputDirection() {
    lastInputDirection = { ...inputDirection }
    return inputDirection
}