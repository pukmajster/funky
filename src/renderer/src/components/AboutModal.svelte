<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import { GithubIcon } from 'lucide-svelte'

  function close() {
    modalStore.close()
  }
</script>

<div class="text-center bg-surface-800 p-8 shadow-lg rounded-lg space-y-4">
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
      href="https://github.com/pukmajster/sourcebox"
      target="_blank"
    >
      <GithubIcon class="w-4 pb-1 ml-1 inline" />
      GitHub
    </a>
  </p>

  <p>Developed with Electron, Svelte and Skeleton UI</p>

  <p>Shoutout to Valve and all the modders</p>

  <button on:click={close} class="btn btn-sm variant-filled">Close</button>
</div>
