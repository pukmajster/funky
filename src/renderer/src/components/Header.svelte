<script lang="ts">
  import {
    AppBar,
    drawerStore,
    modalStore,
    type DrawerSettings,
    type ModalComponent,
    type ModalSettings
  } from '@skeletonlabs/skeleton'
  import { HelpCircleIcon, InfoIcon } from 'lucide-svelte'
  import games from 'shared/games'
  import { writeAddonList } from '../api/api'
  import { userStore } from '../stores/user'
  import AboutModal from './AboutModal.svelte'
  import HelpModal from './HelpModal.svelte'

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

  function openAboutModal() {
    const modalComponent: ModalComponent = {
      // Pass a reference to your custom component
      ref: AboutModal,
      // Add the component properties as key/value pairs
      props: { background: 'bg-primary-500' },
      // Provide a template literal for the default component slot
      slot: '<p>Skeleton</p>'
    }

    const modal: ModalSettings = {
      type: 'component',
      // Pass the component directly:
      component: modalComponent
    }

    modalStore.trigger(modal)
  }

  function openHelpModal() {
    const modalComponent: ModalComponent = {
      // Pass a reference to your custom component
      ref: HelpModal,
      // Add the component properties as key/value pairs
      // Provide a template literal for the default component slot
      slot: '<p>Skeleton</p>'
    }

    const modal: ModalSettings = {
      type: 'component',
      // Pass the component directly:
      component: modalComponent
    }

    modalStore.trigger(modal)
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
      <button class="btn btn-sm variant-filled-surface" on:click={openSettingsDrawer}
        >Settings</button
      >

      <button class="btn btn-sm bg-primary-500" on:click={launchGame}>
        <img src={games[$userStore?.activeGameId]?.gameLogo} class="w-5 mr-1" alt="" />Launch game</button
      >
    </div>
  </svelte:fragment>

  <svelte:fragment slot="trail">
    <div class="flex gap-2">
      <button class="btn btn-sm variant-filled-surface" on:click={openAboutModal}>
        <InfoIcon class="w-4 mr-2 inline" /> About</button
      >

      <button class="btn btn-sm variant-filled-surface" on:click={openHelpModal}>
        <HelpCircleIcon class="w-4 mr-2 inline" />
        Help</button
      >
    </div>
  </svelte:fragment>
</AppBar>
