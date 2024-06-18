<script lang="ts">
  import { AppShell, Modal, ProgressBar, Toast } from '@skeletonlabs/skeleton'
  import Config from './Config.svelte'
  import Drawers from './components/Drawers.svelte'
  import Header from './components/Header.svelte'
  import WelcomeGuide from './components/WelcomeGuide.svelte'
  import { userStore } from './stores/user'
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
  import { storePopup } from '@skeletonlabs/skeleton'
  import { isRequestingGameManifest, requestManifest } from './stores/manifest'
  import LibraryStateManager from './components/LibraryStateManager.svelte'
  import CategoriesPanel from './components/CategoriesPanel.svelte'
  import AddonLibrary from './components/AddonLibrary.svelte'
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

  $: activeProfileId = $userStore?.activeProfileId
  $: {
    // Wait for userstore before requesting manifest
    activeProfileId && requestManifest('cached')
  }
</script>

<Config />

{#if ($userStore?.hasFinishedFirstTimeSetup ?? false) === false}
  <WelcomeGuide />
{:else if activeProfileId === undefined}
  <p>waiting for active profile.default..</p>
  waiting for active profile.default..
{:else if $userStore !== undefined}
  <LibraryStateManager>
    <AppShell slotHeader="z-30" slotSidebarRight="">
      <svelte:fragment slot="header">
        <Header />
      </svelte:fragment>

      <svelte:fragment slot="sidebarLeft">
        <CategoriesPanel />
      </svelte:fragment>

      <AddonLibrary />
      <!-- 
      <Conflicts />
  
      <ToolsPage />
  
      <svelte:fragment slot="sidebarRight">
        {#if $view == 'shuffles'}
          <ShufflesManager />
        {/if}
      </svelte:fragment> -->
    </AppShell>
  </LibraryStateManager>

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
