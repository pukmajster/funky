<script lang="ts">
  import { RefreshCw } from 'lucide-svelte'
  import { isRequestingGameManifest, requestManifest } from '../../stores/manifest'
  import { popup, type PopupSettings } from '@skeletonlabs/skeleton'

  const popupHover: PopupSettings = {
    event: 'hover',
    target: 'popupHover',
    placement: 'bottom-start'
  }
</script>

<button
  class="btn btn-sm variant-filled-surface [&>*]:pointer-events-none"
  on:click={() => requestManifest('quick-refresh')}
  on:contextmenu={() => requestManifest('full-update')}
  disabled={$isRequestingGameManifest}
  use:popup={popupHover}
>
  {#if $isRequestingGameManifest}
    <RefreshCw size={16} class="animate-spin" />
    <span class="ml-2">Refreshing...</span>
  {:else}
    <RefreshCw size={16} />
    <span class="ml-2">Refresh</span>
  {/if}
</button>

<div class="card p-4 variant-filled-primary text-sm" data-popup="popupHover">
  <p><strong>Left Click:</strong> Look for newly installed mods only</p>
  <p><strong>Right Click:</strong> Refresh your entire library</p>
  <div class="arrow variant-filled-primary" />
</div>
