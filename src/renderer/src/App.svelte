<script lang="ts">
  import { AppShell, Modal, Toast } from '@skeletonlabs/skeleton'
  import Config from './Config.svelte'
  import AddonLibrary from './components/AddonLibrary.svelte'
  import CategoriesPanel from './components/CategoriesPanel.svelte'
  import Drawers from './components/Drawers.svelte'
  import Header from './components/Header.svelte'
  import WelcomeGuide from './components/WelcomeGuide.svelte'
  import { userStore } from './stores/user'

  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
  import { storePopup } from '@skeletonlabs/skeleton'
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

  let activeProfile = $userStore?.games[$userStore.activeGameId].profiles.find(
    (profile) => profile.id == $userStore.games[$userStore.activeGameId].activeProfileId
  )
</script>

<Config />

{#if ($userStore?.hasFinishedFirstTimeSetup ?? false) === false}
  <WelcomeGuide />
{:else if $userStore?.activeGameId === undefined}
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-3xl font-bold">No game selected</h1>
    <p class="text-center">Please select a game from the dropdown in the header to get started.</p>
  </div>
{:else}
  <AppShell slotHeader="z-30">
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
{/if}

<Drawers />
<Modal />
<Toast position="br" padding="!px-3 !py-2" />
