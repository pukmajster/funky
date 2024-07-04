<script lang="ts">
  import { AppShell, Modal, ProgressBar, Toast } from '@skeletonlabs/skeleton'
  import Config from './Config.svelte'
  import Drawers from './components/Drawers.svelte'
  import Header from './components/navigation/Header.svelte'
  import WelcomeGuide from './components/WelcomeGuide.svelte'
  import { userStore } from './stores/user'
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
  import { storePopup } from '@skeletonlabs/skeleton'
  import { isRequestingGameManifest, requestManifest } from './stores/manifest'
  import LibraryStateManager from './components/library/LibraryStateManager.svelte'
  import CategoriesPanel from './components/library/CategoriesPanel.svelte'
  import AddonLibrary from './components/library/AddonLibrary.svelte'
  import { onMount } from 'svelte'
  import Conflicts from './components/library/Conflicts.svelte'
  import { view } from './stores/view'
  import LibraryShuffles from './components/library/LibraryShuffles.svelte'
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

  $: activeProfileId = $userStore?.activeProfileId

  onMount(() => {
    requestManifest('cached')

    async function persist() {
      if (navigator.storage && navigator.storage.persist) {
        const isPersisted = await navigator.storage.persist()
        console.log(`Persisted: ${isPersisted}`)
      } else {
        console.error("can't persist indexedDB data.")
      }

      if (navigator.storage && navigator.storage.estimate) {
        const estimation = await navigator.storage.estimate()
        console.log(`Quota: ${estimation.quota}`)
        console.log(`Usage: ${estimation.usage}`)
      } else {
        console.error('StorageManager not found')
      }
    }

    persist()
  })
</script>

<Config />

{#if ($userStore?.hasFinishedFirstTimeSetup ?? false) === false}
  <WelcomeGuide />
{:else if activeProfileId === undefined}
  <p>waiting for active profile.default..</p>
{:else if $userStore !== undefined}
  <LibraryStateManager />

  <AppShell slotHeader="z-30" slotSidebarRight="">
    <svelte:fragment slot="header">
      <Header />
    </svelte:fragment>

    <svelte:fragment slot="sidebarLeft">
      <CategoriesPanel />
    </svelte:fragment>

    <AddonLibrary />

    <Conflicts />
    <!--  <ToolsPage /> -->

    <svelte:fragment slot="sidebarRight">
      {#if $view == 'shuffles'}
        <LibraryShuffles />
      {/if}
    </svelte:fragment>
  </AppShell>

  {#if $isRequestingGameManifest}
    <div
      class="fixed flex flex-col justify-center items-center inset-0 z-50 bg-black/80 backdrop-blur-lg"
    >
      <p>Building manifest... please wait</p>
      <div class="w-[128px] mt-2">
        <ProgressBar value={undefined} />
      </div>
    </div>
  {/if}
{/if}

<Drawers />
<Modal />
<Toast position="br" padding="!px-3 !py-2" />
