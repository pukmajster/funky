<script lang="ts">
  import { ProgressRadial, SlideToggle, modalStore, toastStore } from '@skeletonlabs/skeleton'
  import { userStore } from '../stores/user'
  import games from 'shared/games'
  import classNames from 'classnames'

  let directoryToPack = ''
  let writeToDirectory = ''
  let writeToAddonsFolder = false
  let isPacking = false

  $: packName = directoryToPack ? directoryToPack.split('/').pop() + '.vpk' : 'new-vpk.vpk'

  const activeGame = $userStore.activeGameId
  const game = games[activeGame]
  $: addonsFolder = [
    $userStore.steamGamesDir,
    'common',
    game.rootDirectoryName,
    game.gameDirectory,
    'addons'
  ].join('/')

  async function getSourceDirectory() {
    try {
      const dir = await window.api.openDirectoryFinder()
      if (dir) {
        directoryToPack = dir
        // Also set the write directory to the same directory if it's not yet set
        if (!writeToDirectory) writeToDirectory = dir
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function getWriteDirectory() {
    try {
      const dir = await window.api.openDirectoryFinder()
      if (dir) writeToDirectory = dir
    } catch (e) {
      console.log(e)
    }
  }

  async function startPacking() {
    isPacking = true
    try {
      await window.api.createVpk({
        sourceDirectory: directoryToPack,
        writeDirectory: writeToAddonsFolder ? addonsFolder : writeToDirectory,
        vpkName: packName
      })
      toastStore.trigger({
        background: 'variant-filled-success',
        message: 'Packed VPK'
      })
    } catch (e) {
      toastStore.trigger({
        background: 'variant-filled-error',
        message: 'Failed to pack VPK'
      })
    } finally {
      isPacking = false
      modalStore.clear()
    }
  }
</script>

<div
  class="flex flex-col gap-4 p-4 bg-surface-800 max-w-[800px] w-full shadow-lg overflow-hidden rounded-lg"
>
  <h1 class="text-xl">Create a VPK</h1>

  <div class="space-y-2">
    <p>VPK name</p>

    <div class="flex flex-1 items-center gap-2">
      <input
        class="w-full input variant-form-material"
        id="vpkName"
        placeholder="VPK name"
        value={packName}
        readonly
      />
    </div>
  </div>

  <div class="space-y-2">
    <p>Folder to pack</p>

    <div class="flex flex-1 items-center gap-2">
      <input
        class="w-full input variant-form-material"
        id="directoryToPack"
        placeholder="Folder to pack"
        bind:value={directoryToPack}
      />
      <button on:click={getSourceDirectory} class="btn variant-filled-surface">Browse</button>
    </div>
  </div>

  <div class="space-y-2">
    <p>Where to save VPK</p>

    <div class="flex flex-1 items-center gap-2">
      <input
        class="w-full input variant-form-material"
        id="saveToDirectory"
        placeholder="Where to save VPK"
        bind:value={writeToDirectory}
        disabled={writeToAddonsFolder}
      />
      <button
        disabled={writeToAddonsFolder}
        on:click={getWriteDirectory}
        class="btn variant-filled-surface">Browse</button
      >
    </div>
  </div>

  <div class="flex items-center gap-4">
    <SlideToggle
      bind:checked={writeToAddonsFolder}
      active="bg-emerald-500"
      name="writeToAddonsFolder"
      label="Write to addons folder"
    />

    <p>Save to the game addons folder</p>
  </div>

  <p
    class={classNames('text-sm', {
      invisible: !writeToAddonsFolder
    })}
  >
    {addonsFolder}
  </p>

  <div class="flex items-center">
    <button
      disabled={!directoryToPack}
      on:click={startPacking}
      class="btn variant-filled-surface ml-auto">Create VPK</button
    >
  </div>

  {#if isPacking}
    <ProgressRadial class="w-6 h-6" value={undefined} />
  {/if}
</div>

<style>
</style>
