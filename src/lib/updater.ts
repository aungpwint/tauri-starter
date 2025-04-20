import { check } from '@tauri-apps/plugin-updater'
import type { DownloadEvent as UpdaterDownloadEvent } from '@tauri-apps/plugin-updater'
import { relaunch } from '@tauri-apps/plugin-process'

export async function checkForUpdate() {
    try {
        console.log('checking for update...')

        const update = await check({
            proxy: import.meta.env.VITE_TAURI_UPDATER_PROXY,
            timeout: 30_000, // 30 seconds or 30000 ms
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TAURI_UPDATER_TOKEN}`
            }
        })

        if (update) {
            console.log(
                `Found update ${update.version} from ${update.date} with notes: ${update.body}`
            )

            let downloaded = 0
            let contentLength = 0

            // Use the correct type from `@tauri-apps/plugin-updater`
            await update.downloadAndInstall((event: UpdaterDownloadEvent) => {
                switch (event.event) {
                    case 'Started':
                        contentLength = event.data.contentLength || 0 // Default to 0 if undefined
                        console.log(`Started downloading ${contentLength} bytes`)
                        break
                    case 'Progress':
                        downloaded += event.data.chunkLength
                        console.log(`Downloaded ${downloaded} out of ${contentLength}`)
                        break
                    case 'Finished':
                        console.log('Download finished')
                        break
                }
            })

            console.log('Update installed')
            await relaunch() // Restart the app after installation
        } else {
            console.log('No updates available')
        }
    } catch (error) {
        console.error('Error checking for updates:', error)
    }
}
