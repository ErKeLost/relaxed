import Queue from 'yocto-queue'
export type Fn<T = void> = () => T
export default function pLimit(concurrency) {
  if (
    !(
      (Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) &&
      concurrency > 0
    )
  ) {
    throw new TypeError('Expected `concurrency` to be a number from 1 and up')
  }

  const queue = new Queue()
  let activeCount = 0

  const next = () => {
    activeCount--

    if (queue.size > 0) {
      queue.dequeue()()
    }
  }

  const run = async (fn, resolve, args) => {
    activeCount++

    const result = (async () => fn(...args))()

    resolve(result)

    try {
      await result
    } catch {}

    next()
  }

  const enqueue = (fn, resolve, args) => {
    queue.enqueue(run.bind(undefined, fn, resolve, args))
    ;(async () => {
      // This function needs to wait until the next microtask before comparing
      // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
      // when the run function is dequeued and called. The comparison in the if-statement
      // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
      await Promise.resolve()

      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()()
      }
    })()
  }

  const generator = (fn, ...args) =>
    new Promise((resolve) => {
      enqueue(fn, resolve, args)
    })

  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.size
    },
    clearQueue: {
      value: () => {
        queue.clear()
      }
    }
  })

  return generator
}
/**
 * Promised `setTimeout`
 *
 * @category Promise
 */
export function sleep(ms: number, callback?: Fn<any>) {
  return new Promise<void>((resolve) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(async () => {
      await callback?.()
      resolve()
    }, ms)
  )
}

/**
 *
 * @param
 */

export const pLimit2 = (concurrency) => {
  const queue = []
  let activeCount = 0

  const next = () => {
    activeCount--

    if (queue.length > 0) {
      queue.shift()()
    }
  }

  const run = async (fn, resolve, ...args) => {
    activeCount++

    const result = (async () => fn(...args))()

    resolve(result)

    try {
      await result
    } catch {}

    next()
  }

  const enqueue = (fn, resolve, ...args) => {
    queue.push(run.bind(null, fn, resolve, ...args))

    if (activeCount < concurrency && queue.length > 0) {
      queue.shift()()
    }
  }

  const generator = (fn, ...args) =>
    new Promise((resolve) => {
      enqueue(fn, resolve, ...args)
    })

  return generator
}
