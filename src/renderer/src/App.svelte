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
  import Conflicts from './components/Conflicts.svelte'
  import ShufflesManager from './components/ShufflesManager.svelte'
  import { requestManifest } from './stores/manifest'
  import { view } from './stores/view'
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

  $: activeGameId = $userStore?.activeGameId

  $: activeProfile = $userStore?.games[activeGameId]?.profiles.find(
    (profile) => profile.id == $userStore.games[activeGameId].activeProfileId
  )

  $: {
    activeGameId && !activeProfile && userStore.setupGameWithDefaultProfile(activeGameId)
  }

  $: {
    activeGameId && requestManifest('cached')
  }
</script>

<Config />

{#if ($userStore?.hasFinishedFirstTimeSetup ?? false) === false}
  <WelcomeGuide />
{:else if !activeProfile}
  waiting for active profile.default..
{:else if $userStore?.activeGameId === undefined}
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-3xl font-bold">No game selected</h1>
    <p class="text-center">Please select a game from the dropdown in the header to get started.</p>
  </div>
{:else if $userStore !== undefined}
  <AppShell slotHeader="z-30" slotSidebarRight="">
    <svelte:fragment slot="header">
      <Header />
    </svelte:fragment>

    <svelte:fragment slot="sidebarLeft">
      <CategoriesPanel bind:profile={activeProfile} />
    </svelte:fragment>

    <AddonLibrary bind:profile={activeProfile} />

    <Conflicts />

    <svelte:fragment slot="sidebarRight">
      {#if $view == 'shuffles'}
        <ShufflesManager />
      {/if}
    </svelte:fragment>
  </AppShell>
{/if}

<Drawers />
<Modal />
<Toast position="br" padding="!px-3 !py-2" />
