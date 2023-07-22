<script lang="ts">
  import { AppBar, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
  import games from 'shared/games'
  import { writeAddonList } from '../api/api'
  import { userStore } from '../stores/user'

  function openSettingsDrawer() {
    const settings: DrawerSettings = {
      id: 'settings',
      width: 'w-[70%] max-w-[900px]',
      rounded: 'rounded-none'
    }

    drawerStore.open(settings)
  }

  async function launchGame() {
    await writeAddonList()
    //window.api.openLinkInBrowser(`steam://rungameid/550//${$launchParameters}`)
    window.api.openLinkInBrowser(`steam://rungameid/550/`)
  }
</script>

<AppBar
  gridColumns="grid-cols-3"
  padding="py-2 px-2"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
>
  <svelte:fragment slot="lead">
    <div class="flex gap-2">
      <button class="btn btn-sm variant-soft" on:click={openSettingsDrawer}>Menu</button>

      <button class="btn btn-sm variant-soft" on:click={launchGame}>
        <img src={games[$userStore.activeGameId]?.gameLogo} width="24" class="mr-3" /> Launch game</button
      >
    </div>
  </svelte:fragment>
</AppBar>
