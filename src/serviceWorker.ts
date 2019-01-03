import { isProd } from './lib/isProd'

type TODO = any
type Config = TODO

function shouldRegister(): boolean {
  if (!isProd()) return false
  if (!navigator.serviceWorker) return false
  return true
}

export async function register(config?: Config) {
  if (!shouldRegister()) return

  window.addEventListener('load', async () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`

    const reg: ServiceWorkerRegistration = await window.navigator!.serviceWorker.register(swUrl)

    reg.onupdatefound = (ev: Event) => {
      if (!reg.installing) return

      reg.installing.onstatechange = (ev: Event) => {
        if (reg.installing!.state !== 'installed') return

        if (!navigator.serviceWorker.controller) {
          console.log('content cached for offline use.')
          if (config && config.onSuccess) config.onSuccess(reg)
          return
        }

        console.log('Service Worker installed and ready to be activated.')

        if (config && config.onUpdate) config.onUpdate(reg)
      }
    }
  })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister()
    })
  }
}
