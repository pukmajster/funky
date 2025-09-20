<script lang="ts">
  import { userStore } from '../../../stores/user'
  import { writeAddonList, readAddonList } from '../../../api/api'
  import { Info } from 'lucide-svelte'
  import SettingsDropdown from '../components/SettingsDropdown.svelte'
  import SettingsSwitch from '../components/SettingsSwitch.svelte'

  function openGamesDir() {
    window.api.openDirectory($userStore.steamGamesDir)
  }

  function openWorkingDir() {
    window.api.openWorkingDirectory()
  }
</script>

<div class="flex flex-wrap gap-4 rounded-lg">
  <button class="btn variant-filled" on:click={openGamesDir}>open game dir</button>
  <button class="btn variant-filled" on:click={openWorkingDir}>open working dir</button>
  <button class="btn variant-filled" on:click={userStore.resetFirstTimeSetup}
    >reset first time setup</button
  >
  <button class="btn variant-filled" on:click={readAddonList}>read addonlist</button>
  <button class="btn variant-filled" on:click={writeAddonList}>write addonlist</button>
</div>

<aside class="alert variant-ghost-warning rounded-md">
  <div>
    <Info />
  </div>

  <div class="alert-message">
    <h4 class="h4">Experimental Features</h4>
    <p>
      These features are in early development and may or may not work as expected. Probably best to
      backup your data beforehand.
    </p>
  </div>
</aside>

<SettingsDropdown
  label="Library layout"
  description="Choose between a grid and list layout"
  bind:value={$userStore.libraryDisplayMode}
  options={[
    {
      label: 'Grid',
      value: 'grid'
    },
    {
      label: 'List',
      value: 'list'
    }
  ]}
/>

<SettingsSwitch
  label="Load Ordering"
  description="Enables WIP load order feature"
  bind:value={$userStore.experimentalLoadOrderEnable}
/>
