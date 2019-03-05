export async function register() {
  if (!navigator.serviceWorker) {
    return
  }

  window.addEventListener('load', onLoad)
}

export function unregister() {
  if (!navigator.serviceWorker) {
    return
  }

  navigator.serviceWorker.ready.then(registration => {
    registration.unregister()
  })
}

async function onLoad() {
  const swUrl = `${process.env.NODE_ENV}/service-worker.js`

  const reg: ServiceWorkerRegistration = await window.navigator!.serviceWorker.register(swUrl)

  reg.onupdatefound = (ev: Event) => {
    if (!reg.installing) return

    reg.installing.onstatechange = (ev: Event) => {
      if (reg.installing!.state !== 'installed') return

      navigator.serviceWorker.controller
        ? console.log('content cached for offline use.')
        : console.log('Service Worker installed and ready to be activated.')
    }
  }
}
