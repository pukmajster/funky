<script lang="ts">
  import { SlideToggle, Tab, TabGroup, modalStore } from '@skeletonlabs/skeleton'
  import { X } from 'lucide-svelte'
  import { userStore } from '../stores/user'
  import SteamGamesDirectoryManager from './SteamGamesDirectoryManager.svelte'

  function close() {
    modalStore.close()
  }

  function openGamesDir() {
    window.api.openDirectory($userStore.steamGamesDir)
  }

  function openWorkingDir() {
    window.api.openWorkingDirectory()
  }

  let tabSet: 'game dir' | 'dev' | 'networking' = 'game dir'
</script>

<div
  class=" bg-surface-800 max-w-[666px] w-full min-h-[466px] shadow-lg rounded-lg space-y-4 overflow-hidden"
>
  <TabGroup active="variant-filled-primary" hover="hover:variant-soft-primary" rounded="">
    <Tab bind:group={tabSet} name="tab1" value={'game dir'}>
      <span>Games Directory</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab2" value={'networking'}>Networking</Tab>
    <Tab bind:group={tabSet} name="tab_webapi" value={'swebapi'}>Steam Web API Key</Tab>
    <Tab bind:group={tabSet} name="tab3" value={'dev'}>Dev</Tab>

    <svelte:fragment slot="panel">
      <div class="space-y-4 p-4 pt-0">
        {#if tabSet === 'game dir'}
          <h4 class="h4">Games Directory</h4>
          <SteamGamesDirectoryManager />
        {:else if tabSet === 'dev'}
          <h4 class="h4">Developer</h4>
          <div class="space-x-2 rounded-lg">
            <button class="btn variant-filled" on:click={openGamesDir}>open game dir</button>
            <button class="btn variant-filled" on:click={openWorkingDir}>open working dir</button>
          </div>
        {:else if tabSet === 'networking'}
          <h4 class="h4">Networking</h4>

          <SlideToggle
            name="onlineMetadataFetching"
            active="bg-green-500"
            bind:checked={$userStore.enableNetworking}
            class="flex items-center gap-2"
          >
            {#if $userStore.enableNetworking}
              <span class="text-green-500">Enabled</span>
            {:else}
              <span class="text-red-500">Disabled</span>
            {/if}
          </SlideToggle>

          <p>
            A surprising amount of mod VPKs come with incorrectly formatted or straight up missing
            addoninfo.txt's. Without these files, Funky can't read typical mod metadata, like titles
            and descriptions.
          </p>

          <p>
            By enabling networking, Funky can fetch mod metadata online by contacting the Steam
            workshop directly. This request does not contain any personal data, only a list of mod
            IDs with missing data.
          </p>
        {:else if tabSet === 'swebapi'}
          <h4 class="h4">Steam Web API Key</h4>
          <p>
            To enable certain features, like unsubscribing from workshop mods directly within Funky,
            requires you providing your Steam Web API key, which you can get from
            <a
              href="https://steamcommunity.com/dev/apikey"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-500"
            >
              here</a
            >. Funky will only ever use this key to unsubscribe you from workshop mods, and nothing
            else.
          </p>

          <div class="flex items-center gap-2">
            <input
              class="w-full input variant-form-material"
              id="steamWebApiKey"
              placeholder="Steam Web API Key"
              bind:value={$userStore.steamWebApiKey}
            />
            <button class="btn variant-filled" on:click={() => ($userStore.steamWebApiKey = '')}
              >Clear</button
            >
          </div>

          <aside class="alert variant-filled-error">
            <p>
              <strong>Warning:</strong> Providing Funky with your Steam Web API key means it will be
              stored in plain text in your config file, meaning it can be accessed by anyone for malicious
              purposes. You can however always revoke your key from the same link as above.
            </p>
          </aside>
        {/if}
      </div>
    </svelte:fragment>

    <button on:click={close} class="btn btn-icon ml-auto btn-sm"> <X size={24} /></button>
  </TabGroup>
</div>
