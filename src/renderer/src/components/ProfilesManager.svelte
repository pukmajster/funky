<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'
  import { userStore } from '../stores/user'

  let newProfileName = ''

  const { activeGameId, games } = $userStore

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

    // let newProfile = {
    //   id: newProfileName.toLowerCase().replace(/\s/g, '-'),
    //   label: newProfileName,
    //   enabledAddons: [],
    //   randomizedCategories: []
    // }

    // gamePreferences.update((prefs) => {
    //   prefs[$currentGame].profiles.push(newProfile)
    //   return prefs
    // })
  }
</script>

<div
  class="p-4 relative space-y-4 !z-50 w-64 rounded-md shadow-lg bg-surface-800"
  data-popup="profileManagerPopup"
>
  <ListBox>
    {#each games[activeGameId]?.profiles ?? [] as profile}
      {@const activeGameId = $userStore.activeGameId}
      <ListBoxItem
        bind:group={$userStore.games[activeGameId].activeProfileId}
        name={profile.id}
        value={profile.id}>{profile.label}</ListBoxItem
      >
    {/each}
  </ListBox>

  <hr />

  <div class="space-y-2">
    <h6 class="h6 font-bold">Create new profile</h6>

    <input
      class="input variant-form-material"
      type="text"
      bind:value={newProfileName}
      placeholder="New profile name..."
    />

    <button
      class="btn btn-sm variant-filled"
      on:click={createNewProfile}
      disabled={!newProfileName.length}>create profile</button
    >
  </div>
</div>
