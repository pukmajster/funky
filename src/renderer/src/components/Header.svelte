<script lang="ts">
  import { AppBar, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'

  function openSettingsDrawer() {
    const settings: DrawerSettings = {
      id: 'settings',
      width: 'w-[70%] max-w-[900px]',
      rounded: 'rounded-none'
    }

    drawerStore.open(settings)
  }
</script>

<AppBar
  gridColumns="grid-cols-3"
  padding="py-2 px-2"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
>
  <svelte:fragment slot="lead">
    <button class="btn variant-filled" on:click={openSettingsDrawer}>Menu</button>
  </svelte:fragment>
</AppBar>
