<script>
  import { Drawer, drawerStore } from '@skeletonlabs/skeleton'
  import { addonOverviewId } from '../stores/library'
  import { currentGameManifest } from '../stores/manifest'
  import AddonOverview from './AddonOverview.svelte'
  import Settings from './Settings.svelte'
</script>

<Drawer>
  {#if $drawerStore.id === 'settings'}
    <Settings />
  {/if}

  {#if $drawerStore.id === 'addon-overview' && $addonOverviewId !== null}
    <AddonOverview
      addon={$currentGameManifest.addons.find((addon) => addon.id === $addonOverviewId)}
    />
  {/if}
</Drawer>
