const MO = window.MutationObserver || window.WebkitMutationObserver

/**
 * Nilbog style observer wrapping MutationObserver.
 * Simple operations that store params and parent element for easy connect/disconnect.
 */
class Observer {
  /**
   * Initialize observer.
   * @param {function} matches - Function that returns true if mutated element matches some criteria. Bound to Observer.
   * @param {Element} parent - Element to observe
   * @param {MutationObserverInit} observerParams - Params passed when connecting observer.
   * @param {function} fn - Function to call on mutation. Bound to Observer.
   */
  constructor (matches, parent, observerParams, fn) {
    /**
     * Check if mutated element matches
     * @param {Node} el
     * @returns {boolean}
     */
    this.matches = this::matches

    /**
     * Internal MutationObserver
     * @member {MutationObserver}
     */
    this.observer = new MO(this::fn)

    /**
     * Element to observe
     * @member {Element}
     */
    this.parent = parent

    /**
     * Params passed when connecting observer.
     * @member {MutationObserverInit}
     */
    this.params = observerParams

    /**
     * Is the Observer currently observing?
     * @member {boolean}
     */
    this.connected = false
  }

  /**
   * Start observing.
   */
  connect () {
    if (!this.connected) {
      this.observer.observe(this.parent, this.params)
      this.connected = true
    }
    return true
  }

  /**
   * Suspend observing.
   */
  disconnect () {
    if (this.connected) {
      this.observer.disconnect()
      this.connected = false
    }
    return true
  }

  /**
   * Suspend observing to operate.
   * @param {function} fn - Bound to Observer.
   * @return {*} - Returns whatever `fn` returns
   */
  operate (fn) {
    if (this.connected) {
      this.disconnect()
      const f = this::fn()
      this.connect()
      return f
    } else {
      return this::fn()
    }
  }
}

export default Observer
