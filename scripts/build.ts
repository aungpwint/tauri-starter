import packageJson from '../package.json'

const name = 'tauri-starter'
const version = packageJson.version
const base = 'src-tauri/target/aarch64-apple-darwin/release/bundle'

Bun.write(`${base}/dmg/${name}_${version}_aarch64.dmg`, '__test__')
Bun.write(`${base}/macos/${name}/MacOS/${name}`, '__test__')
Bun.write(`${base}/macos/${name}.app.tar.gz`, '__test__')
Bun.write(`${base}/macos/${name}.app.tar.gz.sig`, '__test__')
