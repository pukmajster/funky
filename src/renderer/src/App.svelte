<script lang="ts">
  import { AppShell, Modal, Toast } from '@skeletonlabs/skeleton'
  import Config from './Config.svelte'
  import AddonLibrary from './components/AddonLibrary.svelte'
  import CategoriesPanel from './components/CategoriesPanel.svelte'
  import Drawers from './components/Drawers.svelte'
  import Header from './components/Header.svelte'
  import { userStore } from './stores/user'

  let activeProfile = $userStore?.games[$userStore.activeGameId].profiles.find(
    (profile) => profile.id == $userStore.games[$userStore.activeGameId].activeProfileId
  )
</script>

<Config />

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <CategoriesPanel bind:profile={activeProfile} />
  </svelte:fragment>

  {#if $userStore !== undefined}
    <AddonLibrary bind:profile={activeProfile} />
  {/if}
</AppShell>

<Drawers />
<Modal />
<Toast position="br" padding="!px-3 !py-2" />
