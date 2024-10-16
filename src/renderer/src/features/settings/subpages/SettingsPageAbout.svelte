<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import { GithubIcon } from 'lucide-svelte'
  import { onMount } from 'svelte'
  import type { AppMeta } from 'shared'
  import { getAppMeta } from '../../../api/api'

  let appMeta: AppMeta | undefined

  onMount(async () => {
    appMeta = await getAppMeta()
    console.log(appMeta)
  })
</script>

<div class="text-center bg-surface-800 p-8 space-y-4">
  <p>
    Made with ❤️ by <a
      class="text-primary-400"
      target="_blank"
      href="https://steamcommunity.com/id/kryfixzzz/">kri</a
    >
  </p>

  <p>
    Visit the project at <a
      class="flex-inline items-center gap-2 text-primary-400"
      href="https://github.com/pukmajster/funky"
      target="_blank"
    >
      <GithubIcon class="w-4 pb-1 ml-1 inline" />
      GitHub
    </a>
  </p>

  <p>Developed with Electron, Dexie, Svelte and Skeleton UI</p>

  <p>Shoutout to Valve and the modding community</p>

  <p class="text-xs opacity-60">Funky v{appMeta?.version}</p>
</div>
