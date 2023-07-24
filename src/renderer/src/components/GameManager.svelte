<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'
  import type { Profile } from 'shared'
  import games from 'shared/games'
  import { userStore } from '../stores/user'

  let newProfileName = ''

  const { activeGameId } = $userStore

  const gameIds = Object.keys(games)

  // $: {
  //   Object.keys($gamePreferences).length == 0 &&
  //     $currentGame &&
  //     gamePreferences.set({
  //       [$currentGame]: {
  //         collections: [],
  //         activeProfile: 'default',
  //         profiles: [
  //           {
  //             id: 'default',
  //             label: 'Default',
  //             enabledAddons: [],
  //             randomizedCategories: []
  //           }
  //         ]
  //       }
  //     })
  // }

  function createNewProfile() {
    if (!newProfileName) return

    let newProfile: Profile = {
      id: newProfileName.toLowerCase().replace(/\s/g, '-'),
      label: newProfileName,
      enabledAddonIds: [],
      shuffles: {}
    }

    userStore.addProfile(newProfile)

    newProfileName = ''
  }
</script>

<div data-popup="gameManagerPopup">
  <div
    class="flex border border-solid border-surface-600 flex-grow !z-50 items-stretch rounded-md overflow-hidden shadow-lg bg-surface-700"
  >
    <div class="w-[180px] space-y-2 p-4 bg-surface-800">
      <h4 class="h4">Game</h4>
      <ListBox>
        {#each gameIds as gameId}
          {@const gameLabel = games['550'].label}
          <ListBoxItem bind:group={$userStore.activeGameId} name={gameId} value={+gameId}
            >{gameLabel}</ListBoxItem
          >
        {/each}
      </ListBox>
    </div>

    <!-- <div class="w-[1px] bg-surface-600" /> -->

    <div class="w-[360px] p-4 space-y-2">
      <h4 class="h4">Profile</h4>

      <ListBox>
        {#each $userStore.games[activeGameId]?.profiles ?? [] as profile}
          {@const activeGameId = $userStore.activeGameId}
          <ListBoxItem
            bind:group={$userStore.games[activeGameId].activeProfileId}
            name={profile.id}
            value={profile.id}>{profile.label}</ListBoxItem
          >
        {/each}
      </ListBox>

      <div class="pb-3" />

      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <input
            class="input"
            type="text"
            bind:value={newProfileName}
            placeholder="Create new profile..."
          />

          <button
            class="btn variant-filled"
            on:click={createNewProfile}
            disabled={!newProfileName.length}>Create</button
          >
        </div>
      </div>
    </div>
  </div>
  <div class="arrow variant-filled-surface !bg-surface-700" />
</div>
