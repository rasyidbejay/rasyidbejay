// Resolves once the intro has finished (or was skipped), so page animations can start.
let done = false
let resolveFn
const promise = new Promise((resolve) => {
  resolveFn = resolve
})

export const whenReady = () => promise
export const isReady = () => done
export const markReady = () => {
  if (done) return
  done = true
  resolveFn()
}
