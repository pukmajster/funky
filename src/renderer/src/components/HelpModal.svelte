<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import { GithubIcon } from 'lucide-svelte'

  function close() {
    modalStore.close()
  }
</script>

<div class="text-center bg-surface-800 p-8 rounded-lg space-y-4">
  <h4 class="h4">Found a bug / requesting a feature?</h4>

  <p>
    Visit the project's <a
      class="flex-inline items-center gap-2 text-primary-400"
      href="https://github.com/pukmajster/sourcebox/issues"
      target="_blank"
    >
      <GithubIcon class="w-4 pb-1 ml-1 inline" />
      GitHub Issues
    </a>

    page and report there!
  </p>

  <button on:click={close} class="btn btn-sm variant-filled">Close</button>
</div>
