// Custom cache handler for Next.js incremental static regeneration
export default class CacheHandler {
  constructor(options) {
    this.options = options
  }

  async get(key) {
    // Default implementation returns null
    return null
  }

  async set(key, data, options) {
    // Default implementation is a no-op
  }
}