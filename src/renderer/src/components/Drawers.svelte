<script>
  import { Drawer, drawerStore } from '@skeletonlabs/skeleton'
  import { addonOverviewId } from '../stores/library'
  import { currentGameManifest } from '../stores/manifest'
  import AddonOverview from './AddonOverview.svelte'
</script>

<Drawer>
  {#if $drawerStore.id === 'addon-overview' && $addonOverviewId !== null}
    <AddonOverview
      addon={$currentGameManifest.addons.find((addon) => addon.id === $addonOverviewId)}
    />
  {/if}
</Drawer>
